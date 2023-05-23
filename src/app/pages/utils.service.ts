import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {

  formatDate(date: any) {
    let month: any = Object.values(date)[1];
    let day: any = Object.values(date)[2];
    let year: any = Object.values(date)[0];
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    return month + '/' + day + '/' + year;
  }

  formatDateSeparate(date: any) {
    let month: any = Object.values(date)[1];
    let day: any = Object.values(date)[2];
    let year: any = Object.values(date)[0];
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    return month + '/' + day + '-' + year;
  }

  formatDateSeparateAMJ(date: any) {
    let month: any = Object.values(date)[1];
    let day: any = Object.values(date)[2];
    let year: any = Object.values(date)[0];
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    return year + '-' + month + '-' + day;
  }

  formatCompareDate(date: any) {
    let month: any = Object.values(date)[1];
    let day: any = Object.values(date)[2];
    let year: any = Object.values(date)[0];
    if (day.toString().length == 1) {
      day = '0' + day;
    }
    if (month.toString().length == 1) {
      month = '0' + month;
    }
    return month + '.' + day + '.' + year;
  }

  printPage() {
    window.print();
  }

  formatePreciseDiff(differenceOlder: any) {
    let numberDay = 0;
    let numberMonth = 0;
    let numberYear = 0;
    let numbers = differenceOlder.split(' ');

    let yearDefault;
    let monthDefault;
    let dayDefault;

    if (differenceOlder.indexOf('months') !== -1) {
      monthDefault = 'months'
    }
    if (differenceOlder.indexOf('month') !== -1) {
      monthDefault = 'month'
    }

    if (differenceOlder.indexOf('year') !== -1) {
      yearDefault = 'year'
    }
    if (differenceOlder.indexOf('years') !== -1) {
      yearDefault = 'years'
    }

    if (differenceOlder.indexOf('days') !== -1) {
      dayDefault = 'days'
    }
    if (differenceOlder.indexOf('day') !== -1) {
      dayDefault = 'day'
    }

    if (differenceOlder.indexOf(yearDefault) !== -1 && differenceOlder.indexOf(monthDefault) !== -1 && differenceOlder.indexOf(dayDefault) !== -1) {

      numberYear = parseInt(numbers[0])
      if (isNaN(numberYear)) {
        numberYear = 0;
      }

      numberMonth = parseInt(numbers[2]);
      if (isNaN(numberMonth)) {
        numberMonth = 0;
      }

      numberDay = parseInt(numbers[4]);
      if (isNaN(numberDay)) {
        numberDay = 0;
      }

    }

    if (differenceOlder.indexOf(yearDefault) !== -1 && differenceOlder.indexOf(monthDefault) !== -1 && differenceOlder.indexOf(dayDefault) == -1) {
      numberYear = parseInt(numbers[0])
      if (isNaN(numberYear)) {
        numberYear = 0;
      }

      numberMonth = parseInt(numbers[2]);
      if (isNaN(numberMonth)) {
        numberMonth = 0;
      }
      numberDay = 0;
    }


    if (differenceOlder.indexOf(yearDefault) !== -1 && differenceOlder.indexOf(monthDefault) == -1 && differenceOlder.indexOf(dayDefault) !== -1) {
      numberYear = parseInt(numbers[0])
      if (isNaN(numberYear)) {
        numberYear = 0;
      }

      numberMonth = 0;

      numberDay = parseInt(numbers[2]);
      if (isNaN(numberDay)) {
        numberDay = 0;
      }
    }

    if (differenceOlder.indexOf(yearDefault) == -1 && differenceOlder.indexOf(monthDefault) !== -1 && differenceOlder.indexOf(dayDefault) !== -1) {
      numberYear = 0;

      numberMonth = parseInt(numbers[0])
      if (isNaN(numberMonth)) {
        numberMonth = 0;
      }

      numberDay = parseInt(numbers[2]);
      if (isNaN(numberDay)) {
        numberDay = 0;
      }
    }

    if (differenceOlder.indexOf(yearDefault) !== -1 && differenceOlder.indexOf(monthDefault) == -1 && differenceOlder.indexOf(dayDefault) == -1) {
      numberYear = parseInt(numbers[0])
      if (isNaN(numberYear)) {
        numberYear = 0;
      }

      numberMonth = 0;

      numberDay = 0;
    }

    if (differenceOlder.indexOf(yearDefault) == -1 && differenceOlder.indexOf(monthDefault) !== -1 && differenceOlder.indexOf(dayDefault) == -1) {
      numberMonth = parseInt(numbers[0])
      if (isNaN(numberMonth)) {
        numberMonth = 0;
      }

      numberYear = 0;

      numberDay = 0;
    }

    if (differenceOlder.indexOf(yearDefault) == -1 && differenceOlder.indexOf(monthDefault) == -1 && differenceOlder.indexOf(dayDefault) !== -1) {
      numberDay = parseInt(numbers[0])
      if (isNaN(numberDay)) {
        numberDay = 0;
      }

      numberMonth = 0;

      numberYear = 0;
    }
    let intervalOlder = 0;
    if (numberMonth > 0 || numberDay > 0 && numberYear >= 1) {
      intervalOlder = numberYear + 1;
    }
    let response = {
      'year': numberYear,
      'month': numberMonth,
      'day': numberDay,
      'intervalOlder': intervalOlder
    }
    return response;
  }
}