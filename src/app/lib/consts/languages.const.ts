import { Lookup } from '@lib/classes/lookup.class';
import { Language } from '@lib/enums/language.enum';

export const SUPPORTED_LANGUAGES: Record<Language, Lookup> = {
    [Language.EN]: new Lookup(Language.EN, 'English', '/assets/icons/british_flag.svg'),
    [Language.DE]: new Lookup(Language.DE, 'Deutsch', '/assets/icons/german_flag.svg'),
    [Language.SI]: new Lookup(Language.SI, 'Slovenščina', '/assets/icons/slovenian_flag.svg')
};