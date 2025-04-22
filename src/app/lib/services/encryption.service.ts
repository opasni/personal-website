import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
    providedIn: 'root',
})
export class EncryptionService {
    async encrypt(plainText: string): Promise<string> {
        // Import the crypto key
        const key = await this._importKey(environment.encKey);

        // Generate a random 12-byte IV (initialization vector) for AES-GCM.
        // A 12-byte (96-bit) IV is recommended for AES-GCM.
        const iv = crypto.getRandomValues(new Uint8Array(12));

        // Convert the plaintext to a Uint8Array.
        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);

        // Encrypt the data using AES-GCM
        const encryptedBuffer = await crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            key,
            data
        );

        // Convert the encrypted data and IV to base64 strings for easy transmission/storage.
        const ivBase64 = btoa(String.fromCharCode(...iv));
        const encryptedArray = new Uint8Array(encryptedBuffer);
        const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));

        // It's common to return the IV with the ciphertext so that later you can use the same IV for decryption.
        // Here we join them using a colon as a separator.
        return `${ivBase64}:${encryptedBase64}`;
    }

    private async _importKey(rawKey: string): Promise<CryptoKey> {
        // Convert the raw key string into a Uint8Array
        const encoder = new TextEncoder();
        const keyData = encoder.encode(rawKey);

        // Import the key for AES-GCM encryption.
        // Note: for AES-GCM, common key lengths are 16 bytes (AES-128) or 32 bytes (AES-256).
        return await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'AES-GCM' },
            false, // set to false to make the key non-extractable for security
            ['encrypt']
        );
    }
}
