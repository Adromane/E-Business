import { Component } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';



@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {

  services = [
    {
      img: "../../../assets/images/developpement web.jpg",
      intitule: "Developpement web",
      prix_base: 250.000,
      description: "Nous réalisons tous vos projets liés au développement d'application web et de site internet. Vos besoin sont pris en compte et encadrer par les meilleurs conseille et compétences pour vous permettrent d'atteindre vos objectifs sur le web"
    },
    {
      img: "../../../assets/images/creer-application-mobile-ios-android.jpg",
      intitule: "Developpement mobile",
      prix_base: 300.000,
      description: "Vous désirez mettre en place une application mobile IOS/ANDROID, nous vous conseillons et assurons la réalisation d'application qui repondent à vos besoins"
    },
    {
      img: "../../../assets/images/marketing digital.png",
      intitule: "Marketing digital",
      prix_base:null ,
      description: "Communiquez efficacement grâce à des visuels percutants et convainquant"
    },
    {
      img: "../../../assets/images/62b38026bddc9_formation-tunnel-de-vente.gif",
      intitule: "Tunnel de vente",
      prix_base: 200000,
      description: "Les tunnels de vente sont aujourd'hui devenu incontournable dans la vente sur internet. Si vous souhaitez vendre en ligne, merci de nous contacter pour en savoir plus et pour mettre en place votre propre tunnel de vente"
    }
  ]

  commande = {
    intitule: "",
    prix_base: 0,
    client: "",
    email: "",
    numero: "",
    description_besoin: "",
    moyen_relance: "",
    date: ""
  }
  valider: string = "";
  currentDateTime: any;
  modalstate: any =  "details"
  constructor(private firestore: AngularFirestore,private analytics: AngularFireAnalytics) {
    analytics.logEvent("page_vue", {page_path: "/services"})
  }

  commander(item: any) {
    this.commande.intitule = item.intitule;
    this.commande.prix_base = item.prix_base;
     this.analytics.logEvent("en_savoir_plus", {service: this.commande.intitule})

    if(this.commande.intitule === "Developpement web") {
       this.analytics.logEvent("Developpement_web")
    }
    if(this.commande.intitule === "Developpement mobile") {
       this.analytics.logEvent("Developpement mobile")
    }
    if(this.commande.intitule === "Marketing digital") {
       this.analytics.logEvent("Marketing digital")
    }
    if(this.commande.intitule === "Tunnel de vente") {
       this.analytics.logEvent("Tunnel de vente")
    }
  }

  validerCommande() {
    const currentDate = new Date();
    this.currentDateTime = currentDate.toISOString(); // Vous pouvez formater la date selon vos besoins
   // this.currentDateTime = format(currentDate, "EEEE d MMMM yyyy HH:mm:ss", { locale: fr });
    this.valider = "en_attente";
    this.commande.date = this.currentDateTime;
    if(this.commande.client && this.commande.description_besoin && this.commande.email && this.commande.moyen_relance && this.commande.numero) {
      this.firestore.collection("commande_services").add(this.commande).then(
        (success)=> {
          this.valider = 'oui';
          this.commande = {
            intitule: "",
            prix_base: 0,
            client: "",
            email: "",
            numero: "",
            description_besoin: "",
            moyen_relance: "",
            date: ""
          }
      }, (erreur) => {
        this.valider = 'non'
      })
    } else {
      this.valider = 'manquant'
    }
   
  }

}
