import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { SegmentationService } from '../segmentation.service';

@Component({
  selector: 'app-surface-view',
  templateUrl: './surface-view.component.html',
  styleUrls: ['./surface-view.component.css']
})
export class SurfaceViewComponent {
  
  @ViewChild('canvas') private canvas: ElementRef;

  constructor(public service:SegmentationService) { }

  ngOnInit() {
    this.service.prepare(this.canvas.nativeElement);
    this.service.init();
    this.service.start();
  }

  ngOnDestroy() {
    this.service.destroy();
  }

}