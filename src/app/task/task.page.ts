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
  taskList:Task[]=[];
  taskTest:Task[];

  

  constructor(private taskService: TaskService, private toastCtrl: ToastController, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe((datas)=>{
      this.taskList= datas;
    })
  }

  onDelete(id :string){
    this.taskService.removeTask(id).catch( async (error)=>{
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
