import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateModalTaskPageRoutingModule } from './create-modal-task-routing.module';

import { CreateModalTaskPage } from './create-modal-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateModalTaskPageRoutingModule
  ],
  declarations: [CreateModalTaskPage]
})
export class CreateModalTaskPageModule {}
