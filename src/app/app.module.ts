import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SurfaceViewComponent } from './surface-view/surface-view.component';

@NgModule({
  declarations: [
    AppComponent,
    SurfaceViewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
