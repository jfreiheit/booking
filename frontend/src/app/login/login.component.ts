import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  loginForm = this.fb.group({
    account: [null, Validators.required],
    password: [null, Validators.required]
  });

  hide = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    let user: User = {
      "_id": "",
      "account": this.loginForm.value.account,
      "password": this.loginForm.value.password
    }
    console.log('user login', user);
    this.authService.login(user)
    .then( res => {
      console.log('res',res);
      this.router.navigateByUrl('/');
    })
    .catch(err => console.log('err',err));
  }
}
