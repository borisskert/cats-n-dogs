import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserInfo } from '../../models/user-info.interface';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: [ './user-info.component.scss' ]
})
export class UserInfoComponent implements OnInit {

  @Input() userInfo: UserInfo;
  @Output() logout = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onLogout() {
    this.logout.emit();
  }
}