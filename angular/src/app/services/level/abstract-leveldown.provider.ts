import { Injectable } from '@angular/core';

@Injectable()
export abstract class AbstractLeveldownProvider {
  abstract get(name: string): any;
}
