import { describe, expect, it } from 'vitest';
import { isValidCssLength } from './css-utils';

describe('css-utils', () => {
    it('isValidCssLength(25px) as true', () => { expect(isValidCssLength('25px')).toBe(true) })
    it('isValidCssLength(25) as false', () => { expect(isValidCssLength('25')).toBe(false) })
    it('isValidCssLength(20%) as true', () => { expect(isValidCssLength('20%')).toBe(true) })
    it('isValidCssLength(30vw) as false (not supported)', () => { expect(isValidCssLength('30vw')).toBe(false) })
})