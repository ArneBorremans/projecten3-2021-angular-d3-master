import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoperComponent } from './loper.component';

describe('LoperComponent', () => {
  let component: LoperComponent;
  let fixture: ComponentFixture<LoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
