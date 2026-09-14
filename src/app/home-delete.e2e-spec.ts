import { test, expect } from '@/infra/test/e2e/setup-e2e';

test.describe('e2e: Delete a prompt', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Delete a prompt', async ({ page }) => {
    await page.getByRole('button', { name: 'New prompt' }).click();

    await expect(page.getByPlaceholder('Prompt title')).toBeVisible();
    await expect(page.getByPlaceholder('Prompt content')).toBeVisible();

    const promptTitle = 'Test title';

    await page.getByPlaceholder('Prompt title').fill(promptTitle);
    await page.getByPlaceholder('Prompt content').fill('Test content');

    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForSelector('text=Prompt created!', {
      state: 'visible',
      timeout: 15000,
    });

    await expect(page.getByRole('listitem')).toHaveCount(1);

    await page
      .getByRole('button', {
        name: `Delete ${promptTitle}`,
      })
      .click();

    await page.waitForSelector('text=Prompt deleted!', {
      state: 'visible',
      timeout: 15000,
    });

    await expect(page.getByRole('listitem')).toHaveCount(0);
  });
});
