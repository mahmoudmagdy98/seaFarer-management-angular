import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS }  from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';



// Components
import { LoginComponent } from './features/login/login.component';
import { SeafarerListComponent } from './features/seafarers/seafarer-list/seafarer-list.component';
import { SeafarerModalComponent } from './features/seafarers/seafarer-modal/seafarer-modal.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,



  ],
  imports: [
     BrowserModule,
     AppRoutingModule,

     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,

     SeafarerListComponent,
    SeafarerModalComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
