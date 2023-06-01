import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Theme } from '../modules/share/enums/theme.enum';
import { StorageKeys } from '../modules/share/enums/storage-keys.enum';

export const getTheme = () => {
    const stored = localStorage.getItem(StorageKeys.SELECTED_THEME);
    if (stored) {
        return stored as Theme;
    }
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode) {
        return Theme.Dark;
    }
    return Theme.Light;
}

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    public readonly selectedTheme = new BehaviorSubject<Theme>(Theme.Light);

    constructor() {
        this.selectedTheme.next(getTheme());
    }

    setTheme(theme: Theme): void {
        this.selectedTheme.next(theme);
        localStorage.setItem(StorageKeys.SELECTED_THEME, theme);
    }
}