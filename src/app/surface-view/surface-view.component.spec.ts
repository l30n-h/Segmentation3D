import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurfaceViewComponent } from './surface-view.component';

describe('SurfaceViewComponent', () => {
  let component: SurfaceViewComponent;
  let fixture: ComponentFixture<SurfaceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurfaceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurfaceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
