import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-sum',
  templateUrl: './sum.component.html',
  styleUrls: ['./sum.component.css']
})
export class SumComponent {
  sum!: number;

  constructor(private bs: BackendService) {
    this.bs.getSum().subscribe( response => {
      console.log('response sum', response.sum)
      this.sum = response.sum;
      console.log('this.sum', this.sum)
    });
  }

}
