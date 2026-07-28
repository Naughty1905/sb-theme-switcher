import { test, expect, type Page } from '@playwright/test';

const major = process.env.SB_EXAMPLE ?? '10';

/** SB 8 and 9 examples ship 2 themes (toggle); SB 10 ships 3 (dropdown). */
const isDropdown = major === '10';

const readPreviewAttribute = (page: Page) =>
  page.evaluate(() => {
    const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
    return iframe?.contentDocument?.documentElement.getAttribute('data-theme') ?? null;
  });

const switchTheme = async (page: Page) => {
  if (isDropdown) {
    await page.getByRole('button', { name: 'Select theme' }).click();
    await page.getByRole('button', { name: 'Dark', exact: true }).click();
  } else {
    await page.getByRole('button', { name: /^Switch to / }).click();
  }
};

test.describe(`Storybook ${major}`, () => {
  test('switches the theme across manager and preview', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/?path=/story/example-button--primary');
    await expect(page.locator('#storybook-preview-iframe')).toBeAttached();

    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));
    expect(before).toBeTruthy();
    const bodyBackgroundBefore = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

    await switchTheme(page);

    await expect
      .poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme')))
      .not.toBe(before);
    await expect.poll(() => readPreviewAttribute(page)).toBe(
      await page.evaluate(() => document.documentElement.getAttribute('data-theme'))
    );
    // Regression coverage for the 0.2.0 bug (fixed in 0.2.1): deleting the
    // api.setOptions call left every other assertion in this test passing.
    await expect
      .poll(() => page.evaluate(() => getComputedStyle(document.body).backgroundColor))
      .not.toBe(bodyBackgroundBefore);

    expect(errors).toEqual([]);
  });

  test('persists the theme across a reload', async ({ page }) => {
    await page.goto('/?path=/story/example-button--primary');
    await expect(page.locator('#storybook-preview-iframe')).toBeAttached();

    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    await switchTheme(page);

    await expect
      .poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme')))
      .not.toBe(before);
    const chosen = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    await page.reload();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme')))
      .toBe(chosen);
  });

  test('restores the chosen theme when the preview is opened directly', async ({ page }) => {
    await page.goto('/?path=/story/example-button--primary');
    await expect(page.locator('#storybook-preview-iframe')).toBeAttached();

    const before = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    await switchTheme(page);

    await expect
      .poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme')))
      .not.toBe(before);
    const chosen = await page.evaluate(() => document.documentElement.getAttribute('data-theme'));

    await page.goto('/iframe.html?id=example-button--primary&viewMode=story');
    await expect
      .poll(() => page.evaluate(() => document.documentElement.getAttribute('data-theme')))
      .toBe(chosen);
  });

  test('re-themes docs pages without crashing', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/?path=/docs/example-button--docs');

    const wrapperBackground = () =>
      page.evaluate(() => {
        const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement | null;
        const doc = iframe?.contentDocument;
        const wrapper = doc?.querySelector('.sbdocs-wrapper');
        return wrapper && doc ? doc.defaultView!.getComputedStyle(wrapper).backgroundColor : null;
      });

    await expect.poll(wrapperBackground).toBeTruthy();
    const before = await wrapperBackground();

    await switchTheme(page);

    await expect.poll(wrapperBackground).not.toBe(before);
    expect(errors).toEqual([]);
  });
});
