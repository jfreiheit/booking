import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users!: User[];

  constructor(private bs: BackendService) {
    this.bs.allUsers().subscribe( response => {
      this.users = response;
      console.log('this.users', this.users)
    });
  }

  ngOnInit(): void {
  }

}
