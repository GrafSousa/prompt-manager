import { test, expect } from '@/infra/test/e2e/setup-e2e';

test.describe('e2e: Home page', () => {
  test('load page', async ({ page }) => {
    const response = await page.goto('/');

    expect(response?.ok()).toBeTruthy();

    await expect(
      page.getByRole('heading', { name: 'Select prompt' })
    ).toBeVisible();

    await expect(
      page.getByText('Choose a prompt from the list to view and edit.')
    ).toBeVisible();
  });
});
