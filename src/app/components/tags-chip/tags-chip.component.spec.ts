import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsChipComponent } from './tags-chip.component';

describe('TagsChipComponent', () => {
  let component: TagsChipComponent;
  let fixture: ComponentFixture<TagsChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsChipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
