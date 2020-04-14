import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-create-modal-task',
  templateUrl: './create-modal-task.page.html',
  styleUrls: ['./create-modal-task.page.scss'],
})
export class CreateModalTaskPage implements OnInit {

  taskForm: FormGroup;
  today: Date = new Date();
  constructor(private modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
    private taskService: TaskService,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.initForm();
    this.today= new Date();
  }

  initForm(){
    this.taskForm = this.formBuilder.group({
      title:'',
      description:'',
      dateDebut:new Date(),
      dateFin:new Date()
    })
  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss:true});
  }

  onSubmitForm(){
    let task= new Task("", this.taskForm.get('title').value, this.taskForm.get('description').value, this.taskForm.get('dateDebut').value, this.taskForm.get('dateFin').value);
    this.taskService.addTask(task).catch( 
      async (error)=>{
      let toast =await this.toastCtrl.create(
        {
          message:error,
          duration:3000,
          position:'bottom'
        }
      );
      toast.present();
    });
    
    this.dismiss();
  }

}
