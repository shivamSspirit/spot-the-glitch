'use client';
import {useEffect,useRef,useState} from 'react';
// Owner's approved CMP must grant/revoke this event; default is deny.
// Revoke removes the slot. CMP must also manage Google's consent signals/storage.
export default function Ads(){const [allowed,setAllowed]=useState(false);const slot=useRef<HTMLModElement>(null);const requested=useRef(false);
 const enabled=process.env.NEXT_PUBLIC_ADS_ENABLED==='true';const publisher=process.env.NEXT_PUBLIC_ADSENSE_CLIENT||'';const id=process.env.NEXT_PUBLIC_ADSENSE_SLOT||'';
 useEffect(()=>{const consent=(e:Event)=>setAllowed((e as CustomEvent).detail?.ads===true);window.addEventListener('glitch:consent',consent);return()=>window.removeEventListener('glitch:consent',consent);},[]);
 useEffect(()=>{if(!enabled||!allowed||!matchMedia('(min-width: 1100px)').matches||!/^ca-pub-\d{16}$/.test(publisher)||!/^\d+$/.test(id)||requested.current)return;requested.current=true;
 const script=document.createElement('script');script.async=true;script.crossOrigin='anonymous';script.src=`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisher}`;
 script.onload=()=>{try{const w=window as unknown as {adsbygoogle:unknown[]};(w.adsbygoogle=w.adsbygoogle||[]).push({});}catch{/* no-fill is harmless */}};script.onerror=()=>{/* blocked ads never interrupt game */};document.head.appendChild(script);
 },[enabled,allowed,publisher,id]);
 if(!enabled||!allowed||!/^ca-pub-\d{16}$/.test(publisher)||!/^\d+$/.test(id))return null;return <aside className="ad-surround" aria-label="Advertisement"><span>Advertisement</span><ins ref={slot} className="adsbygoogle" style={{display:'inline-block',width:728,height:90}} data-ad-client={publisher} data-ad-slot={id}/></aside>;
}
