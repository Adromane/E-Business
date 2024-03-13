import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormationsComponent } from './components/formations/formations.component';
import { ServicesComponent } from './components/services/services.component';
import { FormationdetailsComponent } from './components/formationdetails/formationdetails.component';
import { AdminconnexionComponent } from './components/adminconnexion/adminconnexion.component';
import { AccueilComponent } from './components/accueil/accueil.component';

const routes: Routes = [
  {path:"", redirectTo: "genietechn-digitale-services", pathMatch:"full"},
  // {path:"formations", component: FormationsComponent},
  // {path:"services", component: ServicesComponent},
  // {path:"formation/:intitule", component: FormationdetailsComponent},
  {path:"admin", component: AdminconnexionComponent},
  { path: 'espaceAdmin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  {path:"genietechn-digitale-services", component: AccueilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
