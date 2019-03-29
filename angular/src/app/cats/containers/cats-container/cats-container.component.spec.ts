import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatsContainerComponent } from './cats-container.component';
import { CatListComponent } from '../../components/cat-list/cat-list.component';
import { CatListItemComponent } from '../../components/cat-list-item/cat-list-item.component';
import { CatDetailsComponent } from '../../components/cat-details/cat-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from '../../../+state/reducer';

describe('CatsContainerComponent', () => {
  let component: CatsContainerComponent;
  let fixture: ComponentFixture<CatsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers }),
        ReactiveFormsModule,
      ],
      declarations: [
        CatListComponent,
        CatListItemComponent,
        CatDetailsComponent,
        CatsContainerComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
