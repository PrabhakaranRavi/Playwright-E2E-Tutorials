const { test, expect } = require('@playwright/test');

// Global setup for the test suite
test.beforeAll(async () => {
    console.log('Before all tests: Setting up preconditions if needed.');
});

// Global teardown for the test suite
test.afterAll(async () => {
    console.log('After all tests: Cleaning up resources if required.');
});

// Runs before each test
test.beforeEach(async ({ page }) => {
    console.log('Before each test: Navigating to the login page.');
    await page.goto('https://example.com/login');
});

// Runs after each test
test.afterEach(async ({ page }) => {
    const currentTest = test.info();
    console.log(`Finished ${currentTest.title} with status ${currentTest.status}`);

    if (currentTest.status !== currentTest.expectedStatus) {
        console.log(`Test failed or had issues. Current URL: ${page.url()}`);
    }
});


test('User should be able to log in successfully', async ({ page }) => {
    await page.locator('#username').fill('test_user'); 
    await expect(page.locator('#username')).toHaveValue('test_user');
    
    await page.locator('#password').fill('test_password');
    await expect(page.locator('#password')).toHaveValue('test_password');
    
    await page.locator('#loginButton').click(); 
    
    const dashboardTitle = page.locator('.dashboard-title');
    await expect(dashboardTitle).toContainText('Welcome, test_user');
});
