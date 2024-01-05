import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleDarkModeButtonComponent } from './toggle-dark-mode-button.component';

describe('ToggleDarkModeButtonComponent', () => {
  let component: ToggleDarkModeButtonComponent;
  let fixture: ComponentFixture<ToggleDarkModeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleDarkModeButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ToggleDarkModeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
