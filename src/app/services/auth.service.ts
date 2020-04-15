import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AuthService {
    
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