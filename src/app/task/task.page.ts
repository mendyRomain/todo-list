import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';
import { Subscription } from 'rxjs';
import { TaskList } from '../models/taskList';
import { DataSnapshot } from '@angular/fire/database/interfaces';
import { stringify } from 'querystring';
import { ToastController, ModalController } from '@ionic/angular';
import { UpdateModalPage } from '../update-modal/update-modal.page';
import { CreateModalTaskPage } from '../create-modal-task/create-modal-task.page';

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

  constructor(private taskService: TaskService, private toastCtrl: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.taskSubcription = this.taskService.tasks$.subscribe((tasks: Task[])=>{
      this.taskList=tasks.slice();
    });
    this.taskService.retrieveData().then(()=>{
    }).catch(
      async (error)=>{
        console.log(error);
        let toast=await this.toastCtrl.create({
          message: error,
          duration:3000,
          position:'bottom'
        });
        toast.present();
    }); 
    
  }

  // insertTask(){
  //   let isfirstTask= false ;
  //   this.taskService.getAllTask().then((data: DataSnapshot)=>{
  //     data.forEach((childSnapshot)=>{
  //       const taskChild = new Task(childSnapshot.key,childSnapshot.val().taskTitle, childSnapshot.val().taskName,  childSnapshot.val().dateDebut, childSnapshot.val().dateFin);
  //       if(taskChild.taskName === "firstTask"){
  //         //faire update + 1 en base 
  //         isfirstTask= true;
  //         taskChild.taskNb = taskChild.taskNb+1;
  //         taskChild.taskName = this.tacheNom; 
  //         this.taskService.update(taskChild);
  //         this.taskList= [];
  //       this.taskService.retrieveData().then(()=>{
  //         console.log("get tasks check");
  //       }).catch(
  //         async (error)=>{
  //         console.log(error);
  //         let toast=await this.toastCtrl.create({
  //           message: error,
  //           duration:3000,
  //           position:'bottom'
  //         });
  //         toast.present();
  //       });
  //       }
  //     });

  //     if(!isfirstTask){
  //       let firstTask ={
  //         id:'',
  //         taskTitle: this.taskTitle,
  //         taskName: this.tacheNom,
  //         dateDebut:t
  //       }
        
  //       // this.taskService.saveData(this.taskL);
  //       this.taskService.pushData(firstTask);
  //       this.taskList= [];
  //       this.taskService.retrieveData().then(()=>{
  //         console.log("get tasks check");
  //       }).catch(async (error)=>{
  //         console.log(error);
  //         let toast=await this.toastCtrl.create({
  //           message: error,
  //           duration:3000,
  //           position:'bottom'
  //         });
  //         toast.present();
  //       }); 
  //     }
  //   }).catch(async (error)=>{
  //     console.log(error);
  //     let toast=await this.toastCtrl.create({
  //       message: error,
  //       duration:3000,
  //       position:'bottom'
  //     });
  //     toast.present();
  //   });
  // }

  onDelete(id :string){
    this.taskService.delete(id).then((data)=>{
      console.log("delete Ok");
      this.taskList= [];
        this.taskService.retrieveData().then(()=>{
          console.log("get tasks check");
        }).catch(async (error)=>{
          console.log(error);
          let toast=await this.toastCtrl.create({
            message: error,
            duration:3000,
            position:'bottom'
          });
          toast.present();
        }); 
    }).catch(
      async (error)=>{
        console.log(error);
        let toast=await this.toastCtrl.create({
          message: error,
          duration:3000,
          position:'bottom'
        });
        toast.present();
    });
  }

  async onLoadUpdateModal(task: Task){
    let modal = await this.modalCtrl.create({
      component: UpdateModalPage,
      componentProps:{'task': task}
    }); 
    return await modal.present();
  }

  async onloadCreateModalTask(){
    let modal = await this.modalCtrl.create({
      component: CreateModalTaskPage
    });
    return await modal.present();
  }

 
}
