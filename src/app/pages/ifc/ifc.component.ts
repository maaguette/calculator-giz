import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-ifc',
  templateUrl: './ifc.component.html',
  styleUrls: ['./ifc.component.css']
})
export class IfcComponent implements OnInit {
  ifcForm: FormGroup;
  engagementDate: any;
  ngPickerEngagementDate: any;
  endContratDate: any;
  ngPickerContratDate: any;
  solde: any;
  showResult: boolean;
  showMessage: boolean;
  message: any;
  resultIndemnity: any;
  numberMonth: any;
  numberDay: any;
  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.ifcForm = this.fb.group({
      engagementDate: ['', Validators.required],
      endContratDate: ['', Validators.required],
      solde: ['', Validators.required]
    });
  }

  getEndContratDate(value: any) {
    this.endContratDate = this.utilService.formatDate(value);
    this.ngPickerContratDate = value;
  }

  getEngagementDate(value: any) {
    this.engagementDate = this.utilService.formatDate(value);
    this.ngPickerEngagementDate = value;
  }

  cancel() {
    this.ifcForm.reset();
    this.showResult = false;
  }

  disableDate() {
    return false
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

  dayDiff(date2: any, date1: any) {
    date1 = new Date(this.utilService.formatCompareDate(this.ngPickerEngagementDate));
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerContratDate));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  process() {
    this.showMessage = false;
    this.showResult = false;
    this.solde = this.ifcForm.get('solde')?.value;
    this.numberMonth = Math.trunc(this.monthDiff(this.endContratDate, this.engagementDate));
    let totalDay = this.dayDiff(this.engagementDate, this.endContratDate);
    this.numberDay = Math.round((totalDay - (this.numberMonth * 30.41666666667)));

    if (this.engagementDate > this.endContratDate) {
      this.message = "La date d'engagement ne peut pas être supérieure à la date de fin de contrat."
      this.showMessage = true;
      return
    }

    if (this.numberDay < 26) {
      this.resultIndemnity = (this.numberMonth * this.solde * 7) / 100
    } else if (this.numberDay >= 26) {
      this.resultIndemnity = ((this.numberMonth + 1) * this.solde * 7) / 100
    }
    this.resultIndemnity = this.formatCurrencyNew(this.resultIndemnity);

    this.showResult = true;
  }

  printPage() {
    window.print();
  }

}
