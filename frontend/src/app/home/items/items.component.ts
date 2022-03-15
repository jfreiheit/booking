import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Item } from 'src/app/models/item';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items!: Item[];

  constructor(private datePipe: DatePipe, private bs: BackendService) {

      this.bs.getAllItems().subscribe( response => {
        this.items = response;
        console.log('this.items', this.items)
      });
  }
}
