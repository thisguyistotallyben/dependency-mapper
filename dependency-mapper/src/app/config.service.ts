import { Injectable } from '@angular/core';
import ConfigJson from '../assets/config.json';

/*
  I imagine this service will also handle other state things of the application outside of just the config object
*/

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor() { }

  getRawConfig(): any {
    return ConfigJson;
  }
}
