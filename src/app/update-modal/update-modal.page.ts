import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Task } from '../models/task';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {

  task:Task;
  taskForm: FormGroup;

  constructor(private modalCtrl: ModalController, 
    navParams: NavParams, 
    private formBuilder: FormBuilder, 
    private taskService: TaskService,
    private toastCtrl: ToastController) { 
   this.task = navParams.get('task');
  }

  ngOnInit() {
    this.initForm();
    console.log(this.task);
  }

  initForm(){
    this.taskForm = this.formBuilder.group({
      title:this.task.taskTitle,
      description: this.task.taskName,
      dateDebut:this.task.dateDebut,
      dateFin:this.task.dateFin
    })
  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss: true});
  }

  onSubmitForm(){
    let task = new Task(this.task.id, this.taskForm.get('title').value,this.taskForm.get('description').value, this.taskForm.get('dateDebut').value, this.taskForm.get('dateFin').value);
    this.taskService.updateTask(task, task.id).catch(
      async (error)=>{
        let toast = await this.toastCtrl.create({
          message: error,
          duration:3000,
          position:'bottom'
        });
        toast.present();
      }
    );
    this.dismiss();
  }

}
