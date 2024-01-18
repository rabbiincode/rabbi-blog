import { TestBed } from '@angular/core/testing';

import { ToggleDarkModeService } from './toggle-dark-mode.service';

describe('ToggleDarkModeService', () => {
  let service: ToggleDarkModeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleDarkModeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
