import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { DataSnapshot, AngularFireList } from '@angular/fire/database/interfaces';
import { Task } from '../models/task';
import { Subject, Observable, Subscription } from 'rxjs';
import { TaskList } from '../models/taskList';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskCollection: AngularFireList<Task>;

  private tasks: Observable<Task[]>;

  constructor(public afDB: AngularFireDatabase) { 
    this.taskCollection = afDB.list<Task>('/tasks');

    this.tasks = this.taskCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.exportVal();
          const id = a.payload.key;
          data.id=id;
          return {id, ...data }
        })
      })
    )
  }

  getTasks(){
    return this.tasks;
  }

  getTask(id){
    return this.taskCollection.snapshotChanges(['child_added', 'child_removed', 'child_changed', 'child_moved']);
  }

  updateTask(task: Task, id:string){
    return this.taskCollection.update(id, task);
  }
   addTask(task: Task){
     return this.taskCollection.push(task);
   }
  
   removeTask(id){
    return this.taskCollection.remove(id);
   }
}
