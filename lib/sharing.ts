import {VERSION} from './puzzles';
export function challengeUrl(seed:string,score:number) { const u=new URL('/',window.location.href); u.search=new URLSearchParams({v:VERSION,seed,score:String(score)}).toString(); return u.toString(); }
export async function shareScore(seed:string,score:number) { const url=challengeUrl(seed,score); const text=`I spotted ${score} glitches in 30 seconds. Can you beat me? Challenge score is self-reported.`;
 if(navigator.share) { try { await navigator.share({title:'Spot the Glitch',text,url}); return 'Shared!'; } catch(e) { if(e instanceof Error && e.name==='AbortError') return 'Share cancelled.'; } }
 try { await navigator.clipboard.writeText(`${text}\n${url}`); return 'Challenge copied!'; } catch { return url; }
}
export function downloadScore(score:number,best:number,mode:string) { const canvas=document.createElement('canvas'); canvas.width=1200; canvas.height=630; const c=canvas.getContext('2d'); if(!c) throw new Error('Image downloads are unavailable in this browser.');
 c.fillStyle='#f5f3eb';c.fillRect(0,0,1200,630);c.fillStyle='#f36b51';c.fillRect(60,60,14,510);c.fillStyle='#262722';c.font='bold 52px Arial';c.fillText('spot the glitch.',110,125);c.font='bold 180px Arial';c.fillText(String(score),100,340);c.font='32px Arial';c.fillText('glitches spotted in 30 seconds',110,400);c.font='24px Arial';c.fillText(`${mode} · Personal best: ${best} · Self-reported score`,110,470);c.fillText('One different symbol. How many can you spot?',110,550);
 const a=document.createElement('a');a.download=`spot-the-glitch-${score}.png`;a.href=canvas.toDataURL('image/png');a.click();
}
