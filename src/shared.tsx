import { useState, useEffect, type ReactNode } from 'react';
export function useLocal<T>(key: string, initial: T) { const [value, setValue] = useState<T>(() => { try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : initial;
}
catch {
    return initial;
} }); const [storageError, setStorageError] = useState(false); useEffect(() => { try {
    localStorage.setItem(key, JSON.stringify(value));
    setStorageError(false);
}
catch {
    setStorageError(true);
} }, [key, value]); return [value, setValue, storageError] as const; }
export function Shell({ name, title, description, accent, children }: {
    name: string;
    title: string;
    description: string;
    accent: string;
    children: ReactNode;
}) { const [light, setLight] = useLocal('theme', false); return <div className={light ? 'light' : ''} style={{ minHeight: '100vh', '--accent': accent } as React.CSSProperties}><a href="#content" className="muted" style={{ position: 'absolute', left: 12, top: 2, fontSize: 12 }}>Pular para conteúdo</a><header><b>{name} <span className="tag">PORTFOLIO / 2026</span></b><button onClick={() => setLight(!light)} aria-label="Alternar tema">{light ? '◐ Escuro' : '◑ Claro'}</button></header><main id="content"><section className="hero"><span className="eyebrow">Por Renan Augusto • Frontend Developer</span><h1>{title}</h1><p>{description}</p></section>{children}</main><footer>Projeto demonstrativo • Dados locais e fictícios • React + TypeScript</footer></div>; }
export const money = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n);
export function Stat({ label, value }: {
    label: string;
    value: string | number;
}) { return <article className="stat"><small>{label}</small><strong>{value}</strong></article>; }
