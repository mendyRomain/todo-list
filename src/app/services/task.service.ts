import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Task } from '../models/task';
import { Subject, Observable } from 'rxjs';
import { TaskList } from '../models/taskList';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  tasks$ = new  Subject<Task[]>();
  taskList: Task[]=[];
  constructor(public afDB: AngularFireDatabase) { }

  saveData(task: Task[]) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('tasks').set(task).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  pushData(task: Task) {
    return new Promise((resolve, reject) => {
      firebase.database().ref('tasks').push(task).then(
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
      firebase.database().ref('tasks').once('value').then(
        (data: DataSnapshot) => {
          this.taskList=[];
          data.forEach((childSnapshot)=>{
            const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle,  childSnapshot.val().taskName, childSnapshot.val().dateDebut, childSnapshot.val().dateFin);
            this.taskList.push(taskChild);
          });
          this.emitTask();
          resolve(data);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  getAllAdd(): Observable<any>{
    return this.afDB.list('/tasks').snapshotChanges(['child_added']);
  }

  getAllChange(): Observable<any>{
    return this.afDB.list('/tasks').snapshotChanges(['child_changed']);
  }

  getAllRemove(): Observable<any>{
    return this.afDB.list('/tasks').snapshotChanges(['child_removed']);
  }

  emitTask(){
    this.tasks$.next(this.taskList.slice());
  }



  getAllTask(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('tasks').once('value').then(
        (data: DataSnapshot) => {
          this.taskList=[];
          data.forEach((childSnapshot)=>{
            const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle, childSnapshot.val().taskName, childSnapshot.val().dateDebut, childSnapshot.val().dateFin);
            this.taskList.push(taskChild);
          });
          resolve(data);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  update(task: Task){
    return new Promise((resolve, reject)=>{
      let data ={
          taskTitle:task.taskTitle,
          taskName:task.taskName,
          dateDebut:task.dateDebut,
          dateFin: task.dateFin,
          id: task.id
      };
      console.log("dans le service");
      console.log(task);
      console.log(data);
      console.log(task.id);
      firebase.database().ref('tasks').child(task.id.trim()).update(data).then((dataU)=>{
        console.log(dataU);
        resolve(dataU);
      },(error)=>{
        reject(error);
      });
    });
  }

  delete(id :string){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('tasks').child(id).remove().then((data)=>{
        resolve(data);
      }, (error)=>{
        reject(error);
      });
    });
  }
}
