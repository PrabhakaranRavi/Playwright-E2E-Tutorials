const { test, expect } = require("@playwright/test");

test("CSS Property retrieving", async ({ page }) => {
    await page.goto("https://letcode.in/buttons");
    console.log(await page.title())

    /**
     * Why Use evaluate?
    The evaluate function allows direct interaction with the DOM in the browser's context, enabling operations like:

    Accessing browser-only APIs (e.g., window, document).
    Retrieving dynamically computed styles or properties.
    Executing JavaScript directly on the page.a
     */
    const button = page.locator(`//button[@id="home"]`);
    //This gives us all css Property values
    let color = await button.evaluate((ele) => {
        return window.getComputedStyle(ele);
    })

    console.log(color);
    console.log(color.backgroundColor);

    //To specifically get the values like backgroundColor

    color = await button.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("background-Color");
    })

    console.log(color + " Used getPropertyValue");

    await expect(color).toBe(`rgb(250, 124, 145)`);
    page.locator().isVisible()
    await expect(color).not.toBe(`rgb(250, 124, 150)`);
});