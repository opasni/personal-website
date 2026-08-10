import { Injectable, signal } from '@angular/core';
import { Theme } from '@lib/enums/theme.enum';
import { StorageKeys } from '@lib/enums/storage-keys.enum';

export const getTheme = (): Theme => {
    const stored = localStorage.getItem(StorageKeys.SELECTED_THEME);
    if (stored) {
        return stored as Theme;
    }
    const darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (darkMode) {
        return Theme.Dark;
    }
    return Theme.Light;
};

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    private readonly _selectedTheme = signal<Theme>(getTheme());
    readonly selectedTheme = this._selectedTheme.asReadonly();

    constructor() {
        this._setBodyColor(this.selectedTheme());
    }

    setTheme(theme: Theme): void {
        this._selectedTheme.set(theme);
        this._setBodyColor(theme);
        localStorage.setItem(StorageKeys.SELECTED_THEME, theme);
    }

    private _setBodyColor(theme: Theme) {
        if (theme === Theme.Dark) {
            document.body.style.backgroundColor = '#1C1D22';
        } else {
            document.body.style.backgroundColor = '#f8f9fa';
        }
    }
}
