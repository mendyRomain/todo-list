import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SettingsPage } from '../settings/settings.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(){

  }

  async openSetting(){
    let modal =await this.modalCtrl.create({
      component: SettingsPage
    });

    return await modal.present();
  }

  


}
