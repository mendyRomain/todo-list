import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ProfilService } from '../services/profil.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  userId: any = ""
  pseudo: string = ""  
  isAuthentified: boolean=false;

  constructor(private toastCtrl: ToastController,
              private profilService: ProfilService,
              private authService : AuthService) { }

  ngOnInit() {
    this.isAuthentified = this.authService.isAuth;
    console.log("isAuthentified = "+this.isAuthentified);
  }

  
 /*--Crée le profil si aucun profil n'est associé à l'utilisateur connecté--*/
 setProfil(){
  const{userId:any, pseudo:string} = this;

  let firstPseudo ={
    id:'',
    userId:'',
    pseudo:''
  }
  this.profilService.pushData(firstPseudo);
  this.profilService.retrieveData().then(()=>{
    console.log("get profiles check");
  }).catch((error)=>{
    console.log(error);
  }); 
}  

 /*--En fonction du login, va récupérer le profil s'il existe--*/
 getProfil(){
  const{userId, pseudo} = this;

  this.profilService.getOneData(this.userId)
    .then      ((result)=>{console.log('yep '+ userId+' '+pseudo);})
    .catch(async(error)=>{
      const toast = await this.toastCtrl.create({
        message:error,
        duration:3000,
        position:'bottom'
      })
      toast.present();
    })
}  
}
