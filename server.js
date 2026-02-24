const express = require('express');
const { chromium } = require('playwright');

const app = express();
const port = 3000;

// 🧠 URL validation
function isValidUrl(url) {
  try {
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) return false;

    // امنع Local / Internal
    if (
      u.hostname === "localhost" ||
      u.hostname.startsWith("127.") ||
      u.hostname.endsWith(".local")
    ) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// استخدام middleware عام للتعامل مع أي طلب يبدأ بـ /scrape/
app.use((req, res, next) => {
  if (req.path.startsWith('/scrape/')) {
    handleScrape(req, res);
  } else {
    res.status(404).send("Not Found. Use /scrape/https://example.com");
  }
});

async function handleScrape(req, res) {
  try {
    // استخراج الرابط من المسار الكامل
    const target = req.path.replace('/scrape/', '');

    if (!target) {
      return res.status(400).send("Please provide a URL. Format: /scrape/https://example.com");
    }

    // 🔒 حماية أساسية
    if (!isValidUrl(target)) {
      return res.status(400).send("Invalid URL: " + target);
    }

    console.log(`Scraping: ${target}`);

    const browser = await chromium.launch({
        headless: true
    });
    const page = await browser.newPage({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    });

    await page.goto(target, {
      waitUntil: "networkidle",
      timeout: 30000,
    });

    const html = await page.content();
    await browser.close();

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(html);

  } catch (err) {
    console.error(err);
    res.status(500).send("Scrape failed\n" + err.message);
  }
}

app.listen(port, () => {
  console.log(`Scraper server running at http://localhost:${port}`);
  console.log(`Try: http://localhost:${port}/scrape/https://example.com`);
});
