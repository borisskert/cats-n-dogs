import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../../../+state/contract';
import { getCats, getCatToCreate, getSelectedCat } from '../../+state/selectors';
import { Cat } from '../../models/cat';
import { Observable } from 'rxjs';
import { CreateCat, SaveCat, SelectCat } from '../../+state/actions';

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
  }

  onCreateCat(cat: Cat) {
    this.store.dispatch(new CreateCat(cat));
  }

  onSaveCat(cat: Cat) {
    this.store.dispatch(new SaveCat(cat));
  }

  onShowDetails(id: string) {
    this.store.dispatch(new SelectCat(id));
  }
}
