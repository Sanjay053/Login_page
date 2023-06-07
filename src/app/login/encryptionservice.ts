 import { Injectable } from '@angular/core';
 import CryptoJS from 'crypto-js';

 @Injectable({
  providedIn: 'root'
})

export class EncryptionService {
  secretKey = '206c10c99d6246f784005331e384df6d13e2056b2d0037bef81de611efb62e03';

// encryption 
encryptPassword(password: string): string {
  const encrypted = CryptoJS.AES.encrypt(password, CryptoJS.enc.Hex.parse(this.secretKey), {
    mode: CryptoJS.mode.ECB
  });
  return encrypted.toString();
}

// decryption

decryptData(encryptedPassword: string): string {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedPassword, CryptoJS.enc.Hex.parse(this.secretKey), {
    mode: CryptoJS.mode.ECB
  });
  const decryptedPassword = CryptoJS.enc.Utf8.stringify(decryptedBytes);
  return decryptedPassword;
}
} 
 