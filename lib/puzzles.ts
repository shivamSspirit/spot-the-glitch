export const VERSION = 'v1';
export type Puzzle = { size: number; odd: number; family: number; change: number; rotation: number };
export function hash(seed: string) { let h = 2166136261; for (const c of seed) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
export function random(seed: string) { let a = hash(seed); return () => { a += 0x6D2B79F5; let t = a; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
export function puzzleAt(seed: string, index: number): Puzzle {
 const r = random(`${VERSION}:${seed}:${index}`); const size = index < 3 ? 2 : index < 9 ? 3 : 4;
 return { size, odd: Math.floor(r() * size * size), family: Math.floor(r() * 4), change: Math.floor(r() * 3), rotation: Math.floor(r() * 4) * 90 };
}
export function symbolVariant(p: Puzzle, cell: number) { return cell === p.odd ? p.change + 1 : 0; }
export function dailySeed(date = new Date()) { return `daily-${date.toISOString().slice(0, 10)}`; }
export function freshSeed() { return `p-${crypto.getRandomValues(new Uint32Array(2)).join('-')}`; }
export type Challenge = { seed: string; score?: number };
export function parseChallenge(search: string): Challenge | null {
 const q = new URLSearchParams(search); if (!q.has('seed')) return null;
 const seed = q.get('seed') || ''; if (q.get('v') !== VERSION || !/^(p-\d{1,10}-\d{1,10}|daily-\d{4}-\d{2}-\d{2})$/.test(seed)) throw new Error('This challenge link is invalid or uses an unsupported version. Practice is ready instead.');
 if(seed.startsWith('daily-') && (!Number.isFinite(Date.parse(seed.slice(6))) || new Date(seed.slice(6)).toISOString().slice(0,10) !== seed.slice(6))) throw new Error('This challenge date is invalid. Practice is ready instead.');
 const score = q.get('score'); if (score !== null && !/^\d{1,4}$/.test(score)) throw new Error('This challenge score is invalid. Practice is ready instead.');
 return {seed, ...(score !== null ? { score: Number(score) } : {})};
}
