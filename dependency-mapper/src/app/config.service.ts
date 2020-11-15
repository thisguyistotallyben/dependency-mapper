import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import ConfigJson from '../assets/config.json';

/*
  This service is now here because circular dependencies. I'm also tired, so there might be a better way...
*/

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Map<string, any>;

  constructor(private cookieService: CookieService) {
    this.config = new Map<string, any>();
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
