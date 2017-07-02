import { Component } from '@angular/core';
import { SegmentationService } from './segmentation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public service: SegmentationService) { }

}
