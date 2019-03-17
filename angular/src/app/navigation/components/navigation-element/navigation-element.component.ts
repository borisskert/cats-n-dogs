import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationElement } from '../../models/navigation-element';

@Component({
  selector: 'app-navigation-element',
  templateUrl: './navigation-element.component.html',
  styleUrls: ['./navigation-element.component.scss']
})
export class NavigationElementComponent implements OnInit {

  @Input() isSelected: boolean;
  @Input() navigationElement: NavigationElement;
  @Output() select = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelect() {
    this.select.emit();
  }
}
