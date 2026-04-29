import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });

const sections = [
  { name: "hero",    y: 0    },
  { name: "problem", y: 900  },
  { name: "process", y: 1800 },
  { name: "work",    y: 2700 },
  { name: "pricing", y: 3600 },
  { name: "contact", y: 4500 },
];

// Desktop (1440px)
{
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  for (const s of sections) {
    await page.evaluate(y => window.scrollTo(0, y), s.y);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `check-${s.name}.png` });
  }
  await page.close();
}

// Mobile (390px — iPhone 14)
{
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0", timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));
  for (const s of sections) {
    await page.evaluate(y => window.scrollTo(0, y), s.y);
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: `check-mobile-${s.name}.png` });
  }
  await page.close();
}

await browser.close();
console.log("done");
