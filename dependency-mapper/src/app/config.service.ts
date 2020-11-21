import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import ConfigJson from '../assets/config.json';
import * as pako from 'pako';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Map<string, any>;

  constructor(private cookieService: CookieService) {
    this.config = new Map<string, any>();
  }

  encodeData(data: any, tags: any): string {
    const exportedData = {
      ...data,
      tagStyles: { ...tags }
    };

    console.log('exported data', exportedData);

    const compressedData = pako.gzip(JSON.stringify(exportedData), { to: 'string' });
    return btoa(compressedData);
  }

  decodeAndLoadData(encodedConfig: string): void {
    const compressedConfig = atob(encodedConfig);
    return JSON.parse(pako.ungzip(compressedConfig, { to: 'string' }));
  }

  // probably deprecated
  getRawConfig(): any {
    return ConfigJson;
  }

  setConfig(key: string, value: string): void {
    this.config.set(key, value);
    console.log(this.config);
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
