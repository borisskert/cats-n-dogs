import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatDetailsComponent } from './cat-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { getCatOne } from '../../cats.mock';

describe('CatDetailsComponent', () => {
  let component: CatDetailsComponent;
  let fixture: ComponentFixture<CatDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
      ],
      declarations: [ CatDetailsComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatDetailsComponent);
    component = fixture.componentInstance;
    component.cat = getCatOne();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
