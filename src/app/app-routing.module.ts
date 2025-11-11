import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
//import { SeafarerFormComponent } from './features/seafarers/seafarer-form/seafarer-form.component';
import { SeafarerListComponent } from './features/seafarers/seafarer-list/seafarer-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'seafarers', component: SeafarerListComponent },
  // { path: 'seafarers/add', component: SeafarerFormComponent },
  // { path: 'seafarers/edit/:id', component: SeafarerFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
