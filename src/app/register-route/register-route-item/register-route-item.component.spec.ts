import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRouteItemComponent } from './register-route-item.component';

describe('RegisterRouteItemComponent', () => {
  let component: RegisterRouteItemComponent;
  let fixture: ComponentFixture<RegisterRouteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRouteItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRouteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
