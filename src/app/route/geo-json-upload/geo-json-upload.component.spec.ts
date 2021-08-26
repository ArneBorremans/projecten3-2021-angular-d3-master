import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeoJsonUploadComponent } from './geo-json-upload.component';

describe('GeoJsonUploadComponent', () => {
  let component: GeoJsonUploadComponent;
  let fixture: ComponentFixture<GeoJsonUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeoJsonUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeoJsonUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
