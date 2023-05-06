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
}