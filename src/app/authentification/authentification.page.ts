import { Component, OnInit } from '@angular/core';
// import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.page.html',
  styleUrls: ['./authentification.page.scss'],
})
export class AuthentificationPage implements OnInit {
  
  username: string = ""
  password: string = ""

  constructor(public auth: AngularFireAuth, 
      private toastCtrl: ToastController,
      public afStore: AngularFirestore,
      public user: UserService) { }

  ngOnInit() {
  }

  /*--Vraie programmation--*/
  fInscription(){
    const{username, password} = this;

    this.auth.auth.createUserWithEmailAndPassword(this.username, this.password)
      .then      ((result)=>{console.log('yep '+ username+' '+password);})
      .catch(async(error)=>{
        const toast = await this.toastCtrl.create({
          message:error,
          duration:3000,
          position:'bottom'
        })
        toast.present();
      })
  }
/*--Vraie programmation, code de qualité--*/
  async fLogin(){
    const{username, password} = this;
    try{
      const res = await this.auth.auth.signInWithEmailAndPassword(username, password)
      //inside our user collection we create a new document and we set its value
      this.afStore.doc(`users/${res.user.uid}`).set({
        username
      })
      //.then((result)=>{console.log('yep, '+username+' is signed using '+password);})
      if (res.user){
        this.user.setUser({
          username,
          uid: res.user.uid
        })
        console.log('yep,  '+username+' is signed using '+password);
      }
    }
    catch(error){
        const toast = await this.toastCtrl.create({
          message:error,
          duration:3000,
          position:'bottom'
      })
      toast.present(); 
    }
  }
/*--Vraie programmation, code de qualité--*/
fLogOff(){
    const{username, password} = this;
    this.auth.auth.signOut()
      .then((result)=>{console.log('yep, '+ this.username+' is logged off. His password was '+ this.password);})
      .catch(async(error)=>{
        const toast = await this.toastCtrl.create({
          message:error,
          duration:3000,
          position:'bottom'
      })
      toast.present();
    })
  }

  /*--Ne sera plus utilisé, remplacé par de la vraie programmation--*/
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
