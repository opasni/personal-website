import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as crypto from 'crypto-js';

@Injectable({
    providedIn: 'root',
})
export class EncryptionService {
    encrypt(text: string): string {
        const key = environment.encKey;
        return crypto.AES.encrypt(text, key).toString();
    }

    decrypt(encryptedText: string): string {
        const key = environment.encKey;
        const bytes = crypto.AES.decrypt(encryptedText, key);
        return bytes.toString(crypto.enc.Utf8);
    }
}
