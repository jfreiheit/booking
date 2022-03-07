import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DateAdapter } from '@angular/material/core';
import { Item } from '../models/item';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {
  today = new Date();

  inputForm = this.fb.group({
    titel: [null, Validators.required],
    betrag: [0.00, Validators.required],
    datum: [this.datepipe.transform(this.today, 'yyyy-MM-dd'), Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private datepipe: DatePipe,
    private dateAdapter: DateAdapter<Date>,
    private bs: BackendService
    ){
      this.dateAdapter.setLocale('de-DE');
  }

  onSubmit(): void {
    console.log('sessionStorage', sessionStorage.getItem('user_id'))
    let item: Item = {
      "titel": this.inputForm.value.titel,
      "betrag": this.inputForm.value.betrag,
      "datum": this.inputForm.value.datum,
      "user_id": sessionStorage.getItem('user_id') ?? ''
    }
    this.bs.booking(item).subscribe(
      response => {
                console.log('response', response);
        },
        error => {
          console.log('error', error);
        }
    )
  }
}
