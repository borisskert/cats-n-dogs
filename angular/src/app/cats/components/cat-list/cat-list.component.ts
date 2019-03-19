import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cat, newCat } from '../../models/cat';

@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: [ './cat-list.component.scss' ]
})
export class CatListComponent implements OnInit {

  @Input() cats: Cat[];
  @Output() showDetails = new EventEmitter<string>();
  @Output() create = new EventEmitter<Cat>();
  @Output() delete = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowDetails(id: string) {
    this.showDetails.emit(id);
  }

  onCreate() {
    this.create.emit(newCat());
  }

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
