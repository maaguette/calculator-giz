import { formatCurrency } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from '../utils.service';

@Component({
  selector: 'app-conge-femme',
  templateUrl: './conge-femme.component.html',
  styleUrls: ['./conge-femme.component.css']
})
export class CongeFemmeComponent implements OnInit {
  showMessage: Boolean;
  showResult: boolean;
  message: any;
  formCongeWomen: FormGroup;
  dateDepart: any;
  returnDate: any;
  ngPickerDateDepart: any;
  ngPickerReturnDate: any;
  expat: boolean = false;
  numberDayPrimaryConge: any;
  primaryIndemnity: any;
  numberDay: any;
  numberCongeSup: any;
  secondaryIndemnity: any;
  numberMonthPrimaryConge: any;
  constructor(private utilService: UtilsService, private fb: FormBuilder, @Inject(LOCALE_ID) public locale: string) { }

  ngOnInit(): void {
    this.formCongeWomen = this.fb.group({
      solde: ['', Validators.required],
      older: ['', Validators.required],
      dateDepart: ['', Validators.required],
      returnDate: ['', Validators.required],
      age: ['', Validators.required],
      children: ['', Validators.required]
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

  process() {
    this.showMessage = false;
    this.showResult = false;
    let solde = this.formCongeWomen.get('solde')?.value;
    let older = this.formCongeWomen.get('older')?.value;
    let dateDepart = this.formCongeWomen.get('dateDepart')?.value;
    let returnDate = this.formCongeWomen.get('returnDate')?.value;
    let age = this.formCongeWomen.get('age')?.value;
    let children = this.formCongeWomen.get('children')?.value;
    dateDepart = new Date(this.utilService.formatCompareDate(dateDepart));
    returnDate = new Date(this.utilService.formatCompareDate(returnDate));
    this.numberMonthPrimaryConge = Math.trunc(this.monthDiff(dateDepart, returnDate));
    let totalDay = Math.trunc(this.dayDiff(this.ngPickerDateDepart, this.ngPickerReturnDate));
    this.numberDay = Math.round(totalDay - (this.numberMonthPrimaryConge * 30.41666666667));
    this.showMessage = false;
    this.showResult = false;

    if (returnDate >= dateDepart) {
      this.showMessage = true;
      this.message = "La date de départ en congé doit être supérieure à la date de retour dernier congé / engagement.";
      return
    }
    if (this.numberMonthPrimaryConge > 36) {
      this.message = 'La jouissance au congé se prescrit par trois ans.';
      this.showMessage = true;
      return
    }
    if (this.numberDay < 28 && this.numberMonthPrimaryConge < 12) {
      this.message = 'Le droit de jouissance au congé s\'acquiert après une période de référence d\'un an.';
      this.showMessage = true;
      return
    }
    else if (this.numberDay >= 28 && this.numberMonthPrimaryConge < 10) {
      this.message = 'Le droit de jouissance au congé s\'acquiert après une période de référence d\'un an.';
      this.showMessage = true;
      return
    }

    if (this.numberDay < 28 && !this.expat && age == '-21' && older == '-10') {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2 + 14;
      this.numberCongeSup = 2 * children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * (2 * children + 14));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (age == '-21' && older == '+10' || older == '+15' || older == '+20' || older == '+25') {
      this.message = "A 21 ans, il est impossible d'avoir plus de 10 ans d'ancienneté.";
      this.showMessage = true;
      return;
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '-10') {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = 2 * children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5)) * (2 * children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '-21' && older == '-10') {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = 2 * children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * (2 * children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '-21' && older == '-10') {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = 2 * children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * (2 * children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }

    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '-10' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * children);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }

    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+10' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = children + 1;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * (1 + children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+15' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = children + 2;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * (2 + children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+20' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = children + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * (3 + children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+25' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = children + 7;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * (7 + children));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '-10' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5)) * children);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+10' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = children + 1;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5)) * (children + 1));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+20' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = children + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5)) * (children + 3));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+25' && children < 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = children + 7;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 5)) * (children + 7));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '-10' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = ((children - 3) * 2) + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 3);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+10' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = ((children - 3) * 2) + 4;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / this.numberDayPrimaryConge) * this.numberCongeSup);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+15' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = ((children - 3) * 2) + 5;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 5);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+20' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = ((children - 3) * 2) + 6;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 6);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && !this.expat && age == '+21' && older == '+25' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 2;
      this.numberCongeSup = ((children - 3) * 2) + 10;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 10);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '-10' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = ((children - 3) * 2) + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 3);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+10' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = ((children - 3) * 2) + 4;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 4);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+15' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = ((children - 3) * 2) + 5;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 5);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+20' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = ((children - 3) * 2) + 6;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 6);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay < 28 && this.expat && age == '+21' && older == '+25' && children >= 4) {
      this.numberDayPrimaryConge = this.numberMonthPrimaryConge * 5;
      this.numberCongeSup = ((children - 3) * 2) + 10;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / (this.numberMonthPrimaryConge * 2)) * ((children - 3) * 2) + 10);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '-10' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * children);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+10' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = children + 1;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * (children + 1));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+15' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = children + 2;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * (children + 2));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+20' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = children + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * (children + 3));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+25' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = children + 7;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * (children + 7));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '-10' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = children;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * children);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+10' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = children + 1;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * (children + 1));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+15' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = children + 2;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * (children + 2));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+20' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = children + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * (children + 3));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+25' && children < 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 5;
      this.numberCongeSup = children + 7;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 5)) * (children + 7));
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '-10' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 3);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+10' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 4;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 4);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+15' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 5;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 5);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+20' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 6;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 6);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && this.expat && age == '+21' && older == '+25' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 10;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 10);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '-10' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 3;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 3);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+10' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 4;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 4);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+15' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 5;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 5);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+20' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 6;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 6);
      this.primaryIndemnity = this.formatCurrencyNew(this.primaryIndemnity);
      this.secondaryIndemnity = this.formatCurrencyNew(this.secondaryIndemnity);
      this.showResult = true
    }
    else if (this.numberDay >= 28 && !this.expat && age == '+21' && older == '+25' && children >= 4) {
      this.numberDayPrimaryConge = (this.numberMonthPrimaryConge + 1) * 2;
      this.numberCongeSup = ((children - 3) * 2) + 10;
      this.primaryIndemnity = Math.round(solde / 12);
      this.secondaryIndemnity = Math.round((this.primaryIndemnity / ((this.numberMonthPrimaryConge + 1) * 2)) * ((children - 3) * 2) + 10);
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

  onCheckExpat(event: any) {
    this.expat = event.target.checked;
  }

  cancel() {
    this.formCongeWomen.reset();
    this.showResult = false;
  }

  disableDate() {
    return false
  }
}
