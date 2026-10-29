export function read<T>(key:string, fallback:T):T { try { const raw=localStorage.getItem(`glitch:${key}`); return raw ? JSON.parse(raw) as T : fallback; } catch { return fallback; } }
export function write(key:string,value:unknown) { try { localStorage.setItem(`glitch:${key}`,JSON.stringify(value)); return true; } catch { return false; } }
export function bestFor(key:string) { const n=read<unknown>(key,0); return typeof n==='number' && Number.isFinite(n) && n>=0 ? Math.floor(n) : 0; }
