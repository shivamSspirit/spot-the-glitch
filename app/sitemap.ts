import type {MetadataRoute} from 'next';
const url=process.env.NEXT_PUBLIC_SITE_URL||'https://example.com';
export const dynamic='force-static';
export default function sitemap():MetadataRoute.Sitemap{return ['','about/','contact/','privacy/','terms/'].map(p=>({url:`${url}/${p}`}));}
