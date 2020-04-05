import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { Task } from '../models/task';
import { Subject } from 'rxjs';
import { TaskList } from '../models/taskList';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  
  tasks$ = new  Subject<Task[]>();
  taskList: Task[]=[];
  constructor() { }

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
            const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle,  childSnapshot.val().taskName, childSnapshot.val().taskNb);
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

  emitTask(){
    this.tasks$.next(this.taskList.slice());
  }

  getAllTask(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('tasks').once('value').then(
        (data: DataSnapshot) => {
          this.taskList=[];
          data.forEach((childSnapshot)=>{
            const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle, childSnapshot.val().taskName, childSnapshot.val().taskNb);
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
          taskName:task.taskName,
          taskNb:task.taskNb,
          id: task.id
      };
      firebase.database().ref('tasks').child(task.id).update(data).then((data)=>{
        resolve(data);
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
