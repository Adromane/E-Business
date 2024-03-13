import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss']
})
export class FormationsComponent {
  formations = [
    {
      intitule: "Developpement et Hacking du web",
      description: "Pour concrétiser ou finaliser les achats de nos formations et services, nous allons miser sur des avantages particulièrement intéressants, ce qui rejoint l’offre irrésistible; par exemple en ce qui concerne les formations, les gens se forment pour pouvoir  après trouver emplois  ou des missions rémunérés. Il faudra essayez de leurs proposer des voies et moyens pour atteindre ces objectifs après avoir acheté la formations ou même inclure dans la formation les moyens de rentabiliser ce qu’ils vont apprendrent      ",
      prix: 100000
    },
    // {
    //   intitule: "Developpement mobile Flutter",
    //   description: " Description de la formations yduyfgvudygvhstvfeytvgutezgtgzegvegv eygvuyeg vge- ve vè- eè-vyjhquyg ere",
    //   prix: 100000
    // },
    // {
    //   intitule: "Developpement mobile Ionic",
    //   description: " Description de la formations yduyfgvudygvhstvfeytvgutezgtgzegvegv eygvuyeg vge- ve vè- eè-vyjhquyg ere",
    //   prix: 100000
    // },
  ]
  sharedIntitule = "";
  sharedPrix = "";
 constructor(private sharedService: SharedService) {

 }
 
 detailFormation(formation:any = {}) {
  if(formation) {
    sessionStorage.setItem('formation', JSON.stringify(formation));
    this.sharedIntitule = formation.intitule;
    this.sharedPrix = formation.prix;
    this.updateSharedIntitule();
    // this.updateSharedPrix();
  }
 }

 updateSharedIntitule() {
  this.sharedService.updateVariable(this.sharedIntitule);
}

updateSharedPrix() {
  this.sharedService.updateVariable(this.sharedPrix);
}


}



