import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AncienneteComponent } from './pages/anciennete/anciennete.component';
import { AutreSecteurComponent } from './pages/autre-secteur/autre-secteur.component';
import { CollectivityLicenciementComponent } from './pages/collectivity-licenciement/collectivity-licenciement.component';
import { CollectivityRetraiteComponent } from './pages/collectivity-retraite/collectivity-retraite.component';
import { HeureSupComponent } from './pages/heure-sup/heure-sup.component';
import { HomeComponent } from './pages/home/home.component';
import { IfcComponent } from './pages/ifc/ifc.component';
import { LegacyComponent } from './pages/legacy/legacy.component';
import { LicenciementComponent } from './pages/licenciement/licenciement.component';
import { PressLicenciementComponent } from './pages/press-licenciement/press-licenciement.component';
import { PressRetraiteComponent } from './pages/press-retraite/press-retraite.component';
import { RappelDifferentielComponent } from './pages/rappel-differentiel/rappel-differentiel.component';
import { RetraiteComponent } from './pages/retraite/retraite.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  /*  {
     path: 'conge',
     component: CongesComponent,
   },
   {
     path: 'congefemme',
     component: CongeFemmeComponent,
   }, */
  {
    path: 'anciennete',
    component: AncienneteComponent
  },
  {
    path: 'heuresup',
    component: HeureSupComponent
  },
  {
    path: 'ifc',
    component: IfcComponent
  },
  {
    path: 'licenciement',
    component: LicenciementComponent
  },
  {
    path: 'autresecteur',
    component: AutreSecteurComponent
  },
  {
    path: 'presslicenciement',
    component: PressLicenciementComponent
  },
  {
    path: 'collectivitylicenciement',
    component: CollectivityLicenciementComponent
  },
  {
    path: 'rappeldifferentiel',
    component: RappelDifferentielComponent
  },
  {
    path: 'retraite',
    component: RetraiteComponent
  },
  {
    path: 'pressretraite',
    component: PressRetraiteComponent
  },
  {
    path: 'collectivityretraite',
    component: CollectivityRetraiteComponent
  },
  {
    path: 'legacy',
    component: LegacyComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}

