import { Injectable } from '@angular/core';
import { AbstractLeveldownProvider } from './abstract-leveldown.provider';
import * as levelup from 'levelup';

@Injectable({
  providedIn: 'root'
})
export class LevelFactory {

  constructor(private readonly leveldownProvider: AbstractLeveldownProvider) { }

  public create(name: string) {
    const leveldown = this.leveldownProvider.get(name);
    return levelup(leveldown);
  }
}
