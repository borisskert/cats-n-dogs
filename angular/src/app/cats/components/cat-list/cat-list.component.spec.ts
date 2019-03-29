import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatListComponent } from './cat-list.component';
import { CatListItemComponent } from '../cat-list-item/cat-list-item.component';
import { getCats, getCatsArray } from '../../cats.mock';

describe('CatListComponent', () => {
  let component: CatListComponent;
  let fixture: ComponentFixture<CatListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CatListItemComponent,
        CatListComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatListComponent);
    component = fixture.componentInstance;
    component.cats = getCatsArray();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
