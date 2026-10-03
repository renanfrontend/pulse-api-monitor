import { useState, useRef, useEffect } from 'react';
import { createId, Shell, Stat, useLocal } from './shared';
import { validateUrl, percentile } from './domain';
type Check = {
    id: string;
    url: string;
    status: number;
    ms: number;
    at: string;
    error?: string;
};
export default function App() { const [checks, setChecks, storageError] = useLocal<Check[]>('pulse-v1', []); const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1'); const [demo, setDemo] = useState(true); const [busy, setBusy] = useState(false); const [error, setError] = useState(''); const controller = useRef<AbortController | null>(null); useEffect(() => () => controller.current?.abort(), []); async function check() { if (!demo && !validateUrl(url)) {
    setError('Informe uma URL HTTP ou HTTPS válida.');
    return;
} setBusy(true); setError(''); const start = performance.now(); let status = 200; let message = ''; const abort = new AbortController(); controller.current = abort; const timer = setTimeout(() => abort.abort(), 8000); try {
    if (demo) {
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    else {
        const response = await fetch(url, { signal: abort.signal, cache: 'no-store' });
        status = response.status;
        await response.arrayBuffer();
    }
}
catch (e) {
    status = 0;
    message = e instanceof Error ? e.message : 'Erro de rede';
    setError('Falha de rede, CORS ou timeout. O navegador exige que a API permita sua origem.');
}
finally {
    clearTimeout(timer);
    setChecks(prev => [{ id: createId(), url: demo ? 'demo://healthy-service' : url, status, ms: Math.round(performance.now() - start), at: new Date().toISOString(), error: message }, ...prev].slice(0, 50));
    setBusy(false);
} } const successful = checks.filter(x => x.status >= 200 && x.status < 400); return <Shell name="Pulse" title="Visibilidade em cada request." description="Inspecione disponibilidade e latência com verificações manuais. Uma bancada HTTP feita para desenvolvedores." accent="#70cfff"><div className="grid"><Stat label="Verificações armazenadas" value={checks.length}/><Stat label="Sucesso na amostra" value={checks.length ? Math.round(successful.length / checks.length * 100) + '%' : '—'}/><Stat label="Latência p95 da amostra" value={checks.length ? percentile(checks.map(x => x.ms), .95) + ' ms' : '—'}/></div><section className="panel" style={{ marginTop: 24 }}><h2>Verificar endpoint</h2><form className="form" onSubmit={e => { e.preventDefault(); void check(); }}><label>Endpoint HTTP<input type="url" value={url} disabled={demo} onChange={e => setUrl(e.target.value)}/></label><label>Fonte<select value={demo ? 'demo' : 'live'} onChange={e => setDemo(e.target.value === 'demo')}><option value="demo">Demonstração local</option><option value="live">API real (requer CORS)</option></select></label><button className="primary" disabled={busy}>{busy ? 'Verificando…' : 'Executar verificação'}</button></form><p>Timeout de 8 segundos • Até 50 resultados • Sem verificações em segundo plano</p>{error && <p className="error" role="alert">{error}</p>}{storageError && <p role="alert">Histórico não pôde ser salvo.</p>}</section><section className="panel"><div className="row spread"><h2>Histórico</h2><button disabled={busy} onClick={() => setChecks([])}>Limpar histórico</button></div><div className="scroll"><table><thead><tr><th>Endpoint</th><th>Status</th><th>Latência</th><th>Horário</th></tr></thead><tbody>{checks.map(x => <tr key={x.id}><td style={{ wordBreak: 'break-all' }}>{x.url}</td><td className={x.status >= 200 && x.status < 400 ? 'ok' : 'error'}>{x.status || 'Erro'}</td><td>{x.ms} ms</td><td>{new Date(x.at).toLocaleTimeString('pt-BR')}</td></tr>)}</tbody></table></div>{!checks.length && <p className="empty">Execute uma verificação para começar.</p>}</section></Shell>; }
