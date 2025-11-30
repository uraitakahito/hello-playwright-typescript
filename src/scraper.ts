import type { Browser } from 'playwright';

export interface ScrapingResult {
  url: string;
  title: string;
  content: string;
}

export async function scrapeExample(browser: Browser): Promise<ScrapingResult> {
  const targetUrl = 'https://example.com';

  const page = await browser.newPage();

  try {
    await page.goto(targetUrl);

    const title = await page.title();
    const content = await page.locator('body').innerText();

    return {
      url: targetUrl,
      title,
      content: content.trim(),
    };
  } finally {
    await page.close();
  }
}
