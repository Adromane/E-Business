import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormationsComponent } from './components/formations/formations.component';
import { ServicesComponent } from './components/services/services.component';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { FormationdetailsComponent } from './components/formationdetails/formationdetails.component';
import { FormsModule } from '@angular/forms';
import { AdminconnexionComponent } from './components/adminconnexion/adminconnexion.component';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AccueilComponent } from './components/accueil/accueil.component';



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5WSfohCPGZMFMv_qpQC0-jcuafJk_Kg8",
  authDomain: "genietech-bac84.firebaseapp.com",
  projectId: "genietech-bac84",
  storageBucket: "genietech-bac84.appspot.com",
  messagingSenderId: "965921685967",
  appId: "1:965921685967:web:3e32920f815be7e74552ba",
  measurementId: "G-9XW1DQP5VK"
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FormationsComponent,
    ServicesComponent,
    FormationdetailsComponent,
    AdminconnexionComponent,
    AccueilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    AngularFireAnalyticsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
