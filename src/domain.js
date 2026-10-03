export function validateUrl(value) { try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
}
catch {
    return false;
} }
export function percentile(values, p) { if (!values.length)
    return 0; const sorted = [...values].sort((a, b) => a - b); return sorted[Math.max(0, Math.ceil(p * sorted.length) - 1)]; }
