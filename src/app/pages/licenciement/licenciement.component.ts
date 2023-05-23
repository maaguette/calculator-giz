import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';
import 'moment-precise-range-plugin';
import moment from 'moment/moment';

@Component({
  selector: 'app-licenciement',
  templateUrl: './licenciement.component.html',
  styleUrls: ['./licenciement.component.css']
})
export class LicenciementComponent implements OnInit {
  privateEnseignementForm: FormGroup;
  privateEnseignementMoreForm: FormGroup;
  message: any;
  messageMore: any;
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
  intervalOlder: any;
  intervalOlderMore: any;
  result: any;
  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.privateEnseignementForm = this.fb.group({
      sgmm: ['', Validators.required],
      licenciementDate: ['', Validators.required],
      engagementDate: ['', Validators.required]
    });
    this.privateEnseignementMoreForm = this.fb.group({
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


  process(solde: any, engagementDate: any, licenciementDate: any) {
    this.showMessage = false;

    let differenceOlder = moment.preciseDiff(moment(this.utilService.formatDateSeparateAMJ(engagementDate)), moment(this.utilService.formatDateSeparateAMJ(licenciementDate)));

    let date = this.utilService.formatePreciseDiff(differenceOlder);
    this.numberYear = date.year;
    this.numberMonth = date.month;
    this.numberDay = date.day;
    this.intervalOlder = date.intervalOlder;


    let compareDate1 = new Date(this.utilService.formatDateSeparate(licenciementDate));
    let compareDate2 = new Date('2018-01-01');

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
      if (compareDate1 < compareDate2) {
        if (this.intervalOlder <= 5) {
          this.result = Math.round((this.numberYear * solde * 0.25) + ((this.numberMonth / 12) * solde * 0.25) + ((this.numberDay / 360) * solde * 0.25));
        }
        if (this.intervalOlder > 5 && this.intervalOlder <= 10) {
          this.result = Math.round((solde * 5 * 0.25) + (solde * (this.numberYear - 5) * 0.3) + (solde * (this.numberMonth / 12) * 0.3) + (solde * (this.numberDay / 360) * 0.3));
        }
        if (this.intervalOlder > 10) {
          this.result = Math.round((solde * 5 * 0.25) + (solde * 5 * 0.3) + (solde * (this.numberYear - 10) * 0.4) + (solde * (this.numberMonth / 12) * 0.4) + (solde * (this.numberDay / 360) * 0.4));
        }
      }

      if (compareDate1 >= compareDate2) {
        if (this.intervalOlder <= 3) {
          this.result = Math.round((this.numberYear * solde * 0.25) + ((this.numberMonth / 12) * solde * 0.25) + ((this.numberDay / 360) * solde * 0.25));
        }
        if (this.intervalOlder > 3 && this.intervalOlder <= 8) {
          this.result = Math.round((solde * 3 * 0.25) + (solde * (this.numberYear - 3) * 0.35) + (solde * (this.numberMonth / 12) * 0.35) + (solde * (this.numberDay / 360) * 0.35));
        }
        if (this.intervalOlder > 8) {
          this.result = Math.round((solde * 3 * 0.25) + (solde * 5 * 0.35) + (solde * (this.numberYear - 8) * 0.45) + (solde * (this.numberMonth / 12) * 0.45) + (solde * (this.numberDay / 360) * 0.45));
        }
      }
      this.result = this.formatCurrencyNew(this.result);
      return this.result;
    }
  }

  processSimple() {
    this.showResult = false;
    let solde = this.privateEnseignementForm.get('sgmm')?.value;
    this.resultIndemnity = this.process(solde, this.ngPickerEngagementDate, this.ngPickerLicenciementDate);
    this.showResult = true;
  }

  processMore() {
    this.showResultMore = false;
    let solde1 = this.privateEnseignementMoreForm.get('sgmm1')?.value;
    let solde2 = this.privateEnseignementMoreForm.get('sgmm2')?.value;
    let solde3 = this.privateEnseignementMoreForm.get('sgmm3')?.value;
    let solde4 = this.privateEnseignementMoreForm.get('sgmm4')?.value;
    let solde5 = this.privateEnseignementMoreForm.get('sgmm5')?.value;
    let solde6 = this.privateEnseignementMoreForm.get('sgmm6')?.value;
    let solde7 = this.privateEnseignementMoreForm.get('sgmm7')?.value;
    let solde8 = this.privateEnseignementMoreForm.get('sgmm8')?.value;
    let solde9 = this.privateEnseignementMoreForm.get('sgmm9')?.value;
    let solde10 = this.privateEnseignementMoreForm.get('sgmm10')?.value;
    let solde11 = this.privateEnseignementMoreForm.get('sgmm11')?.value;
    let solde12 = this.privateEnseignementMoreForm.get('sgmm12')?.value;
    let totalSolde = (solde1 + solde2 + solde3 + solde4 + solde5 + solde6 + solde7 + solde8 + solde9 + solde10 + solde11 + solde12) / 12;

    this.resultIndemnityMore = this.process(totalSolde, this.ngPickerEngagementDateMore, this.ngPickerLicenciementDateMore)
    this.showResultMore = true;
  }

  cancelMore() {
    this.privateEnseignementMoreForm.reset();
    this.showResultMore = false
  }

  cancel() {
    this.privateEnseignementForm.reset();
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
