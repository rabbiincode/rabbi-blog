import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlToTextComponent } from './html-to-text.component';

describe('HtmlToTextComponent', () => {
  let component: HtmlToTextComponent;
  let fixture: ComponentFixture<HtmlToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HtmlToTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HtmlToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
