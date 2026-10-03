import {test} from 'node:test';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {readFile,mkdtemp,writeFile,rm} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
test('Renderização inicial e controles essenciais',async()=>{
 const temp=await mkdtemp(resolve('.render-test-'));
 try {
 for(const name of ['App','shared']){
 const source=await readFile(new URL('../src/'+name+'.tsx',import.meta.url),'utf8');
 const code=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext,jsx:ts.JsxEmit.ReactJSX}}).outputText.replace(/(['"])\.\/shared\1/g,"'./shared.mjs'").replace(/(['"])\.\/domain\1/g,JSON.stringify(pathToFileURL(resolve('src/domain.js')).href));
 await writeFile(resolve(temp,name+'.mjs'),code);
 }
 const {default:App}=await import(pathToFileURL(resolve(temp,'App.mjs')).href);
 const markup=renderToStaticMarkup(createElement(App));
 assert.match(markup,/<h1>/);
 assert.match(markup,/id="content"/);
 assert.match(markup,/Alternar tema/);
 assert.match(markup,/<button/);
 } finally {await rm(temp,{recursive:true,force:true})}
});
