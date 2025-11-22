import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { ProjectComponent } from './project/project.component';
//import { ProjectNew } from './project-new/project-new';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    //ProjectNew
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [ProjectComponent]
})
export class AppModule { }
