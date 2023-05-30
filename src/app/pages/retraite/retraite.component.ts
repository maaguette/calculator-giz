import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';
import 'moment-precise-range-plugin';
import moment from 'moment/moment';

@Component({
  selector: 'app-retraite',
  templateUrl: './retraite.component.html',
  styleUrls: ['./retraite.component.css']
})
export class RetraiteComponent implements OnInit {
  retraiteForm: FormGroup;
  retraiteMoreForm: FormGroup;
  retraiteDate: any;
  engagementDate: any;
  showResult: boolean;
  numberYear: any;
  numberMonth: any;
  numberDay: any;
  resultIndemnity: any;
  ngPickerEngagementDate: any;
  ngPickerEngagementDateMore: any;
  engagementDateMore: any;
  ngPickerRetraiteDate: any;
  ngPickerRetraiteDateMore: any;
  retraiteDateMore: any;
  numberYearMore: any;
  numberMonthMore: any;
  numberDayMore: any;
  resultIndemnityMore: any;
  showResultMore: boolean;
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
  message: any;
  showMessage: boolean;
  intervalOlder: any;
  result: any;

  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.retraiteForm = this.fb.group({
      sgmm: ['', Validators.required],
      retraiteDate: ['', Validators.required],
      engagementDate: ['', Validators.required]
    });
    this.retraiteMoreForm = this.fb.group({
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
      retraiteDateMore: ['', Validators.required],
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

  getRetraiteDate(value: any) {
    this.ngPickerRetraiteDate = value;
    this.retraiteDate = new Date(this.utilService.formatCompareDate(value));
  }

  getretraiteDateMore(value: any) {
    this.ngPickerRetraiteDateMore = value;
    this.retraiteDateMore = new Date(this.utilService.formatCompareDate(value));
  }

  process(solde: any, engagementDate: any, retraiteDate: any) {
    this.showMessage = false;

    let differenceOlder = moment.preciseDiff(moment(this.utilService.formatDateSeparateAMJ(engagementDate)), moment(this.utilService.formatDateSeparateAMJ(retraiteDate)));

    let date = this.utilService.formatePreciseDiff(differenceOlder);
    this.numberYear = date.year;
    this.numberMonth = date.month;
    this.numberDay = date.day;
    this.intervalOlder = date.intervalOlder;


    if (this.retraiteDate < this.engagementDate) {
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
        this.result = Math.round((this.numberYear * solde * 0.25) + ((this.numberMonth / 12) * solde * 0.25) + ((this.numberDay / 360) * solde * 0.25));
      }
      if (this.intervalOlder > 5 && this.intervalOlder <= 10) {
        this.result = Math.round((solde * 5 * 0.25) + (solde * (this.numberYear - 5) * 0.3) + (solde * (this.numberMonth / 12) * 0.3) + (solde * (this.numberDay / 360) * 0.3));
      }
      if (this.intervalOlder > 10) {
        this.result = Math.round((solde * 5 * 0.25) + (solde * 5 * 0.30) + (solde * (this.numberYear - 10) * 0.4) + (solde * (this.numberMonth / 12) * 0.4) + (solde * (this.numberDay / 360) * 0.4));
      }
      this.result = this.formatCurrencyNew(this.result);
      return this.result;
    }
  }

  processMore() {
    this.showResultMore = false;
    let solde1 = this.retraiteMoreForm.get('sgmm1')?.value;
    let solde2 = this.retraiteMoreForm.get('sgmm2')?.value;
    let solde3 = this.retraiteMoreForm.get('sgmm3')?.value;
    let solde4 = this.retraiteMoreForm.get('sgmm4')?.value;
    let solde5 = this.retraiteMoreForm.get('sgmm5')?.value;
    let solde6 = this.retraiteMoreForm.get('sgmm6')?.value;
    let solde7 = this.retraiteMoreForm.get('sgmm7')?.value;
    let solde8 = this.retraiteMoreForm.get('sgmm8')?.value;
    let solde9 = this.retraiteMoreForm.get('sgmm9')?.value;
    let solde10 = this.retraiteMoreForm.get('sgmm10')?.value;
    let solde11 = this.retraiteMoreForm.get('sgmm11')?.value;
    let solde12 = this.retraiteMoreForm.get('sgmm12')?.value;

    if (solde1 == "" && solde2 == "" && solde3 == "" && solde4 == "" && solde5 == "" && solde6 == "" && solde7 == "" && solde8 == "" && solde9 == "" && solde10 == "" && solde11 == "" && solde12 == "") {
      this.message = "Veuillez insérer les valeurs des salaires avant calculer."
      this.showMessage = true;
    } else {
      let totalSolde = (solde1 + solde2 + solde3 + solde4 + solde5 + solde6 + solde7 + solde8 + solde9 + solde10 + solde11 + solde12) / 12;

      this.resultIndemnityMore = this.process(totalSolde, this.ngPickerEngagementDateMore, this.ngPickerRetraiteDateMore)
      this.showResultMore = true;
    }
  }

  processSimple() {
    this.showResult = false;
    let solde = this.retraiteForm.get('sgmm')?.value;
    this.resultIndemnity = this.process(solde, this.ngPickerEngagementDate, this.ngPickerRetraiteDate);
    this.showResult = true;
  }

  cancelMore() {
    this.retraiteMoreForm.reset();
    this.showResultMore = false
  }

  cancel() {
    this.retraiteForm.reset();
    this.showResult = false;
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  printPage() {
    window.print();
  }
}
