import { test, expect } from '@/infra/test/e2e/setup-e2e';

test.describe('e2e: Edit prompt page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('edit a prompt', async ({ page }) => {
    await page.getByRole('button', { name: 'New prompt' }).click();

    await expect(page.getByPlaceholder('Prompt title')).toBeVisible();
    await expect(page.getByPlaceholder('Prompt content')).toBeVisible();

    await page.getByPlaceholder('Prompt title').fill('Test title');
    await page.getByPlaceholder('Prompt content').fill('Test content');

    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForSelector('text=Prompt created!', {
      state: 'visible',
      timeout: 15000,
    });

    await expect(page.getByRole('listitem')).toHaveCount(1);

    await page.getByRole('link', { name: 'Test title' }).click();

    await expect(page).toHaveURL(/\/prompts\/[^/]+\/edit$/);

    expect(page.getByRole('textbox', { name: 'Title' })).toHaveValue(
      'Test title'
    );
    expect(page.getByRole('textbox', { name: 'Content' })).toHaveValue(
      'Test content'
    );

    await page.getByRole('textbox', { name: 'Title' }).fill('Edited title');
    await page.getByRole('textbox', { name: 'Content' }).fill('Edited content');

    await page.getByRole('button', { name: 'Save' }).click();

    await page.waitForSelector('text=Prompt edited!', {
      state: 'visible',
      timeout: 15000,
    });

    await expect(page.getByRole('listitem')).toHaveText([
      'Edited titleEdited content',
    ]);
  });
});
