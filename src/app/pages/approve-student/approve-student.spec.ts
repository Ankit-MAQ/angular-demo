import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStudent } from './approve-student';

describe('ApproveStudent', () => {
  let component: ApproveStudent;
  let fixture: ComponentFixture<ApproveStudent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApproveStudent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveStudent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
