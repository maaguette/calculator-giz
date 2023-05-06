import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-heure-sup',
  templateUrl: './heure-sup.component.html',
  styleUrls: ['./heure-sup.component.css']
})
export class HeureSupComponent implements OnInit {
  supHourForm: FormGroup;
  baseSolde: any;
  oneHour: any;
  twoHour: any;
  threeHour: any;
  fourHour: any;
  showResult: boolean;
  supHour: any;
  message: any;
  showMessage: boolean;
  constructor(private fb: FormBuilder, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.supHourForm = this.fb.group({
      baseSolde: ['', Validators.required],
      oneHour: [''],
      twoHour: [''],
      threeHour: [''],
      fourHour: [''],
    });
  }

  process() {
    this.oneHour = this.supHourForm.get('oneHour')?.value;
    this.twoHour = this.supHourForm.get('twoHour')?.value;
    this.threeHour = this.supHourForm.get('threeHour')?.value;
    this.fourHour = this.supHourForm.get('fourHour')?.value;
    this.baseSolde = this.supHourForm.get('baseSolde')?.value;
    this.showMessage = false;
    this.showResult = false;
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour == "" && this.threeHour == "" && this.fourHour == "") {
      this.message = "Veuillez renseigner au moins une valeur d'heure supplémentaire.";
      this.showMessage = true;
      this.showResult = false;
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour != "" && this.threeHour != "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.4 * this.twoHour) + (1.6 * this.threeHour) + (2 * this.fourHour));
    }

    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour == "" && this.threeHour != "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.6 * this.threeHour) + (2 * this.fourHour));
    }

    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour != "" && this.threeHour == "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.4 * this.twoHour) + (2 * this.fourHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour != "" && this.threeHour == "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.4 * this.twoHour) + (1.6 * this.threeHour));
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour == "" && this.threeHour != "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.6 * this.threeHour) + (2 * this.fourHour));
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour != "" && this.threeHour != "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.4 * this.twoHour) + (1.6 * this.threeHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour == "" && this.threeHour == "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (2 * this.fourHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour == "" && this.threeHour != "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.6 * this.threeHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour != "" && this.threeHour == "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.4 * this.twoHour));
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour == "" && this.threeHour == "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((2 * this.fourHour));
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour == "" && this.threeHour != "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.6 * this.threeHour));
    }
    if (this.baseSolde != "" && this.oneHour == "" && this.twoHour != "" && this.threeHour == "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.4 * this.twoHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour == "" && this.threeHour == "" && this.fourHour == "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour));
    }
    if (this.baseSolde != "" && this.oneHour != "" && this.twoHour != "" && this.threeHour != "" && this.fourHour != "") {
      this.supHour = (this.baseSolde / 173.33) * ((1.15 * this.oneHour) + (1.4 * this.twoHour) + (1.6 * this.threeHour) + (2 * (this.fourHour)));
    }
    this.supHour = Math.round(this.supHour);
    this.supHour = this.formatCurrencyNew(this.supHour);
    this.showResult = true

  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  cancel() {
    this.supHourForm.reset();
    this.showResult = false;
  }

  printPage() {
    window.print();
  }

}
