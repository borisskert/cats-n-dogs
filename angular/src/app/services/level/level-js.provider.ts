import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import { Injectable } from '@angular/core';
import * as leveljs from 'level-js';

@Injectable()
export class LevelJsProvider implements AbstractLeveldownProvider {
  get(name: string): any {
    return leveljs(name);
  }
}
