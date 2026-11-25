import { describe, it } from 'node:test';
import assert from 'node:assert';
import { CATEGORIES, getCategoryTitle, getCategoryIndex, isKnownCategory, titleFromSlug } from './categories.ts';

describe('categories', () => {
  it('returns registered titles', () => {
    assert.strictEqual(getCategoryTitle('form-api'), 'Form API');
    assert.strictEqual(getCategoryTitle('headless-and-apis'), 'Headless and APIs');
  });

  it('derives a title for unregistered categories', () => {
    assert.strictEqual(getCategoryTitle('site-building'), 'Site Building');
    assert.strictEqual(titleFromSlug('twig-and-php'), 'Twig and PHP');
  });

  it('orders registered categories by position and unknown ones last', () => {
    assert.deepStrictEqual(CATEGORIES.map(c => getCategoryIndex(c.slug)), CATEGORIES.map((_, i) => i));
    assert.strictEqual(getCategoryIndex('not-listed'), CATEGORIES.length);
    assert.strictEqual(isKnownCategory('security'), true);
    assert.strictEqual(isKnownCategory('random-cat'), false);
  });
});
