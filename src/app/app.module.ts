import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { CongeFemmeComponent } from './pages/conge-femme/conge-femme.component';
import { HeureSupComponent } from './pages/heure-sup/heure-sup.component';
import { IfcComponent } from './pages/ifc/ifc.component';
import { LicenciementComponent } from './pages/licenciement/licenciement.component';
import { AutreSecteurComponent } from './pages/autre-secteur/autre-secteur.component';
import { RetraiteComponent } from './pages/retraite/retraite.component';
import { RappelDifferentielComponent } from './pages/rappel-differentiel/rappel-differentiel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CongesComponent } from './pages/conges/conges.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateFRParserFormatter } from './pages/dateparser.service';
import { UtilsService } from './pages/utils.service';
import { AncienneteComponent } from './pages/anciennete/anciennete.component';
import { CurrencyFormat } from './pages/pipe.service';
import { CommonModule } from '@angular/common';
import { PressLicenciementComponent } from './pages/press-licenciement/press-licenciement.component';
import { HomeComponent } from './pages/home/home.component';
import { CollectivityLicenciementComponent } from './pages/collectivity-licenciement/collectivity-licenciement.component';
import { CollectivityRetraiteComponent } from './pages/collectivity-retraite/collectivity-retraite.component';
import { PressRetraiteComponent } from './pages/press-retraite/press-retraite.component';
import { LegacyComponent } from './pages/legacy/legacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AncienneteComponent,
    CongesComponent,
    CongeFemmeComponent,
    HeureSupComponent,
    IfcComponent,
    LicenciementComponent,
    AutreSecteurComponent,
    RetraiteComponent,
    RappelDifferentielComponent,
    HomeComponent,
    PressLicenciementComponent,
    CollectivityLicenciementComponent,
    CollectivityRetraiteComponent,
    PressRetraiteComponent,
    LegacyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    // CurrencyFormat,
  ],
  providers: [
    UtilsService,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF' },
    { provide: NgbDateParserFormatter, useClass: NgbDateFRParserFormatter }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }