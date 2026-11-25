import { describe, expect, it } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ScrollDetectDirective } from './scroll-detect.directive';

describe('ScrollDetect', () => {
    it('should create an instance', () => {
        TestBed.configureTestingModule({
            providers: [
                provideRouter([]),
                { provide: ElementRef, useValue: new ElementRef(document.createElement('img')) },
            ],
        });
        const directive = TestBed.runInInjectionContext(() => new ScrollDetectDirective());
        expect(directive).toBeTruthy();
    });
});
