import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Counter } from '../models/counter';
import { Subject } from 'rxjs';
import { CounterList } from '../models/counterList';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  
  counters$ = new  Subject<Counter[]>();
  counterList: Counter[]=[];
  constructor() { }

  saveData(counter: Counter[]) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('counters').set(counter).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  pushData(counter: Counter) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('counters').push(counter).then(
        (data) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  retrieveData() {
    return new Promise((resolve, reject) => {
      firebase.database().ref('counters').once('value').then(
        (data: DataSnapshot) => {
          this.counterList=[];
          data.forEach((childSnapshot)=>{
            const counterChild = new Counter(childSnapshot.key, childSnapshot.val().counterName, childSnapshot.val().counterNb);
            this.counterList.push(counterChild);
          });
          this.emitCounter();
          resolve(data);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  emitCounter(){
    this.counters$.next(this.counterList.slice());
  }

  getAllCounter(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('counters').once('value').then(
        (data: DataSnapshot) => {
          this.counterList=[];
          data.forEach((childSnapshot)=>{
            const counterChild = new Counter(childSnapshot.key, childSnapshot.val().counterName, childSnapshot.val().counterNb);
            this.counterList.push(counterChild);
          });
          resolve(data);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  update(counter: Counter){
    return new Promise((resolve, reject)=>{
      let data ={
          counterName:counter.counterName,
          counterNb:counter.counterNb,
          id: counter.id
      };
      firebase.database().ref('counters').child(counter.id).update(data).then((data)=>{
        resolve(data);
      },(error)=>{
        reject(error);
      });
    });
  }
}
