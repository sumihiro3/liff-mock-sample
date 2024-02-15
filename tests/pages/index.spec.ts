import { test, expect } from '@playwright/test';
import { getMockProfile, getMockScanCodeResult } from '../../src/liff-mock/';
import fs from 'fs';

// Load mock data
const mockData = JSON.parse(
  fs.readFileSync('src/liff-mock/mock-data.json', 'utf8'),
);

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('index page', () => {
  test('Normal test', async ({ page }) => {
    const userId = process.env.TEST_USER_ID;
    if (!userId) {
      test.fail();
    }
    // get mock data
    const profile = getMockProfile(userId!, mockData);
    const scanResult = getMockScanCodeResult(userId!, mockData);
    // Wait until page loaded
    let waitTarget = await page.locator('#page-title');
    if (profile.pictureUrl) {
      waitTarget = await page.locator('#user-picture');
    }
    await waitTarget.waitFor({ state: 'visible' });
    // Check page title
    const title = await page.title();
    expect(title).toBe('LIFF mock sample');
    // Check user ID
    const userIdElement = await page.locator('#user-id');
    expect(await userIdElement.textContent()).toBe(profile.userId);
    // Check user name
    const userName = await page.locator('#user-name');
    expect(await userName.textContent()).toBe(profile.displayName);
    // Check user picture
    if (profile.pictureUrl) {
      const picture = await page.locator('#user-picture');
      expect(await picture.isVisible()).toBe(true);
      expect(await picture.getAttribute('src')).toBe(profile.pictureUrl);
    }
    // Check scan code result
    await page.locator('#scan-button').click();
    const scanCodeResult = await page.locator('#scan-code-result');
    await scanCodeResult.waitFor({ state: 'visible' });
    expect(await scanCodeResult.textContent()).toBe(scanResult.value);
  });
});
