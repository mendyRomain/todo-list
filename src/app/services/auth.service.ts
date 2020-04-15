import { Injectable } from '@angular/core';

export class AuthService {

    @Injectable({
        providedIn: 'root'
      })
    
    isAuth:boolean = false;
  
    signedIn() {
        this.isAuth = true;
    }
  
    signedOut() {
        this.isAuth = false;
    }

    getAuth(){
        return this.isAuth;
    }

  }