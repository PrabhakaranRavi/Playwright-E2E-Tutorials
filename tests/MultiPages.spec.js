const { test, expect } = require("@playwright/test");



test("Pages switching_ Tab/Window", async ({ browserName, page }) => {
    await page.goto("https://letcode.in/buttons");
    console.log(await page.title())
    
    console.log(`Browser Name: ${browserName}`);
    
    //Example: Handle a New Tab or Window
    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Waits for the new page to open
        page.locator('a[target="_blank"]').click(), // Trigger the new tab or window
    ]);

    await newPage.waitForLoadState(); // Ensure the new page is fully loaded
    console.log(await newPage.title()); // Get the title of the new page

    //2. Switching Back to the Original Page
    // Interact with the original page
    await page.click('button#back-to-main');

    // Interact with the new page
    await newPage.fill('input[name="email"]', 'example@example.com');

    //3. Handling Multiple Open Pages
    const pages = context.pages(); // Get all open pages (tabs or windows)
    for (const pg of pages) {
        console.log(await pg.title());
    }

    //5. Switching Between Windows by Title or URL
    // Wait for a page with a specific title or URL
    const targetPage = await context.waitForEvent('page', async (page) => {
        return (await page.title()) === 'Target Page Title';
    });

    await targetPage.waitForLoadState();
    console.log(await targetPage.url()); // Interact with the desired page

    //6. Closing or Reusing Pages
    await newPage.close();

    const allPages = context.pages();
    await allPages[1].click('button#some-action'); // Interact with the second tab/window

});