import 'hammerjs';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { SurfaceViewComponent } from './surface-view/surface-view.component';
import { SegmentationService } from './segmentation.service';

@NgModule({
  declarations: [
    AppComponent,
    SurfaceViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [SegmentationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
