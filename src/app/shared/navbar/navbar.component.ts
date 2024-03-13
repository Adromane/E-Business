import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navigation= "";
  formationIntitule: any;
  formationPrix: any;
  constructor(private router: Router, private sharedService: SharedService) {
      // recupération des infos sur la formations sélectionner
      this.sharedService.sharedVariable$.subscribe(value => {
         if(value) {
           this.formationIntitule = value;
           this.navigation = "detailformation"
         }
      });
  }

  serviceUrl() {
    this.router.navigateByUrl("services").then(success => {
      this.navigation = "services";
    }, error => {

    });
    
  }

  formationUrl() {
     this.router.navigateByUrl("formations").then(success => {
      this.navigation = "formations"
    }, error => {
      
    });
  }
}
