const { test } = require("@playwright/test");

test("Browser Context Test", async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/");
});

test("Page Playwright Test", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/");
})