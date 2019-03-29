import { Provider } from '@angular/core';
import { AppConfig } from './app.config';

export class MockedAppConfig {

  private env: {
    [key: string]: string;
  } = {};

  constructor() { }

  public getValue(key: string) {
    return this.env[key];
  }

  public setup(env: {
    [key: string]: string;
  }) {
    this.env = env;
  }
}

export function provideMockedAppConfig(): Provider {
  return {
    provide: AppConfig,
    useClass: MockedAppConfig
  };
}
