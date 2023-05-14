import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-anciennete',
  templateUrl: './anciennete.component.html',
  styleUrls: ['./anciennete.component.css']
})
export class AncienneteComponent implements OnInit {
  olderForm: FormGroup;
  older: any;
  supHour: any = 0;
  baseSolde: any;
  showResult: boolean;
  olderIndemnity: any;
  message: any;
  showMessage: boolean;
  constructor(private fb: FormBuilder, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.olderForm = this.fb.group({
      older: ['', Validators.required],
      baseSolde: ['', Validators.required],
      supHour: [''],
    });
  }

  process() {
    this.showMessage = false;
    this.showResult = false;
    this.baseSolde = this.olderForm.get('baseSolde')?.value;
    this.older = this.olderForm.get('older')?.value;
    this.supHour = this.olderForm.get('supHour')?.value;
    if (this.older < 2) {
      this.message = "A moins de 2 ans d'ancienneté, la prime d'ancienneté n'est pas due.";
      this.showMessage = true;
      this.showResult = false;
    } else {
      this.showMessage = false;
      if (this.olderForm.get('supHour')?.value == '') {
        this.olderIndemnity = this.baseSolde * (this.older / 100);
        this.showResult = true;
      } else {
        this.olderIndemnity = Math.trunc((this.baseSolde + ((this.baseSolde / 173.33) * this.supHour)) * (this.older / 100));
        this.showResult = true;
      }
    }
    this.olderIndemnity = this.formatCurrencyNew(this.olderIndemnity);
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  cancel() {
    this.olderForm.reset();
    this.showResult = false;
  }

  printPage() {
    window.print();
  }

}
