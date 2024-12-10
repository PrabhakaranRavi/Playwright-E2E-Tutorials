const { test, expect } = require("@playwright/test");

test("E2E Scenario_Order", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    console.log(await page.title());

    const email = `anshika@gmail.com`;
    await page.getByPlaceholder(`email@example.com`).fill(email);
    await page.getByPlaceholder(`enter your passsword`).fill("Iamking@000");
    await page.getByRole(`button`, { name: "Login" }).click();

    await page.waitForLoadState("networkidle");
    await page.locator(`.card-body b`).first().waitFor();
    console.log(await page.locator(`.card-body b`).allTextContents())

    // Selecting ZARA COAT 3
    await page.locator(`.card-body`).filter({ hasText: `ZARA COAT 3` })
        .getByRole(`button`, { name: ` Add To Cart` }).click();


    await page.getByRole(`listitem`).getByRole(`button`, { name: `Cart` }).click();
    await page.locator(`div li`).first().waitFor();
    await expect(page.getByText(`ZARA COAT 3`)).toBeVisible();

    //Handling auto suggestive dropdown options with playwright
    await page.getByRole(`button`, { name: `Checkout` }).click();

    await page.getByPlaceholder(`Select Country`).pressSequentially("Ind");
    await page.getByRole(`button`, {name: "India"}).nth(1).click();   
    await page.getByText(`Place Order`).click();

    //Complete E2E flow of Placing the order and grab the OrderID with Playwright
    await expect(page.getByText(` Thankyou for the order.`)).toBeVisible();

    const orderID = await page.locator(`.em-spacer-1 label`).last().textContent();
    console.log(`orderID: ${orderID}`);

    //Dynamically find the order from OrderHistory page using Playwright Script logic

    await page.locator(`button[routerlink*="myorders"]`).click();
    await page.locator(`tbody`).waitFor();

    const orderDetailsCount = page.locator(`tbody tr`);
    for (let i = 0; i < await orderDetailsCount.count(); i++) {
        const orderDetailsID = await orderDetailsCount.nth(i).locator(`th`).textContent();

        if (orderID.includes(orderDetailsID)) {
            await orderDetailsCount.nth(i).locator(`button`).first().click();
            break;
        }
    }

    //textContent have default automatic wait
    const orderSummaryID = await page.locator(`.col-text`).first().textContent();
    console.log(`orderSummaryID: ${orderSummaryID}`)
    expect(orderID.includes(orderSummaryID)).toBeTruthy();
});