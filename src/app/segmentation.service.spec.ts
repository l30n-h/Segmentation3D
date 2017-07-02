import { TestBed, inject } from '@angular/core/testing';

import { SegmentationService } from './segmentation.service';

describe('SegmentationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SegmentationService]
    });
  });

  it('should be created', inject([SegmentationService], (service: SegmentationService) => {
    expect(service).toBeTruthy();
  }));
});
