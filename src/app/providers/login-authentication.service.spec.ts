import { TestBed } from '@angular/core/testing';

import { LoginAuthenticationService } from './login-authentication.service';

describe('LoginAuthenticationService', () => {
  let service: LoginAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
