import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Observable, finalize } from 'rxjs';

// Enregistrez les données de localisation pour le français
registerLocaleData(localeFr);

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  nouvelle_formation = {
    titre: "",
    description: "",
    formateur:"",
    niveau_difficulte: "",
    duree: "",
    module: "",
    prerequi: "",
    objectif: "",
    materiel: "",
    certificat: false,
    tarif: "",
    support_technique: ""
  }

  cours = {
    titre: "",
    description: "",
    urlvideo: "", 
  }

  tab_cours: any[]=[]

  levelmodalformation = "level1"

  commandes: any[] = [];
  modules: any[]=[]
  prerequis: string[]=[]
  objectifs: string[]=[]
  materiels: string[]=[]
  menu: any = "services"
  dropdown1=false
  module_focus: any;
  module_num: number = 0;
  tab_formation: any[] = [];
  details_formation = {
    titre: "",
    description: "",
    formateur: "",
    niveau_difficulte: "" ,
    duree: "",
    certificat: "",
    tarif: "",
    support_technique: "",
    modules: "",
    objectifs: "",
    prerequis: "",
    materiels: "",
    statut: "",
    iddoc:""
  };
  menuconfig="info_general"
  selectedFile: File | null = null;
  uploadProgress$: Observable<number | undefined> | null = null;
  downloadURL: string | null = null;
  details_module: any;
  updateformation: boolean = false


  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {
    this.listeCommande();
    this.listeFormations();
  }
  // Fonctions de la partie service
  listeCommande() {
    this.firestore.firestore.collection("commande_services").onSnapshot(
      querySnapchot=> {
        this.commandes = [];
        querySnapchot.forEach(doc=> {
          this.commandes.push(doc.data());
          console.log(this.commandes)
        })
      }
    )
  }

// Fonctions de la partie  formation

// Ajout et supression de module
  ajouterModule() {
    this.modules.push(this.nouvelle_formation.module)
    this.nouvelle_formation.module = ""
  }
  deleteModule(index:any){
    this.modules.splice(index, 1)
  }
// Ajout et supression de prerequi
  ajouterPrerequi() {
    this.prerequis.push(this.nouvelle_formation.prerequi)
    this.nouvelle_formation.prerequi = ""
  }
  deletePrerequi(index:any){
    this.prerequis.splice(index, 1)
  }
