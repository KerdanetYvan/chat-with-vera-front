import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallVeraComponent } from './install-vera.component';

describe('InstallVeraComponent', () => {
  let component: InstallVeraComponent;
  let fixture: ComponentFixture<InstallVeraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstallVeraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstallVeraComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
