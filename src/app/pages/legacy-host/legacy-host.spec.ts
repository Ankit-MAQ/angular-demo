import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegacyHost } from './legacy-host';

describe('LegacyHost', () => {
  let component: LegacyHost;
  let fixture: ComponentFixture<LegacyHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegacyHost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegacyHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
