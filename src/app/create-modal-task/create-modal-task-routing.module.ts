import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateModalTaskPage } from './create-modal-task.page';

const routes: Routes = [
  {
    path: '',
    component: CreateModalTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateModalTaskPageRoutingModule {}
