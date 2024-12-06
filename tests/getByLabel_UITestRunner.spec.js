const { test, expect } = require("@playwright/test");

test("E2E Scenario_Order", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    console.log(await page.title())

    /***
    * Understand how GetByLabel works & Playwright UI Runner with an example
    * npx playwright test --ui
    */

    await page.getByLabel(`Check me out if you Love IceCreams!`).click();
    await page.getByLabel(`Employed`).check();
    await page.getByLabel(`Gender`).selectOption(`Female`);

    /**
    * 34. Filtering elements with GetByRole,GetByText and perform chaining methods in step
    */

    await page.getByPlaceholder(`Password`).fill(`abc123`);
    await page.getByRole("button", { name: "Submit" }).click();
    await page.getByText(` The Form has been submitted successfully!.`).isVisible();

    await page.getByRole("link", { name: "Shop" }).click();
    await page.locator(`app-card`).filter({ hasText: "Nokia Edge" }).getByRole(`button`).click();
});