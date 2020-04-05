import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { TaskList } from '../models/taskList';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { stringify } from 'querystring';

@Component({
    selector: 'app-task',
    templateUrl: './task.page.html',
    styleUrls: ['./task.page.scss'],
  })
  export class TaskPage implements OnInit {
  @Input() tacheNom:string;
  @Input() taskTitle;
  taskL:Task[];
  tasks: Task[];
  taskList:Task[];

  taskSubcription: Subscription;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskSubcription = this.taskService.tasks$.subscribe((tasks: Task[])=>{
      this.taskList=tasks.slice();
    });
    this.taskService.retrieveData().then(()=>{
    }).catch((error)=>{
      console.log(error);
    }); 
    
  }

  insertTask(){
    let isfirstTask= false ;
    this.taskService.getAllTask().then((data: DataSnapshot)=>{
      data.forEach((childSnapshot)=>{
        const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle, childSnapshot.val().taskName, childSnapshot.val().taskNb);
        if(taskChild.taskName === "firstTask"){
          //faire update + 1 en base 
          isfirstTask= true;
          taskChild.taskNb = taskChild.taskNb+1;
          taskChild.taskName = this.tacheNom; 
          this.taskService.update(taskChild);
          this.taskList= [];
        this.taskService.retrieveData().then(()=>{
          console.log("get tasks check");
        }).catch((error)=>{
          console.log(error);
        });
        }
      });

      if(!isfirstTask){
        let firstTask ={
          id:'',
          taskTitle: this.taskTitle,
          taskName: this.tacheNom,
          taskNb:data.numChildren()+1
        }
        this.taskL =[firstTask];
        // this.taskService.saveData(this.taskL);
        this.taskService.pushData(firstTask);
        this.taskList= [];
        this.taskService.retrieveData().then(()=>{
          console.log("get tasks check");
        }).catch((error)=>{
          console.log(error);
        }); 
      }
    }).catch((error)=>{
      console.log(error);
    });
  }

 
}
