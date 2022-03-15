import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Item } from '../models/item';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendURL = environment.backendURL;

  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<User> {
      return this.http.post<User>(this.backendURL + '/user/login/' + user.account, { "password": user.password });
  }

  booking(item: Item): Observable<Item> {
      return this.http.post<Item>(this.backendURL + '/item/', { item });
  }

  allUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.backendURL + '/user/');
  }

  getSum(): Observable<any> {
    return this.http.get<any>(this.backendURL + '/item/sum');
  }

  getAllItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.backendURL + '/item/all');
  }
}
