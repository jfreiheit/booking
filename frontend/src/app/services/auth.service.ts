import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: User;
  isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor(private bs: BackendService) {}

  loggedIn():Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  logout() {
    sessionStorage.removeItem('user_id');
    this.isLoggedIn.next(false);
  }

  login(user:User): Promise<boolean> {
    return new Promise( (resolve, reject) => {
    this.bs.loginUser(user).subscribe(
      response => {
                this.user = response;
                sessionStorage.setItem('user_id', this.user._id);
                console.log('response', response);
                console.log('user', this.user);
                console.log('sessionStorage', sessionStorage);
                this.isLoggedIn.next(true);
                resolve (true);
        },
        error => {
          if(error.status == 404)
          {
            console.log('Nutzername nicht bekannt!');
          }
          else
          {
            console.log('Falsches Passwort!');
          }
          this.isLoggedIn.next(false);
          reject (false);
        }
    )
    });
  }


}
