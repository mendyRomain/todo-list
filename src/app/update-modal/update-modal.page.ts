import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Task } from '../models/task';

@Component({
  selector: 'app-update-modal',
  templateUrl: './update-modal.page.html',
  styleUrls: ['./update-modal.page.scss'],
})
export class UpdateModalPage implements OnInit {

  task:Task;
  constructor(private modalCtrl: ModalController, navParams: NavParams) { 
   this.task = navParams.get('task');
  }

  ngOnInit() {
    console.log(this.task);
  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss: true});
  }

}
