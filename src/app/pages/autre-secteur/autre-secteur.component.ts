import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';
import 'moment-precise-range-plugin';
import moment from 'moment/moment';

@Component({
  selector: 'app-autre-secteur',
  templateUrl: './autre-secteur.component.html',
  styleUrls: ['./autre-secteur.component.css']
})
export class AutreSecteurComponent implements OnInit {
  otherSectorForm: FormGroup;
  otherSectorMoreForm: FormGroup;
  sgmm: any;
  sgmm1: any;
  sgmm2: any;
  sgmm3: any;
  sgmm4: any;
  sgmm5: any;
  sgmm6: any;
  sgmm7: any;
  sgmm8: any;
  sgmm9: any;
  sgmm10: any;
  sgmm11: any;
  sgmm12: any;
  licenciementDate: any;
  licenciementDateMore: any;
  engagementDate: any;
  engagementDateMore: any;
  olderResult: any;
  olderResultMore: any;
  showMessage: boolean;
  showMessageMore: boolean;
  showResult: boolean;
  showResultMore: boolean;
  resultIndemnity: any;
  resultIndemnityMore: any;
  numberYear: any;
  numberYearMore: any;
  numberMonth: any;
  numberMonthMore: any;
  numberDay: any;
  numberDayMore: any;
  ngPickerEngagementDate: any;
  ngPickerEngagementDateMore: any;
  ngPickerLicenciementDate: any;
  ngPickerLicenciementDateMore: any;
  message: any;
  intervalOlder: any;
  result: any;

  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.otherSectorForm = this.fb.group({
      sgmm: ['', Validators.required],
      licenciementDate: ['', Validators.required],
      engagementDate: ['', Validators.required]
    });
    this.otherSectorMoreForm = this.fb.group({
      sgmm4: ['', Validators.required],
      sgmm1: ['', Validators.required],
      sgmm2: ['', Validators.required],
      sgmm3: ['', Validators.required],
      sgmm5: ['', Validators.required],
      sgmm6: ['', Validators.required],
      sgmm7: ['', Validators.required],
      sgmm8: ['', Validators.required],
      sgmm9: ['', Validators.required],
      sgmm10: ['', Validators.required],
      sgmm11: ['', Validators.required],
      sgmm12: ['', Validators.required],
      licenciementDateMore: ['', Validators.required],
      engagementDateMore: ['', Validators.required]
    });
  }
  disableDate() {
    return false;
  }

  getEngagementDate(value: any) {
    this.ngPickerEngagementDate = value;
    this.engagementDate = new Date(this.utilService.formatCompareDate(value));

  }
  getEngagementDateMore(value: any) {
    this.ngPickerEngagementDateMore = value;
    this.engagementDateMore = new Date(this.utilService.formatCompareDate(value));
  }

  getLicencimentDate(value: any) {
    this.ngPickerLicenciementDate = value;
    this.licenciementDate = new Date(this.utilService.formatCompareDate(value));
  }

  getLicencimentDateMore(value: any) {
    this.ngPickerLicenciementDateMore = value;
    this.licenciementDateMore = new Date(this.utilService.formatCompareDate(value));
  }

  processMore() {
    this.showMessage = false;
    this.showResultMore = false;
    let solde1 = this.otherSectorMoreForm.get('sgmm1')?.value;
    let solde2 = this.otherSectorMoreForm.get('sgmm2')?.value;
    let solde3 = this.otherSectorMoreForm.get('sgmm3')?.value;
    let solde4 = this.otherSectorMoreForm.get('sgmm4')?.value;
    let solde5 = this.otherSectorMoreForm.get('sgmm5')?.value;
    let solde6 = this.otherSectorMoreForm.get('sgmm6')?.value;
    let solde7 = this.otherSectorMoreForm.get('sgmm7')?.value;
    let solde8 = this.otherSectorMoreForm.get('sgmm8')?.value;
    let solde9 = this.otherSectorMoreForm.get('sgmm9')?.value;
    let solde10 = this.otherSectorMoreForm.get('sgmm10')?.value;
    let solde11 = this.otherSectorMoreForm.get('sgmm11')?.value;
    let solde12 = this.otherSectorMoreForm.get('sgmm12')?.value;

    if (solde1 == "" && solde2 == "" && solde3 == "" && solde4 == "" && solde5 == "" && solde6 == "" && solde7 == "" && solde8 == "" && solde9 == "" && solde10 == "" && solde11 == "" && solde12 == "") {
      this.message = "Veuillez insérer les valeurs des salaires avant calculer."
      this.showMessage = true;
    } else {
      let totalSolde = (solde1 + solde2 + solde3 + solde4 + solde5 + solde6 + solde7 + solde8 + solde9 + solde10 + solde11 + solde12) / 12;

      this.resultIndemnityMore = this.process(totalSolde, this.ngPickerEngagementDateMore, this.licenciementDateMore)
      this.showResultMore = true;
    }
  }
  cancelMore() {
    this.otherSectorMoreForm.reset();
    this.showResultMore = false
  }

  cancel() {
    this.otherSectorForm.reset();
    this.showResult = false;
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  getDatesInRange(startDate: any, endDate: any) {
    const date = new Date(startDate.getTime());

    const dates = [];

    while (date < endDate) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }

    return dates;
  }

  process(solde: any, engagementDate: any, licenciementDate: any) {
    this.showMessage = false;

    let differenceOlder = moment.preciseDiff(moment(this.utilService.formatDateSeparateAMJ(engagementDate)), moment(this.utilService.formatDateSeparateAMJ(licenciementDate)));

    let date = this.utilService.formatePreciseDiff(differenceOlder);
    this.numberYear = date.year;
    this.numberMonth = date.month;
    this.numberDay = date.day;
    this.intervalOlder = date.intervalOlder;

    if (this.licenciementDate < this.engagementDate) {
      this.message = "La date d'engagement ne peut pas être supérieure à la date de licenciement."
      this.showMessage = true;
      return
    }
    if (this.numberYear < 1) {
      this.message = "Il faut 1 an d'ancienneté au moins pour prétendre à une indémnité."
      this.showMessage = true;
      return
    } else {
      if (this.intervalOlder <= 5) {
        this.result = Math.round((this.numberYear * solde * 0.25) + ((this.numberMonth / 12) * solde * 0.3) + ((this.numberDay / 360) * solde * 0.3));
      }
      if (this.intervalOlder > 5 && this.intervalOlder <= 10) {
        this.result = Math.round((solde * 5 * 0.25) + (solde * (this.numberYear - 5) * 0.3) + (solde * (this.numberMonth / 12) * 0.3) + (solde * (this.numberDay / 360) * 0.3));
      }
      if (this.intervalOlder > 10) {
        this.result = Math.round((solde * 5 * 0.25) + (solde * 5 * 0.3) + (solde * (this.numberYear - 10) * 0.4) + (solde * (this.numberMonth / 12) * 0.4) + (solde * (this.numberDay / 360) * 0.4));
      }
    }
    this.result = this.formatCurrencyNew(this.result);
    return this.result;
  }

  processSimple() {
    this.showResult = false;
    let solde = this.otherSectorForm.get('sgmm')?.value;
    this.resultIndemnity = this.process(solde, this.ngPickerEngagementDate, this.ngPickerLicenciementDate);
    this.showResult = true;
  }

  printPage() {
    window.print();
  }

}