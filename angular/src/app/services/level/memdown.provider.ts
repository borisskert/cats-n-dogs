import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import { Injectable } from '@angular/core';
import * as memdown from 'memdown';

@Injectable()
export class MemDownProvider implements AbstractLeveldownProvider {
  get(): any {
    return memdown();
  }
}
