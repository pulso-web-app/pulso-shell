import { expect, test } from '@playwright/test';

test('renders the login page', async ({ page }) => {
  await page.goto('/login');

  await expect(page.locator('mat-card-title')).toHaveText('Pulso');
  await expect(page).toHaveTitle('Login');
});
