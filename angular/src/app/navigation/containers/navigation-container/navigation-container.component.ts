import { Component, OnInit } from '@angular/core';
import { State } from '../../../+state/contract';
import { Store } from '@ngrx/store';
import { NavigationElement } from '../../models/navigation-element';
import { getNavigationElements, getSelectedNavigationType } from '../../+state/selectors';
import { Observable } from 'rxjs';
import { NavigationElementType } from '../../models/navigation-element-type';
import { DetermineNavigationSelection, SelectNavigationElement } from '../../+state/actions';

@Component({
  selector: 'app-navigation-container',
  templateUrl: './navigation-container.component.html',
  styleUrls: [ './navigation-container.component.scss' ]
})
export class NavigationContainerComponent implements OnInit {

  public navigationElements$: Observable<NavigationElement[]>;
  public selectedNavigationType$: Observable<NavigationElementType>;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.navigationElements$ = this.store.select(getNavigationElements);
    this.selectedNavigationType$ = this.store.select(getSelectedNavigationType);

    this.store.dispatch(new DetermineNavigationSelection());
  }

  onNavigate(type: NavigationElementType) {
    this.store.dispatch(new SelectNavigationElement({ selected: type }));
  }
}
