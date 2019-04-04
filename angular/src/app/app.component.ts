import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from './+state/contract';
import { ReadStores } from './store/+state/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit {

  constructor(private readonly store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(new ReadStores());
  }
}
