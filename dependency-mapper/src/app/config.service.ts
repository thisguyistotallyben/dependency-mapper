import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as pako from 'pako';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Map<string, any>;

  constructor(private cookieService: CookieService) {
    this.config = new Map<string, any>();
  }

  encodeData(data: any): string {
    const compressedData = pako.gzip(JSON.stringify(data), { to: 'string' });
    return btoa(compressedData);
  }

  decodeData(encodedConfig: string): void {
    const compressedConfig = atob(encodedConfig);
    return JSON.parse(pako.ungzip(compressedConfig, { to: 'string' }));
  }

  getRawConfig(): any {
    return this.config;
  }

  setConfig(key: string, value: string): void {
    this.config.set(key, value);
  }

  getConfig(key: string): any {
    return this.config.get(key);
  }

  setCookie(key: string, value: string) {
    this.cookieService.set(key, value);
  }

  getCookie(key: string): string {
    return this.cookieService.get(key);
  }
}
