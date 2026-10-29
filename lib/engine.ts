export const ROUND_MS = 30000;
export type Round = { score: number; remaining: number; last: number; status: 'idle'|'playing'|'paused'|'done' };
export function tick(r: Round, now: number): Round { if(r.status !== 'playing') return r; const remaining = Math.max(0, r.remaining - Math.max(0, now-r.last)); return {...r, remaining, last: now, status: remaining === 0 ? 'done' : 'playing'}; }
export function answer(r: Round, correct: boolean, now: number): Round { const s = tick(r, now); if(s.status !== 'playing') return s; return correct ? {...s, score:s.score+1} : {...s, remaining:Math.max(0,s.remaining-2000),status:s.remaining<=2000?'done':'playing'}; }
