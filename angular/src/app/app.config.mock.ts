export class MockedAppConfig {

  private env: {
    [key: string]: string;
  } = null;

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
