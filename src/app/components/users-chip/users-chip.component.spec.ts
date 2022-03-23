import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChipComponent } from './users-chip.component';

describe('UsersChipComponent', () => {
  let component: UsersChipComponent;
  let fixture: ComponentFixture<UsersChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
