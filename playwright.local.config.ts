import {defineConfig} from '@playwright/test';
import config from './playwright.config';
// Optional local verification using an already running preview and installed Chrome.
export default defineConfig({...config,webServer:undefined,use:{...config.use,channel:'chrome'}});
