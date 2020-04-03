import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { MenuController } from '@ionic/angular';
import { ThemeService } from './services/theme.service';

import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyCThqdMQUM-HH3ThXw_8hf4msBZd4waPUY",
  authDomain: "todo-list-a8028.firebaseapp.com",
  databaseURL: "https://todo-list-a8028.firebaseio.com",
  projectId: "todo-list-a8028",
  storageBucket: "todo-list-a8028.appspot.com",
  messagingSenderId: "617923089001",
  appId: "1:617923089001:web:b6a38d43eefca8dbb5c8f8"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  navs: Array<any>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private themeService: ThemeService
  ) {
    this.sideMenu();
    this.initializeApp();
    firebase.initializeApp(firebaseConfig);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu(){
    this.navs=[
      {
        name:'Home',
        path:'home'
      },
      {
        name:'Authentification',
        path:'authentification'
      },
      {
        name:'Counter',
        path:'counter'
      },
      {
        name:'Task',
        path:'task'
      }

    ]
  }

}
