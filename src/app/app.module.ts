import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { IonicStorageModule } from '@ionic/storage';

import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SettingsPage } from './settings/settings.page';
import { FormsModule } from '@angular/forms';
import { UpdateModalPage } from './update-modal/update-modal.page';
import { CreateModalTaskPage } from './create-modal-task/create-modal-task.page';

var firebaseConfig = {
  apiKey: "AIzaSyCThqdMQUM-HH3ThXw_8hf4msBZd4waPUY",
  authDomain: "todo-list-a8028.firebaseapp.com",
  databaseURL: "https://todo-list-a8028.firebaseio.com",
  projectId: "todo-list-a8028",
  storageBucket: "todo-list-a8028.appspot.com",
  messagingSenderId: "617923089001",
  appId: "1:617923089001:web:b6a38d43eefca8dbb5c8f8"
};

@NgModule({
  declarations: [AppComponent, SettingsPage, UpdateModalPage, CreateModalTaskPage],
  entryComponents: [SettingsPage, UpdateModalPage, CreateModalTaskPage],
  imports: [BrowserModule, IonicModule.forRoot(), 
    AppRoutingModule, 
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    FormsModule,
    ReactiveFormsModule,
    IonicStorageModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
