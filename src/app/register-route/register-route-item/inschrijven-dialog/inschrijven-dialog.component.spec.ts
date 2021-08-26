import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InschrijvenDialogComponent } from './inschrijven-dialog.component';

describe('InschrijvenDialogComponent', () => {
  let component: InschrijvenDialogComponent;
  let fixture: ComponentFixture<InschrijvenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InschrijvenDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InschrijvenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
