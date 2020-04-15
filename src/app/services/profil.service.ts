import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Profil } from '../models/profil';
import { Subject } from 'rxjs';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Injectable({
    providedIn: 'root'
  })

  export class ProfilService{

    profils$ = new  Subject<Profil[]>();
    profilList: Profil[]=[];
    constructor() { }

    retrieveData() {
        return new Promise((resolve, reject) => {
            firebase.database().ref('profils').once('value').then(
              (data: DataSnapshot) => {
                this.profilList=[];
                data.forEach((childSnapshot)=>{
                    const profilChild = new Profil(childSnapshot.key, childSnapshot.val().userId, childSnapshot.val().pseudo);
                    this.profilList.push(profilChild);
                });
                this.emitProfil();
                resolve(data);
                }, (error) => {
                    reject(error);
                }
            );
        });        
    }

    getOneData(uid:any) {
        return new Promise((resolve, reject) => {
            firebase.database().ref('/profils').orderByChild("userId").equalTo(uid).once('value').then(
              (data: DataSnapshot) => {
                this.profilList=[];
                data.forEach((childSnapshot)=>{
                    const profilChild = new Profil(childSnapshot.key, childSnapshot.val().userId, childSnapshot.val().pseudo);
                    this.profilList.push(profilChild);
                });
                this.emitProfil();
                resolve(data);
                }, (error) => {
                    reject(error);
                }
            );
        });        
    }

    emitProfil(){
        this.profils$.next(this.profilList.slice());
    }    

    pushData(profil: Profil) {
        return new Promise((resolve, reject) => {
          firebase.database().ref('profils').push(profil).then(
            (data) => {
                resolve(data);
            },
            (error) => {
                reject(error);
            });
        });
    } 

    saveData(profil: Profil[]) {
        return new Promise((resolve, reject) => {
          firebase.database().ref('profils').set(profil).then(
            (data: DataSnapshot) => {
              resolve(data);
            },
            (error) => {
              reject(error);
            });
        });
    }

    update(profil: Profil){
        return new Promise((resolve, reject)=>{
          let data ={
            profiluserID:profil.userId,
            profilpseudo:profil.pseudo,
            id: profil.id
          };
          firebase.database().ref('profils').child(profil.id).update(data).then((data)=>{
            resolve(data);
          },(error)=>{
            reject(error);
          });
        });
    }    
}