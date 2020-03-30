import { Component, OnInit } from '@angular/core';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {

  constructor(public auth: AngularFireAuth, private toastCtrl: ToastController) { }

  ngOnInit() {
  }

  testAuth(){
    console.log("debut auth");
    this.auth.auth.createUserWithEmailAndPassword('mendy.romain@gmail.com', '123456').then((result)=>{
      console.log(result);
      console.log("authentification reussite");
    }).catch(
      async (error)=>{
      const toast = await this.toastCtrl.create({
        message:error,
        duration:3000,
        position:'bottom'
      })
      toast.present();
    });
  }

  

}
