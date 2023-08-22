import { Lookup } from '../classes/lookup.class';
import { Theme } from '../enums/theme.enum';

export const SUPPORTED_THEMES: Record<Theme, Lookup> = {
    [Theme.White]: new Lookup(Theme.White, 'theme.white', '#ffffff'),
    [Theme.Light]: new Lookup(Theme.Light, 'theme.light', '#f8f9fa'),
    [Theme.Dark]: new Lookup(Theme.Dark, 'theme.dark', '#1C1D22')
};