import { formatCurrency, NumberFormatStyle } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent implements OnInit {
  formCongeHomme: FormGroup;
  ngPickerDateDepart: any;
  ngPickerReturnDate: any;
  dateDepart: any;
  returnDate: any;
  solde: any;
  older: any;
  expat: boolean;
  concierge: boolean;
  messsage: any;
  showMessage: boolean;
  numberMonthPrimaryConge: any;
  numberDayPrimaryConge: any;
  numberCongeSup: any;
  showResult: boolean;
  primaryIndemnity: any;
  secondaryIndemnity: any;
  numberDay: any;
  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.formCongeHomme = this.fb.group({
      solde: ['', Validators.required],
      older: ['', Validators.required],
      dateDepart: ['', Validators.required],
      returnDate: ['', Validators.required]
    });
  }

  dayDiff(date2: any, date1: any) {
    date1 = new Date(this.utilService.formatCompareDate(this.ngPickerReturnDate));
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerDateDepart));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  spaces(price: any) {
    return price.replacereplace(/,/g, ' ');
  }

  process() {
    this.showMessage = false;
    this.showResult = false;
    let dateDepart = new Date('00.00.0000');
    let returnDate = new Date('00.00.9999');
    this.solde = this.formCongeHomme.get('solde')?.value;
    this.older = this.formCongeHomme.get('older')?.value;
    dateDepart = new Date(this.utilService.formatCompareDate(this.ngPickerDateDepart));
    returnDate = new Date(this.utilService.formatCompareDate(this.ngPickerReturnDate));
    this.numberMonthPrimaryConge = Math.trunc(this.monthDiff(this.dateDepart, this.returnDate));
    let totalDay = Math.trunc(this.dayDiff(this.ngPickerDateDepart, this.ngPickerReturnDate));
    this.numberDay = Math.round(totalDay - (this.numberMonthPrimaryConge * 30.41666666667));

    if (returnDate >= dateDepart) {
      this.messsage = 'La date de depart en congé doit être supérieure à la date de retour du dernier congé.';
      this.showMessage = true;
      return
    }

    if (this.numberMonthPrimaryConge > 36) {
      this.messsage = 'La jouissance au congé se prescrit par trois ans.';
      this.showMessage = true;
      return
    }

    if (this.numberDay < 28 && this.numberMonthPrimaryConge < 12) {
      this.messsage = 'Le droit de jouissance au congé s\'acquiert après une période de référence d\'un an.';
      this.showMessage = true;
      return
    }
    else if (this.numberDay >= 28 && this.numberMonthPrimaryConge < 10) {
      this.messsage = 'Le droit de jouissance au congé s\'acquiert après une période de référence d\'un an.';
      this.showMessage = true;
      return
    }

    this.numberDayPrimaryConge = 0;
    this.numberCongeSup = 0;
    this.primaryIndemnity = 0;
    this.secondaryIndemnity = 0;
    if (!this.expat && !this.concierge && this.numberDay < 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 0;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 0;
          break;
        case '+10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 1;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 1
          break;
        case '+15':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 2;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 2
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 3;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 3
          break;
        case '+25':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 7;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 7
          break;
      }
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.expat && !this.concierge && this.numberDay < 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
          this.numberCongeSup = 0;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 0;
          break;
        case '+10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
          this.numberCongeSup = 1;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5))) * 1
          break;
        case '+15':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
          this.numberCongeSup = 2;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5))) * 2
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
          this.numberCongeSup = 3;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5))) * 3
          break;
        case '+25':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
          console.log('hhhh', this.numberDayPrimaryConge);

          this.numberCongeSup = 7;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5))) * 7
          break;
      }
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);

      this.showResult = true
    }
    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge < 24 && this.numberDay < 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 14;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 14 * Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 15;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 15
          break;
        case '+15':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 16;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 16
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 17;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 17
          break;
        case '+25':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 21;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 21
          break;
      }
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge < 36 && this.numberDay < 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 28;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 28 * Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 29;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 29
          break;
        case '+15':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 30;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 30
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 31;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 31
          break;
        case '+25':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 35;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 35
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge == 36 && this.numberDay < 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 42;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 42 * Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 43;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 43
          break;
        case '+15':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 44;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 44
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 45;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 45
          break;
        case '+25':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 49;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2))) * 49
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }


    if (!this.expat && !this.concierge && this.numberDay >= 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 0;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 0;
          break;
        case '+10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 1;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 1
          break;
        case '+15':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 2;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 2
          break;
        case '+20':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 3;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 3
          break;
        case '+25':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 7;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 7
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }

    else if (this.expat && !this.concierge && this.numberDay >= 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
          this.numberCongeSup = 0;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 0;
          break;
        case '+10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
          this.numberCongeSup = 1;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5))) * 1
          break;
        case '+15':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
          this.numberCongeSup = 2;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5))) * 2
          break;
        case '+20':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
          this.numberCongeSup = 3;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5))) * 3
          break;
        case '+25':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
          this.numberCongeSup = 7;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5))) * 7
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }

    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge < 23 && this.numberDay >= 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 14;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 14 * Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 15;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 15
          break;
        case '+15':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 16;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 16
          break;
        case '+20':
          this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
          this.numberCongeSup = 17;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 17
          break;
        case '+25':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 21;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 21
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }

    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge < 35 && this.numberDay >= 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 28;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 28 * Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 29;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 28
          break;
        case '+15':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 30;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 30
          break;
        case '+20':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 31;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 31
          break;
        case '+25':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 35;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 35
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (!this.expat && this.concierge && this.numberMonthPrimaryConge == 35 && this.numberDay >= 28) {
      switch (this.older) {
        case '-10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 42;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = 42 * Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)));
          break;
        case '+10':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 43;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 43
          break;
        case '+15':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 44;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 44
          break;
        case '+20':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 45;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 45
          break;
        case '+25':
          this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
          this.numberCongeSup = 49;
          this.primaryIndemnity = Math.round(this.solde / 12);
          this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2))) * 49
          break;
      }

      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  monthDiff(d1: any, d2: any) {
    let a = new Date(d1);
    let b = new Date(d2);
    var months;
    months = (a.getFullYear() - b.getFullYear()) * 12;
    months -= b.getMonth();
    months += a.getMonth();
    return months <= 0 ? 0 : months;
  }

  getStartDate(date: any) {
    this.ngPickerDateDepart = date;
    this.dateDepart = this.utilService.formatDate(date);
  }

  getReturnDate(date: any) {
    this.ngPickerReturnDate = date;
    this.returnDate = this.utilService.formatDate(date);
  }

  onCheckConcierge(event: any) {
    this.expat = false;
    this.concierge = event.target.checked;
  }

  onCheckExpat(event: any) {
    this.concierge = false;
    this.expat = event.target.checked;
  }
  cancel() {
    this.formCongeHomme.reset();
    this.showResult = false;
  }

  disableDate() {
    return false
  }

}