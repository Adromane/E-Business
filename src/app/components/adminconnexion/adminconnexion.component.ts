import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminconnexion',
  templateUrl: './adminconnexion.component.html',
  styleUrls: ['./adminconnexion.component.scss']
})
export class AdminconnexionComponent {
  admin={
    identifiant: "",
    password: ""
  }
  constructor(private auth: AngularFireAuth, private router: Router) {

  }


  connexionAdmin() {
    this.auth.signInWithEmailAndPassword(this.admin.identifiant, this.admin.password). then(
      (success)=>{
        this.router.navigate(["espaceAdmin"])
      }, (erreur)=>{
        alert("echec de la connexion")
      }
    )
  }
}
