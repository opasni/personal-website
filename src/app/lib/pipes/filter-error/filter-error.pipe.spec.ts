import { describe, expect, it } from 'vitest';
import { FilterErrorPipe } from './filter-error.pipe';

describe('FilterErrorPipe', () => {
    it('create an instance', () => {
        const pipe = new FilterErrorPipe();
        expect(pipe).toBeTruthy();
    });
});
