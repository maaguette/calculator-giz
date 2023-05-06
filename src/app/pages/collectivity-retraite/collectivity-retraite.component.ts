import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-collectivity-retraite',
  templateUrl: './collectivity-retraite.component.html',
  styleUrls: ['./collectivity-retraite.component.css']
})
export class CollectivityRetraiteComponent implements OnInit {
  collectivityretraiteForm: FormGroup;
  collectivityretraiteFormMore: FormGroup;
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

  constructor(private fb: FormBuilder, private utilService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.collectivityretraiteForm = this.fb.group({
      sgmm: ['', Validators.required],
      licenciementDate: ['', Validators.required],
      engagementDate: ['', Validators.required]
    });
    this.collectivityretraiteFormMore = this.fb.group({
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

  process() {
    this.showMessage = false;
    this.showResult = false;
    let solde = this.collectivityretraiteForm.get('sgmm')?.value;
    this.numberYear = this.yearDiff(this.engagementDate, this.licenciementDate);
    let totalMonth = Math.trunc(this.monthDiff(this.utilService.formatDate(this.ngPickerLicenciementDate), this.utilService.formatDate(this.ngPickerEngagementDate)));
    this.numberMonth = totalMonth - (this.numberYear * 12);
    let totalDay = Math.trunc(this.dayDiff(this.ngPickerLicenciementDate, this.ngPickerEngagementDate));
    this.numberDay = Math.round(totalDay - (this.numberYear * 365.2425) - (this.numberMonth * 30.41666666667));
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
      if (this.numberYear <= 5) {
        this.resultIndemnity = Math.round((this.numberYear * solde * 0.2) + ((this.numberMonth / 12) * solde * 0.2) + ((this.numberDay / 360) * solde * 0.2));
      }
      if (this.numberYear > 5 && this.numberYear <= 10) {
        this.resultIndemnity = Math.round((solde * 5 * 0.2) + (solde * (this.numberYear - 5) * 0.25) + (solde * (this.numberMonth / 12) * 0.25) + (solde * (this.numberDay / 360) * 0.25));
      }
      if (this.numberYear > 10) {
        this.resultIndemnity = Math.round((solde * 5 * 0.2) + (solde * 5 * 0.25) + (solde * (this.numberYear - 10) * 0.3) + (solde * (this.numberMonth / 12) * 0.3) + (solde * (this.numberDay / 360) * 0.3));
      }
      this.resultIndemnity = this.formatCurrencyNew(this.resultIndemnity);
      this.showResult = true;
    }
  }

  processMore() {
    this.showMessage = false;
    this.showResultMore = false;
    let solde1 = this.collectivityretraiteFormMore.get('sgmm1')?.value;
    let solde2 = this.collectivityretraiteFormMore.get('sgmm2')?.value;
    let solde3 = this.collectivityretraiteFormMore.get('sgmm3')?.value;
    let solde4 = this.collectivityretraiteFormMore.get('sgmm4')?.value;
    let solde5 = this.collectivityretraiteFormMore.get('sgmm5')?.value;
    let solde6 = this.collectivityretraiteFormMore.get('sgmm6')?.value;
    let solde7 = this.collectivityretraiteFormMore.get('sgmm7')?.value;
    let solde8 = this.collectivityretraiteFormMore.get('sgmm8')?.value;
    let solde9 = this.collectivityretraiteFormMore.get('sgmm9')?.value;
    let solde10 = this.collectivityretraiteFormMore.get('sgmm10')?.value;
    let solde11 = this.collectivityretraiteFormMore.get('sgmm11')?.value;
    let solde12 = this.collectivityretraiteFormMore.get('sgmm12')?.value;
    if (solde1 == "" && solde2 == "" && solde3 == "" && solde4 == "" && solde5 == "" && solde6 == "" && solde7 == "" && solde8 == "" && solde9 == "" && solde10 == "" && solde11 == "" && solde12 == "") {
      this.messageMore = "Veuillez insérer les valeurs des salaires avant calculer."
      this.showMessageMore = true;
    }
    this.numberYearMore = this.yearDiff(this.engagementDateMore, this.licenciementDateMore);
    let totalMonth = Math.trunc(this.monthDiff(this.utilService.formatDate(this.ngPickerLicenciementDateMore), this.utilService.formatDate(this.ngPickerEngagementDateMore)));
    this.numberMonthMore = totalMonth - (this.numberYearMore * 12);
    let totalDay = Math.trunc(this.dayDiffMore(this.ngPickerLicenciementDateMore, this.ngPickerLicenciementDateMore));
    this.numberDayMore = Math.round(totalDay - (this.numberYearMore * 365.2425) - (this.numberMonthMore * 30.41666666667));
    let totalSolde = (solde1 + solde2 + solde3 + solde4 + solde5 + solde6 + solde7 + solde8 + solde9 + solde10 + solde11 + solde12) / 12;

    if (this.licenciementDateMore < this.engagementDateMore) {
      this.message = "La date d'engagement ne peut pas être supérieure à la date de licenciement."
      this.showMessage = true;
      return
    }
    if (this.numberYearMore < 1) {
      this.message = "Il faut 1 an d'ancienneté au moins pour prétendre à une indémnité."
      this.showMessage = true;
      return
    } else {
      if (this.numberYearMore <= 5) {
        this.resultIndemnityMore = Math.round(((this.numberYearMore * totalSolde * 0.2) + ((this.numberMonthMore / 12) * totalSolde * 0.2) + ((this.numberDayMore / 360) * totalSolde * 0.2)));
        this.resultIndemnityMore = this.formatCurrencyNew(this.resultIndemnityMore);
        this.showResultMore = true;
        return
      }
      if (this.numberYearMore > 5 && this.numberYearMore <= 10) {
        this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.2) + (totalSolde * (this.numberYearMore - 5) * 0.25) + (totalSolde * (this.numberMonthMore / 12) * 0.25) + (totalSolde * (this.numberDayMore / 360) * 0.25)
        );
      }
      if (this.numberYearMore > 10) {
        this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.2) + (totalSolde * 5 * 0.25) + (totalSolde * (this.numberYearMore - 10) * 0.3) + (totalSolde * (this.numberMonthMore / 12) * 0.3) + (totalSolde * (this.numberDayMore / 360) * 0.3)
        );
      }
      this.resultIndemnityMore = this.formatCurrencyNew(this.resultIndemnityMore);
      this.showResultMore = true;
    }
  }

  cancelMore() {
    this.collectivityretraiteFormMore.reset();
    this.showResultMore = false
  }

  cancel() {
    this.collectivityretraiteForm.reset();
    this.showResult = false;
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
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerLicenciementDate));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  dayDiffMore(date2: any, date1: any) {
    date1 = new Date(this.utilService.formatCompareDate(this.ngPickerEngagementDateMore));
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerLicenciementDateMore));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  yearDiff(dt2: any, dt1: any) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60 * 24);
    return Math.abs(Math.round(diff / 365.25));
  }

  printPage() {
    window.print();
  }

}