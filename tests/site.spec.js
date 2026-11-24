import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('renders the complete companion without browser errors', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.reload();
  await expect(page).toHaveTitle(/Plate & Power/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('THE PLATE IS');
  await expect(page.locator('.signal-card')).toHaveCount(4);
  await expect(page.locator('.chapter-card')).toHaveCount(10);
  await expect(page.locator('.source-item')).toHaveCount(15);
  await expect(page.locator('.policy-card')).toHaveCount(6);
  expect(errors).toEqual([]);
});

test('access chain updates its evidence panel', async ({ page }) => {
  await page.getByRole('button', { name: /02 Availability/ }).click();
  await expect(page.locator('#access-detail h3')).toHaveText('Availability');
  await expect(page.locator('#access-detail')).toContainText('Supply ≠ access');
  await expect(page.locator('#chain-progress')).toHaveAttribute('style', /40%/);
});

test('nutrient tabs switch between protein, iron and B12 views', async ({ page }) => {
  await page.getByRole('tab', { name: /Iron absorption/ }).click();
  await expect(page.locator('#nutrient-panel')).toContainText('Content is not the same as absorption.');
  await expect(page.locator('.factor-card')).toHaveCount(4);
  await page.getByRole('tab', { name: /Vitamin B12/ }).click();
  await expect(page.locator('#nutrient-panel')).toContainText('Some nutrients need a reliable source.');
  await expect(page.getByRole('tab', { name: /Vitamin B12/ })).toHaveAttribute('aria-selected', 'true');
});

test('meal lab calculates food-role coverage and resets', async ({ page }) => {
  await page.locator('[data-food="egg"]').click();
  await page.locator('[data-food="dairy"]').click();
  await expect(page.locator('#meal-score')).toContainText('4');
  await expect(page.locator('#meal-summary')).toContainText('energy base is missing');
  await page.getByRole('button', { name: 'Reset tray' }).click();
  await expect(page.locator('#meal-score')).toContainText('0');
  await expect(page.locator('[data-food="egg"]')).toHaveAttribute('aria-pressed', 'false');
});

test('myth filters and evidence disclosures work', async ({ page }) => {
  await page.locator('[data-myth-filter="identity"]').click();
  await expect(page.locator('.myth-card')).toHaveCount(3);
  await expect(page.locator('#myth-status')).toHaveText('Showing 3 identity claims');
  await page.locator('.myth-card summary').first().click();
  await expect(page.locator('.myth-card').first()).toContainText('The book’s challenge:');
  await page.locator('[data-evidence-filter="argument"]').click();
  await expect(page.locator('.policy-card')).toHaveCount(1);
  await expect(page.locator('.policy-card')).toContainText('Author’s argument');
});

test('source and chapter dialogs expose attributed context', async ({ page }) => {
  await page.locator('.signal-card').first().locator('[data-open-source]').click();
  await expect(page.locator('#source-dialog')).toBeVisible();
  await expect(page.locator('#source-title')).toContainText('National Family Health Survey');
  await page.getByRole('button', { name: 'Close source' }).click();
  await page.locator('[data-chapter="04"]').click();
  await expect(page.locator('#chapter-dialog')).toBeVisible();
  await expect(page.locator('#chapter-dialog-title')).toHaveText('Nutrition in India');
  await expect(page.locator('#chapter-dialog-body')).toContainText('48%');
  await page.locator('[data-next-chapter="05"]').click();
  await expect(page.locator('#chapter-dialog-title')).toHaveText('Myths and Misconceptions about Food');
});

test('action checklist persists role and progress locally', async ({ page }) => {
  await page.locator('[data-role="policy"]').click();
  await page.locator('[data-action-check="0"]').check();
  await expect(page.locator('#action-progress')).toHaveText('1/4');
  await page.reload();
  await expect(page.locator('[data-role="policy"]')).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('[data-action-check="0"]')).toBeChecked();
  await page.getByRole('button', { name: 'Clear this role' }).click();
  await expect(page.locator('#action-progress')).toHaveText('0/4');
});

test('keyboard search finds a nutrient view and opens it', async ({ page }) => {
  await page.keyboard.press('/');
  await expect(page.locator('#search-dialog')).toBeVisible();
  await page.locator('#search-input').fill('B12');
  await expect(page.locator('.search-result').first()).toBeVisible();
  await page.locator('#search-input').press('Enter');
  await expect(page.locator('#search-dialog')).not.toBeVisible();
  await expect(page.getByRole('tab', { name: /Vitamin B12/ })).toHaveAttribute('aria-selected', 'true');
});

test('mobile navigation works without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.locator('#menu-trigger')).toBeVisible();
  await page.locator('#menu-trigger').click();
  await expect(page.locator('#mobile-nav')).toBeVisible();
  await page.locator('#mobile-nav a[href="#myths"]').click();
  await expect(page.locator('#mobile-nav')).toBeHidden();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('home page has no serious or critical axe violations', async ({ page }) => {
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  const serious = results.violations.filter((violation) => ['serious', 'critical'].includes(violation.impact));
  expect(serious.map((violation) => ({ id: violation.id, impact: violation.impact, nodes: violation.nodes.length }))).toEqual([]);
});
