import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWarning } from './upload-warning';

describe('UploadWarning', () => {
  let component: UploadWarning;
  let fixture: ComponentFixture<UploadWarning>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadWarning]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadWarning);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
