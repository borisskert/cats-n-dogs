import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cat } from '../../models/cat';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: [ './cat-details.component.scss' ]
})
export class CatDetailsComponent implements OnInit {

  @Input() cat: Cat;
  @Output() save = new EventEmitter<Cat>();
  @Output() cancel = new EventEmitter<void>();

  public catForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.catForm = new FormGroup({
      id: new FormControl({ value: this.cat.id, disabled: true }, Validators.required),
      name: new FormControl(this.cat.name, [ Validators.required ]),
      race: new FormControl(this.cat.race, [ Validators.required ]),
      age: new FormControl(this.cat.age, [ Validators.required ]),
      owner: new FormControl(this.cat.owner, [ Validators.required ]),
    });
  }

  onSubmit() {
    const { id, name, race, age, owner } = this.catForm.getRawValue();
    this.save.emit({ id, name, race, age, owner, created: this.cat.created });
  }

  onCancel() {
    this.cancel.emit();
  }
}
