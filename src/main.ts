import { program } from 'commander';

import { connectBrowser } from './browser.js';
import { scrapeExample } from './scraper.js';

interface CliOptions {
  wsEndpoint?: string;
  headless: boolean;
}

program
  .name('playwright-sample')
  .description('Playwright TypeScript sample program')
  .option('--ws-endpoint <url>', 'Playwright server WebSocket endpoint')
  .option('--headless', 'Run browser in headless mode', true)
  .option('--no-headless', 'Run browser with GUI')
  .parse();

const options = program.opts<CliOptions>();

async function main(): Promise<void> {
  const browser = await connectBrowser({
    wsEndpoint: options.wsEndpoint,
    isHeadless: options.headless,
  });

  try {
    const result = await scrapeExample(browser);

    console.log('\n=== Scraping Result ===');
    console.log(`URL: ${result.url}`);
    console.log(`Title: ${result.title}`);
    console.log(`Content:\n${result.content}`);
  } finally {
    await browser.close();
  }
}

main().catch((error: unknown) => {
  console.error('Error:', error);
  process.exit(1);
});
