import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigationElement } from '../../models/navigation-element';
import { NavigationElementType } from '../../models/navigation-element-type';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  @Input() navigationElements: NavigationElement[];
  @Input() selectedType: NavigationElementType;
  @Output() navigate = new EventEmitter<NavigationElementType>();

  constructor() { }

  ngOnInit(): void {
  }

  onNavigate(type: NavigationElementType) {
    this.navigate.emit(type);
  }
}
