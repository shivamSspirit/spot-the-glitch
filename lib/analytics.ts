export type EventName = 'start'|'complete'|'replay'|'share'|'return';
type Adapter = (event:EventName, data:Record<string,string|number>)=>void;
let adapter:Adapter|undefined; let consent=false;
export function configureAnalytics(fn:Adapter, hasConsent:boolean) { adapter=fn; consent=hasConsent; }
export function setAnalyticsConsent(value:boolean) { consent=value; }
export function track(event:EventName,data:Record<string,string|number>={}) { if(consent && adapter) { try { adapter(event,data); } catch { /* analytics must never interrupt play */ } } }
