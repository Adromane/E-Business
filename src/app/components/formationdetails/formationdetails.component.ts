import { Component, OnDestroy, Renderer2, ElementRef, AfterViewInit  } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-formationdetails',
  templateUrl: './formationdetails.component.html',
  styleUrls: ['./formationdetails.component.scss']
})
export class FormationdetailsComponent implements OnDestroy, AfterViewInit {
  formation: any;
  
  constructor(private sharedService: SharedService, private renderer: Renderer2, private el: ElementRef) {
    // recupération des infos sur la formations sélectionner
    this.formation = sessionStorage.getItem('formation');
    this.formation = JSON.parse(this.formation);
  }

  ngAfterViewInit() {
    // Placez le focus sur l'élément souhaité (par exemple, un input)
    // const elementToFocus = this.el.nativeElement.querySelector('avantages');
    // if (elementToFocus) {
    //   this.renderer.selectRootElement(elementToFocus).focus();
    // }
  }
  

  ngOnDestroy() {
    // Code à exécuter avant que le composant ne soit détruit
    console.log('Le composant est sur le point de se fermer.');
    // Ajoutez ici le code que vous souhaitez exécuter avant la destruction du composant
    this.updateSharedIntitule()
  }

  updateSharedIntitule() {
    this.sharedService.updateVariable('');
  }
}
