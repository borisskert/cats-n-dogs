import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatListItemComponent } from './cat-list-item.component';
import { getCatOne } from '../../cats.mock';

describe('CatListItemComponent', () => {
  let component: CatListItemComponent;
  let fixture: ComponentFixture<CatListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatListItemComponent);
    component = fixture.componentInstance;
    component.cat = getCatOne();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
