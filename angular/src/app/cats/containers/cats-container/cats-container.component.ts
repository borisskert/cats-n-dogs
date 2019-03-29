import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { getCats, getCatToCreate, getSelectedCat } from '../../+state/selectors';
import { Cat } from '../../models/cat';
import { Observable } from 'rxjs';
import {
  CancelCatCreation,
  NewCatToCreate,
  SelectCat,
  StoreCreatedCat,
  StoreUpdatedCat,
  UnselectCat
} from '../../+state/actions';
import { DeleteItem, LoadStore } from '../../../store/+state/actions';

@Component({
  selector: 'app-cats-container',
  templateUrl: './cats-container.component.html',
  styleUrls: [ './cats-container.component.scss' ]
})
export class CatsContainerComponent implements OnInit {

  public cats$: Observable<Cat[]>;
  public catToCreate$: Observable<Cat>;
  public selectedCat$: Observable<Cat>;

  constructor(private readonly store: Store<State>) { }

  ngOnInit(): void {
    this.cats$ = this.store.select(getCats);
    this.catToCreate$ = this.store.select(getCatToCreate);
    this.selectedCat$ = this.store.select(getSelectedCat);

    this.store.dispatch(new LoadStore({ store: 'cat' }));
  }

  onNewCat(cat: Cat) {
    this.store.dispatch(new NewCatToCreate(cat));
  }

  onCreateCat(cat: Cat) {
    this.store.dispatch(new StoreCreatedCat(cat));
  }

  onUpdateCat(cat: Cat) {
    this.store.dispatch(new StoreUpdatedCat(cat));
  }

  onShowDetails(id: string) {
    this.store.dispatch(new SelectCat(id));
  }

  cancelCreation() {
    this.store.dispatch(new CancelCatCreation());
  }

  leaveCatDetails() {
    this.store.dispatch(new UnselectCat());
  }

  onDelete(id: string) {
    this.store.dispatch(new DeleteItem({ store: 'cat', id }));
  }
}
