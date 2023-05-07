import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-rappel-differentiel',
  templateUrl: './rappel-differentiel.component.html',
  styleUrls: ['./rappel-differentiel.component.css']
})
export class RappelDifferentielComponent implements OnInit {
  rappelForm: FormGroup;
  collectAmmont: any;
  dueAmont: any;
  startDate: any;
  endDate: any;
  showResult: any;
  resultIndemnity: any;
  ngPickerStartDate: any;
  ngPickerEndDate: any;
  numberYear: any;
  numberMonth: any;
  numberDay: any;
  message: any;
  showMessage: boolean;

  constructor(private fb: FormBuilder, private utilsService: UtilsService, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.rappelForm = this.fb.group({
      collectAmmont: ['', Validators.required],
      dueAmont: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  disableDate() {
    return false;
  }

  getStartDate(value: any) {
    this.ngPickerStartDate = value;
    this.startDate = new Date(this.utilsService.formatCompareDate(value));
  }

  getEndDate(value: any) {
    this.ngPickerEndDate = value;
    this.endDate = new Date(this.utilsService.formatCompareDate(value));
  }

  addDays(date: any, days: any) {
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() - days)
    return copy
  }

  formatDate(date: any) {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    let year = d.getFullYear();
    return [month, day, year].join('/');
  }

  process() {
    this.showMessage = false;
    this.showResult = false;
    let collect = this.rappelForm.get('collectAmmont')?.value;
    let due = this.rappelForm.get('dueAmont')?.value;
    if (collect >= due) {
      this.message = "La somme perçue doit être inférieur à la somme due.";
      this.showMessage = true;
      return
    }
    let compareDate1 = this.utilsService.formatDateSeparateAMJ(this.ngPickerStartDate);
    let compareDate2 = this.utilsService.formatDateSeparateAMJ(this.ngPickerEndDate);
    if (compareDate1 < compareDate2) {
      let result = this.dateDiff(compareDate1, compareDate2);
      console.log(result)
      let numberMonth = result.month;
      //let numberYear = result.year;
      //let numberDay = result.day;
      /* this.endDate = new Date(this.utilsService.formatDateSeparate(this.ngPickerEndDate));
       let numberDayStartingDate = this.addDays(this.endDate, numberDay);
       var end = new Date(this.formatDate(this.endDate));
       var loop = new Date(numberDayStartingDate);
       let workingDay = 0;
       if (end.getDay() == 0) {
         end.setDate(end.getDate() - 1)
       }
       while (loop <= end) {
         var newDate = loop.setDate(loop.getDate() + 1);
         loop = new Date(newDate);
         if (loop.getDay() != 0) {
           workingDay = workingDay + 1;
         }
       }
       numberMonth = (numberYear * 12) + numberMonth;
       this.resultIndemnity = Math.round(((due - collect) * numberMonth) + ((workingDay * (due - collect)) / 26));*/
      this.resultIndemnity = Math.round(((due - collect) * numberMonth));
      this.resultIndemnity = this.formatCurrencyNew(this.resultIndemnity);
      this.showResult = true;
    } else {
      this.message = "la date de fin doit être supérieure à la date de début.";
      this.showMessage = true;
    }
  }

  formatCurrencyNew(value: any) {
    let amont = formatCurrency(value, this.locale, 'XOF', '', '4.0-0');
    amont = amont.replace(/\,/g, ' ');
    return amont.replace(/[A-Z]+/g, "");
  }

  cancel() {
    this.rappelForm.reset();
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
    date1 = new Date(this.utilsService.formatCompareDate(this.ngPickerStartDate));
    date2 = new Date(this.utilsService.formatCompareDate(this.ngPickerEndDate));
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  dateDiff(startingDate: any, endingDate: any) {
    var startDate = new Date(new Date(startingDate).toISOString().substr(0, 10));
    if (!endingDate) {
      endingDate = new Date().toISOString().substr(0, 10); // need date in YYYY-MM-DD format
    }
    var endDate = new Date(endingDate);
    if (startDate > endDate) {
      var swap = startDate;
      startDate = endDate;
      endDate = swap;
    }
    var startYear = startDate.getFullYear();
    var february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    var daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var yearDiff = endDate.getFullYear() - startYear;
    var monthDiff = endDate.getMonth() - startDate.getMonth();
    if (monthDiff < 0) {
      yearDiff--;
      monthDiff += 12;
    }

    var dayDiff = endDate.getDate() - startDate.getDate();
    if (dayDiff < 0) {
      if (monthDiff > 0) {
        monthDiff--;
      } else {
        yearDiff--;
        monthDiff = 11;
      }
      dayDiff += daysInMonth[startDate.getMonth()];
    }
    let result = {
      'year': yearDiff,
      'month': monthDiff,
      'day': dayDiff
    }
    return result;
  }

  printPage() {
    window.print();
  }

}
