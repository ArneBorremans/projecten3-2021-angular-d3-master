import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetalingBevestigdComponent } from './betaling-bevestigd.component';

describe('BetalingBevestigdComponent', () => {
  let component: BetalingBevestigdComponent;
  let fixture: ComponentFixture<BetalingBevestigdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetalingBevestigdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetalingBevestigdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
