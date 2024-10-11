import { describe, expect, it } from 'vitest';
import { isValidCssLength } from './css-utils';

describe('css-utils', () => {
    describe('isValidCssLength', () => {
        it('25px as valid', () => { expect(isValidCssLength('25px')).toBe(true) })
        it('25 as invalid', () => { expect(isValidCssLength('25')).toBe(false) })
        it('20% as valid', () => { expect(isValidCssLength('20%')).toBe(true) })
        it('30vw as invalid (not supported)', () => { expect(isValidCssLength('30vw')).toBe(false) })
    })
})