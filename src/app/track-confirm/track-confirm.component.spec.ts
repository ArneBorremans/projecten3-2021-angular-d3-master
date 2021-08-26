import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackConfirmComponent } from './track-confirm.component';

describe('TrackConfirmComponent', () => {
  let component: TrackConfirmComponent;
  let fixture: ComponentFixture<TrackConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
