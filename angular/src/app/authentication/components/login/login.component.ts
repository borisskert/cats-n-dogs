import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoginCredentials } from '../../models/login-credentials.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {

  @Output() login = new EventEmitter<LoginCredentials>();

  public loginForm = new FormGroup({
    username: new FormControl('', [ Validators.required ]),
    password: new FormControl('', [ Validators.required ])
  });

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    this.login.emit({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    });
  }
}
