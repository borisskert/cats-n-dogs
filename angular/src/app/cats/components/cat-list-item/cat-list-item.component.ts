import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cat } from '../../models/cat';

@Component({
  selector: 'app-cat-list-item',
  templateUrl: './cat-list-item.component.html',
  styleUrls: [ './cat-list-item.component.scss' ]
})
export class CatListItemComponent implements OnInit {

  @Input() cat: Cat;
  @Output() showDetails = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onShowDetails() {
    this.showDetails.emit(this.cat.id);
  }
}
