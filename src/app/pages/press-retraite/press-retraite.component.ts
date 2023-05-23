import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-press-retraite',
  templateUrl: './press-retraite.component.html',
  styleUrls: ['./press-retraite.component.css']
})
export class PressRetraiteComponent implements OnInit {
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

  process() {
    this.showResult = false;
    this.showMessage = false;
    let solde = this.retraiteForm.get('sgmm')?.value;
    let totalMonth = Math.trunc(this.monthDiff(this.utilService.formatDate(this.ngPickerRetraiteDate), this.utilService.formatDate(this.ngPickerEngagementDate)));
    this.numberYear = Math.trunc(totalMonth / 12);
    this.numberMonth = totalMonth - (this.numberYear * 12);
    let totalDay = Math.trunc(this.dayDiff(this.ngPickerRetraiteDate, this.ngPickerEngagementDate));
    this.numberDay = Math.round(totalDay - (this.numberYear * 365.2425) - (this.numberMonth * 30.41666666667));
    let compareDate1 = new Date(this.utilService.formatDateSeparate(this.ngPickerRetraiteDate));
    let compareDate2 = new Date('2019-01-17');

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
      if (compareDate1 < compareDate2) {
        if (this.numberYear <= 5) {
          this.resultIndemnity = Math.round((this.numberYear * solde * 0.25) + ((this.numberMonth / 12) * solde * 0.25) + ((this.numberDay / 360) * solde * 0.25));
        }
        if (this.numberYear > 5 && this.numberYear <= 10) {
          this.resultIndemnity = Math.round((solde * 5 * 0.25) + (solde * (this.numberYear - 5) * 0.3) + (solde * (this.numberMonth / 12) * 0.3) + (solde * (this.numberDay / 360) * 0.3));
        }
        if (this.numberYear > 10) {
          this.resultIndemnity = Math.round((solde * 5 * 0.25) + (solde * 5 * 0.3) + (solde * (this.numberYear - 10) * 0.4) + (solde * (this.numberMonth / 12) * 0.4) + (solde * (this.numberDay / 360) * 0.4));
        }
      }
      if (compareDate1 >= compareDate2) {
        if (this.numberYear <= 5) {
          this.resultIndemnity = Math.round((this.numberYear * solde * 0.35) + ((this.numberMonth / 12) * solde * 0.35) + ((this.numberDay / 360) * solde * 0.35));
        }
        if (this.numberYear > 5 && this.numberYear <= 10) {
          this.resultIndemnity = Math.round((solde * 5 * 0.35) + (solde * (this.numberYear - 5) * 0.4) + (solde * (this.numberMonth / 12) * 0.4) + (solde * (this.numberDay / 360) * 0.4));
        }
        if (this.numberYear > 10 && this.numberYear <= 15) {
          this.resultIndemnity = Math.round((solde * 5 * 0.35) + (solde * 5 * 0.4) + (solde * (this.numberYear - 10) * 0.5) + (solde * (this.numberMonth / 12) * 0.5) + (solde * (this.numberDay / 360) * 0.5));
        }
        if (this.numberYear > 15) {
          this.resultIndemnity = Math.round((solde * 5 * 0.35) + (solde * 5 * 0.4) + (solde * 5 * 0.5) + (solde * (this.numberYear - 15) * 0.6) + (solde * (this.numberMonth / 12) * 0.6) + (solde * (this.numberDay / 360) * 0.6));
        }
      }
      this.resultIndemnity = this.formatCurrencyNew(this.resultIndemnity);
      this.showResult = true;
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

    let totalMonth = Math.trunc(this.monthDiff(this.utilService.formatDate(this.ngPickerRetraiteDateMore), this.utilService.formatDate(this.ngPickerEngagementDateMore)));
    this.numberYearMore = Math.trunc(totalMonth / 12);
    this.numberMonthMore = totalMonth - (this.numberYearMore * 12);
    let totalDay = Math.trunc(this.dayDiffMore(this.ngPickerEngagementDateMore, this.ngPickerRetraiteDateMore));
    this.numberDayMore = Math.round(totalDay - (this.numberYearMore * 365.2425) - (this.numberMonthMore * 30.41666666667));
    let totalSolde = (solde1 + solde2 + solde3 + solde4 + solde5 + solde6 + solde7 + solde8 + solde9 + solde10 + solde11 + solde12) / 12;
    let compareDate1 = new Date(this.utilService.formatDateSeparate(this.ngPickerRetraiteDateMore));
    let compareDate2 = new Date('2019-01-17');

    if (this.retraiteDateMore < this.engagementDateMore) {
      this.message = "La date d'engagement ne peut pas être supérieure à la date de licenciement."
      this.showMessage = true;
      return
    }
    if (this.numberYearMore < 1) {
      this.message = "Il faut 1 an d'ancienneté au moins pour prétendre à une indémnité."
      this.showMessage = true;
      return
    } else {
      if (compareDate1 < compareDate2) {
        if (this.numberYearMore <= 5) {
          this.resultIndemnityMore = Math.round(((this.numberYearMore * totalSolde * 0.25) + ((this.numberMonthMore / 12) * totalSolde * 0.25) + ((this.numberDayMore / 360) * totalSolde * 0.25)));
          this.resultIndemnityMore = this.formatCurrencyNew(this.resultIndemnityMore);
          this.showResultMore = true;
          return
        }
        if (this.numberYearMore > 5 && this.numberYearMore <= 10) {
          this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.25) + (totalSolde * (this.numberYearMore - 5) * 0.3) + (totalSolde * (this.numberMonthMore / 12) * 0.3) + (totalSolde * (this.numberDayMore / 360) * 0.3)
          );
        }
        if (this.numberYearMore > 10) {
          this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.25) + (totalSolde * 5 * 0.3) + (totalSolde * (this.numberYearMore - 10) * 0.4) + (totalSolde * (this.numberMonthMore / 12) * 0.4) + (totalSolde * (this.numberDayMore / 360) * 0.4)
          );
        }
      }
      if (compareDate1 >= compareDate2) {
        if (this.numberYearMore <= 5) {
          this.resultIndemnityMore = Math.round(((this.numberYearMore * totalSolde * 0.35) + ((this.numberMonthMore / 12) * totalSolde * 0.35) + ((this.numberDayMore / 360) * totalSolde * 0.35)));
        }
        if (this.numberYearMore > 5 && this.numberYearMore <= 10) {
          this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.35) + (totalSolde * (this.numberYearMore - 5) * 0.4) + (totalSolde * (this.numberMonthMore / 12) * 0.4) + (totalSolde * (this.numberDayMore / 360) * 0.4)
          );
        }
        if (this.numberYearMore > 10 && this.numberYearMore <= 15) {
          this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.35) + (totalSolde * 5 * 0.4) + (totalSolde * (this.numberYearMore - 10) * 0.5) + (totalSolde * (this.numberMonthMore / 12) * 0.5) + (totalSolde * (this.numberDayMore / 360) * 0.5)
          );
        }
        if (this.numberYearMore > 15) {
          this.resultIndemnityMore = Math.round((totalSolde * 5 * 0.35) + (totalSolde * 5 * 0.4) + (totalSolde * 5 * 0.5) + (totalSolde * (this.numberYearMore - 15) * 0.6) + (totalSolde * (this.numberMonthMore / 12) * 0.6) + (totalSolde * (this.numberDayMore / 360) * 0.6)
          );
        }
      }
      this.resultIndemnityMore = this.formatCurrencyNew(this.resultIndemnityMore);
      this.showResultMore = true;
    }
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
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerRetraiteDate));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  dayDiffMore(date2: any, date1: any) {
    date1 = new Date(this.utilService.formatCompareDate(this.ngPickerEngagementDateMore));
    date2 = new Date(this.utilService.formatCompareDate(this.ngPickerRetraiteDateMore));
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
