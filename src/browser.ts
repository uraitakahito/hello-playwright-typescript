import { chromium, type Browser } from 'playwright';

export interface BrowserOptions {
  wsEndpoint?: string | undefined;
  isHeadless?: boolean | undefined;
}

export async function connectBrowser(options: BrowserOptions): Promise<Browser> {
  const { wsEndpoint, isHeadless = true } = options;

  if (wsEndpoint) {
    console.log(`Connecting to Playwright server: ${wsEndpoint}`);
    return chromium.connect(wsEndpoint);
  }

  console.log(`Launching local browser (headless: ${String(isHeadless)})`);
  return chromium.launch({ headless: isHeadless });
}
