import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutesOverviewComponent } from './routes-overview.component';

describe('RoutesOverviewComponent', () => {
  let component: RoutesOverviewComponent;
  let fixture: ComponentFixture<RoutesOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutesOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoutesOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
