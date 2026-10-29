import type {Puzzle} from '@/lib/puzzles';
export function Symbol({p,variant=0}:{p:Pick<Puzzle,'family'|'rotation'>;variant?:number}) {
 return <svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><g transform={`rotate(${p.rotation+(variant===1?90:0)} 50 50)`} stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
 {p.family===0 && <><path d={variant===2?'M25 74V27H74':'M25 74V27H74V74H48'}/><path d="M45 46H60V60"/>{variant===3&&<path d="M25 50H36"/>}</>}
 {p.family===1 && <><path d="M50 20L80 76H20Z"/>{variant!==2&&<path d="M50 43V57"/>}{variant===3&&<path d="M36 65H50"/>}<circle cx="50" cy="68" r="2" fill="currentColor" stroke="none"/></>}
 {p.family===2 && <><path d={variant===2?'M74 31A30 30 0 1 0 78 65':'M74 31A30 30 0 1 0 78 65L61 65'}/><path d="M49 34V51H64"/>{variant===3&&<path d="M27 49H36"/>}</>}
 {p.family===3 && <><path d="M22 25H77V77H22Z"/><path d={variant===2?'M39 25V49H62':'M39 25V49H62V77'}/>{variant===3&&<path d="M22 62H39"/>}</>}
 </g></svg>;
}
