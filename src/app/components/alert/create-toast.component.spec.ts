import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateToastComponent } from './create-toast.component';

describe('CreateToastComponent', () => {
  let component: CreateToastComponent;
  let fixture: ComponentFixture<CreateToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
