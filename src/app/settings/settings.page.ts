import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { ThemeService } from '../services/theme.service';
import { toastController } from '@ionic/core';

const themes = {
  autumn: {
    primary: '#F78154',
    secondary: '#4D9078',
    tertiary: '#B4436C',
    light: '#FDE8DF',
    medium: '#FCD0A2',
    dark: '#B89876'
  },
  night: {
    primary: '#8CBA80',
    secondary: '#FCFF6C',
    tertiary: '#FE5F55',
    medium: '#BCC2C7',
    dark: '#F7F7FF',
    light: '#495867'
  },
  neon: {
    primary: '#39BFBD',
    secondary: '#4CE0B3',
    tertiary: '#FF5E79',
    light: '#F4EDF2',
    medium: '#B682A5',
    dark: '#34162A'
  },
  black: {
    primary:'#8CBA80',
    secondary:'green',
    tertiary: 'red',
    light:'gray',
    medium: '#B682A5',
    dark:'silver'
  }
};

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  favoriteTheme: string;


  constructor(public modalCtrl: ModalController, private theme: ThemeService, private toastController: ToastController) { }

  ngOnInit() {
    this.theme.getTheme().then((name)=> {
      if(name!= null){
        this.favoriteTheme = name;
      }else{
        this.favoriteTheme = 'default';
      }
      
    }).catch(
      async (error)=> {
        let toast = await this.toastController.create(
          {
            message:error,
            duration:3000,
            position:'bottom'
          }
        );
        toast.present();
    });
  }

  dismiss(){
    this.modalCtrl.dismiss({dismiss: true});
  }

  changeTheme(name) {
    this.theme.setTheme(themes[name], name);
  }

}