// Ajout et supression de materiel
  ajouterMateriel() {
    this.materiels.push(this.nouvelle_formation.materiel)
    this.nouvelle_formation.materiel = ""
  }
  deleteMateriel(index:any){
    this.materiels.splice(index, 1)
  }
  // Ajout et supression de objectif
  ajouterObjectif() {
    this.objectifs.push(this.nouvelle_formation.objectif)
    this.nouvelle_formation.objectif = ""
  }
  deleteObjectif(index:any){
    this.objectifs.splice(index, 1)
  }

  // Ajout de formations
  ajoutFormation() {
    if(this.nouvelle_formation.titre !=="" && this.nouvelle_formation.description !=="" && this.nouvelle_formation.formateur !=="" && this.nouvelle_formation.niveau_difficulte !=="" && this.nouvelle_formation.duree !=="" && this.nouvelle_formation.certificat && this.nouvelle_formation.tarif !== "" && this.nouvelle_formation.support_technique !== "" && this.modules.length !== 0 && this.prerequis.length !== 0 && this.objectifs.length !== 0 && this.materiels.length !== 0) {
      // enregistrement de la formation avec les informations de base
      this.firestore.firestore.collection('formations')
      .add({
        titre: this.nouvelle_formation.titre,
        description: this.nouvelle_formation.description,
        formateur: this.nouvelle_formation.formateur,
        niveau_difficulte: this.nouvelle_formation.niveau_difficulte ,
        duree: this.nouvelle_formation.duree,
        certificat: this.nouvelle_formation.certificat,
        tarif: this.nouvelle_formation.tarif,
        support_technique: this.nouvelle_formation.support_technique,
        modules: this.modules,
        objectifs: this.objectifs,
        prerequis: this.prerequis,
        materiels: this.materiels,
        statut: "indisponible",
      }).then(success=>{

      }, erreur=>{
        
      })
    } else {
      alert('renseigner tout les champs')
    }
  }

  // recupération des formations
  listeFormations() {
    this.firestore.firestore.collection('formations').onSnapshot(
      (querySnapchot)=>{
        this.tab_formation = [];
        querySnapchot.forEach(doc=>{
          this.tab_formation.push({
            titre: doc.data()["titre"],
            description: doc.data()["description"],
            formateur: doc.data()["formateur"],
            niveau_difficulte: doc.data()["niveau_difficulte"] ,
            duree: doc.data()["duree"],
            certificat: doc.data()["certificat"],
            tarif: doc.data()["tarif"],
            support_technique: doc.data()["support_technique"],
            modules: doc.data()["modules"],
            objectifs: doc.data()["objectifs"],
            prerequis: doc.data()["prerequis"],
            materiels: doc.data()["materiels"],
            statut: doc.data()["statut"],
            iddoc: doc.id
          })
        })
      }
    )
  }

  openConfigFormation(item:any) {
    this.details_formation = {
      titre: item.titre,
      description: item.description,
      formateur: item.formateur,
      niveau_difficulte: item.niveau_difficulte ,
      duree: item.duree,
      certificat: item.certificat,
      tarif: item.tarif,
      support_technique: item.support_technique,
      modules: item.modules,
      objectifs: item.objectifs,
      prerequis: item.prerequis,
      materiels: item.materiels,
      statut: item.statut,
      iddoc: item.iddoc
    }
  }

  configCours(item:any) {
    this.menuconfig='ajoutcours'
    this.details_module = item;
    this.listeCoursParModule()
    // let tabs = [];
    // tabs = this.details_formation.modules.split(',');
    // tabs.forEach(element=>{
    //   if(element === item) {
       
    //   }
    // })
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files?.[0];
  }

  uploadVideo(): void {
    if (this.selectedFile) {
      const path = 'formations/'+this.selectedFile.name
      const ref = this.storage.ref(path);
      const task: AngularFireUploadTask = this.storage.upload(path, this.selectedFile);

      this.uploadProgress$ = task.percentageChanges();

      task.snapshotChanges().pipe(
        finalize(() => {
          // enregistrement du cours dans la collection (cours)
          this.firestore.firestore.collection('cours').where('formation','==',this.details_formation.titre).where('module','==',this.details_module).get().then(
            (reponse)=>{
              if(reponse.empty) {
                // premier cours du module
                let titre:any = this.selectedFile?.name;
                titre = titre.substring(0,titre.lastIndexOf('.'))
                this.firestore.firestore.collection('cours').add({
                  url:path,
                  titre: titre,
                  ordre:1,
                  description: this.cours.description,
                  formation: this.details_formation.titre,
                  module: this.details_module,
                  idformation: this.details_formation.iddoc
                }).then(()=>{
                  this.selectedFile = null;
                  this.cours = {
                    titre: "",
                    description: "",
                    urlvideo: "", 
                  }
                })
              } else {
                // nieme cours dans le module
                let titre:any = this.selectedFile?.name;
                titre = titre.substring(0,titre.lastIndexOf('.'))
                this.firestore.firestore.collection('cours').add({
                  url:path,
                  titre: titre,
                  ordre: reponse.size + 1,
                  description: this.cours.description,
                  formation: this.details_formation.titre,
                  module: this.details_module,
                  idformation: this.details_formation.iddoc
                }).then(()=>{
                  this.selectedFile = null;
                  this.cours = {
                    titre: "",
                    description: "",
                    urlvideo: "", 
                  }
                })
              }
            }
          )
          // ref.getDownloadURL().subscribe((url) => {
          //   this.downloadURL = url;
          // });
        })
      ).subscribe();
    }
  }

  listeCoursParModule() {
    this.firestore.firestore.collection('cours').where('idformation','==',this.details_formation.iddoc).where('module', '==', this.details_module).onSnapshot(
      (querySnapchot)=> {
        this.tab_cours = [];
        querySnapchot.forEach(doc=>{
          this.tab_cours.push({
            url: doc.data()['url'],
            titre: doc.data()['titre'],
            ordre: doc.data()['ordre'],
            description: doc.data()['description'],
            formation: doc.data()['formation'],
            module: doc.data()['module']
          })
        })
      }
    )
  }

  StatutSet(){
    if(this.details_formation.statut === 'indisponible') {
      this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
        statut: "disponible"
      }).then(
        ()=>{
          this.details_formation.statut = 'disponible'
        }
      )
    }
    if(this.details_formation.statut === 'disponible') {
      this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
        statut: "indisponible"
      }).then(
        ()=>{
          this.details_formation.statut = 'indisponible'
        }
      )
    }
  }

  onKeyPress(event: any, param: string) {
   if(param) {
    if(param === "titre") {
      if(this.details_formation.titre !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          titre: this.details_formation.titre
        }).then(()=>{
          this.firestore.firestore.collection('cours').where('idformation', '==', this.details_formation.iddoc).get()
          .then((reponse)=>{
            if(reponse.empty) {
              alert('Modification enregistré')
            } else {
              reponse.forEach(doc=>{
                this.firestore.firestore.collection('cours').doc(doc.id).update({
                  formation: this.details_formation.titre
                }).then(()=>{
                  alert('Modification enregistré')
                })
              })
            }
           
          })
          
        })
      }
    }
    if(param === "description") {
      if(this.details_formation.description !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          description: this.details_formation.description
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "formateur") {
      if(this.details_formation.formateur !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          formateur: this.details_formation.formateur
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "duree") {
      if(this.details_formation.duree !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          duree: this.details_formation.duree
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "niveau_difficulte") {
      if(this.details_formation.niveau_difficulte !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          niveau_difficulte: this.details_formation.niveau_difficulte
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "certificat") {
      if(this.details_formation.certificat !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          certificat: this.details_formation.certificat
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "tarif") {
      if(this.details_formation.tarif !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          tarif: this.details_formation.tarif
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
    if(param === "support_technique") {
      if(this.details_formation.support_technique !== '') {
        this.firestore.firestore.collection('formations').doc(this.details_formation.iddoc).update({
          support_technique: this.details_formation.support_technique
        }).then(()=>{
          alert('Modification enregistré')
        })
      }
    }
   } else {

   }
  }

  ajoutDesCours() {

  }

  enregistrementFormation() {
   this.firestore.firestore.collection('formations').where('titre', '==', this.nouvelle_formation.titre)
   .get().then((reponse1=>{
      if(reponse1.empty) {
        //enregistrement de la formations (collection formations)
        this.firestore.firestore.collection('formations').
        add({
         titre: this.nouvelle_formation.titre,
         description: this.nouvelle_formation.description,
         formateur: this.nouvelle_formation.formateur,
         niveau_difficulte: this.nouvelle_formation.niveau_difficulte,
         duree: this.nouvelle_formation.duree,
         certificat: this.nouvelle_formation.certificat,
         tarif: this.nouvelle_formation.tarif,
         support_technique: this.nouvelle_formation.support_technique
        }).then((success1)=> {
       //enregistrement d'un  module (collection modules)
         this.firestore.firestore.collection('formations').where('titre', '==', this.nouvelle_formation.titre)
         .get().then(reponse2=>{
           reponse2.forEach(doc=>{
             this.modules.forEach((module, i)=>{
               this.firestore.firestore.collection("modules").add({
                 num: i+1 ,
                 titre: module.titre,
                 formationId: doc.id
               }).then(success2=>{
                //enregistrement des videos d'un module
                this.firestore.firestore.collection("modules").where('titre','==',module.titre).where('formationId','==', doc.id)
                .get().then(reponse3=>{
                  if(reponse3.empty) {

                  } else {
                    reponse3.forEach(doc3=>{
                      this.tab_cours.forEach(cours=>{
                        if(cours.ref && cours.file && cours.titre) {
                          this.firestore.firestore.collection('cours').add({
                            ref: cours.ref,
                            titre:cours.titre,
                            moduleId: doc3.id
                          }).then(success=>{
                            this.storage.storage.ref(cours.ref).put(cours.file)
                          })
                        }
                      })
                    })
                  }
                })
               }, error2=> {

               })
             })
           })
         }, echec2=> {
     
         })
        }, (error1)=> {
     
        })
      } else {
        // Il y a un ou des modiles déja enregistré
        reponse1.forEach(doc=>{
          this.modules.forEach((module, i)=>{
            this.firestore.firestore.collection("modules").add({
              num:i+1,
              titre:module.titre,
              formationId:doc.id
            }).then(success=>{
              // enregistrement des videos du module
              this.firestore.firestore.collection("modules").where('titre', '==', module.titre).where('formationId', '==', doc.id)
              .get().then(reponse=>{
                if(reponse.empty) {

                } else {
                  reponse.forEach(doc=>{
                    this.tab_cours.forEach(cours=>{
                      if(cours.ref && cours.file && cours.titre) {
                        this.firestore.firestore.collection('cours').add({
                          ref: cours.ref,
                          titre:cours.titre,
                          moduleId:doc.id
                        }).then(success=>{
                          this.storage.storage.ref(cours.ref).put(cours.file)
                        })
                      }
                    })
                  })
                }
              })
            })
          })
        })
      }
   }))
  
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    // Gérer le fichier sélectionné ici
    console.log(file)
    console.log('Fichier sélectionné :', file?.name);
    let titre:string = file?.name;
    titre = titre.substring(0,titre.lastIndexOf('.'))
    this.tab_cours.push({
      ref: 'formations/'+this.nouvelle_formation.titre+'/videos/'+file.name,
      file: file,
      titre: titre,
      description: ''
    })
  }

  configurerModule(item:any ,i:number) {
    this.levelmodalformation = 'level3';
    this.module_focus = item.titre
    this.module_num = i
    this.tab_cours = []
  }
  
  terminerConfigModule() {
    this.enregistrementFormation();
    this.levelmodalformation='level2';
    this.modules.forEach(element=> {
      if(element.titre === this.module_focus) {
        element.statut = 'configurer'
      }
    })
  }
}
