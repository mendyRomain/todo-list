import { Component, OnInit } from '@angular/core';
import { Counter } from '../models/counter';
import { CounterService } from '../services/counter.service';
import { Subscription } from 'rxjs';
import { CounterList } from '../models/counterList';
import { DataSnapshot } from '@angular/fire/database/interfaces';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.page.html',
  styleUrls: ['./counter.page.scss'],
})
export class CounterPage implements OnInit {

  counterL:Counter[];
  counters: Counter[];
  counterList:Counter[];

  counterSubscription: Subscription;

  constructor(private counterSevice: CounterService) { }

  ngOnInit() {
    this.counterSubscription = this.counterSevice.counters$.subscribe((counters: Counter[])=>{
      this.counterList=counters.slice();
    });
    this.counterSevice.retrieveData().then(()=>{
    }).catch((error)=>{
      console.log(error);
    }); 
  }

  incrementFirstCounter(){
    let isFirstCounter= false ;
    this.counterSevice.getAllCounter().then((data: DataSnapshot)=>{
      data.forEach((childSnapshot)=>{
        const counterChild = new Counter(childSnapshot.key, childSnapshot.val().counterName, childSnapshot.val().counterNb);
        if(counterChild.counterName === "firstCounter"){
          //faire update + 1 en base 
          isFirstCounter= true;
          counterChild.counterNb = counterChild.counterNb+1;
          this.counterSevice.update(counterChild);
          this.counterList= [];
        this.counterSevice.retrieveData().then(()=>{
          console.log("get counters check");
        }).catch((error)=>{
          console.log(error);
        });
        }
      });

      if(!isFirstCounter){
        let firstCounter ={
          id:'',
          counterName:"firstCounter",
          counterNb:1
        }
        this.counterL =[firstCounter];
        // this.counterSevice.saveData(this.counterL);
        this.counterSevice.pushData(firstCounter);
        this.counterList= [];
        this.counterSevice.retrieveData().then(()=>{
          console.log("get counters check");
        }).catch((error)=>{
          console.log(error);
        }); 
      }
    }).catch((error)=>{
      console.log(error);
    });

    
    
  }

}
