import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { BackendStatusService } from './backend-status.service';
import { BACKEND_BASE_URL } from './backend.config';

const TEST_BASE_URL = 'http://backend.test';
const HEALTH_URL = `${TEST_BASE_URL}${BackendStatusService.HEALTH_PATH}`;

describe('BackendStatusService', () => {
  let service: BackendStatusService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BACKEND_BASE_URL, useValue: TEST_BASE_URL },
      ],
    });

    service = TestBed.inject(BackendStatusService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Fails the test if any unexpected (or real) HTTP request was made.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the configured health endpoint', () => {
    service.checkStatus().subscribe();
    const req = httpMock.expectOne(HEALTH_URL);
    expect(req.request.method).toBe('GET');
    req.flush('ok');
  });

  it('should report online on a successful response', () => {
    let result: { online: boolean } | undefined;
    service.checkStatus().subscribe((status) => (result = status));

    httpMock.expectOne(HEALTH_URL).flush('ok');

    expect(result).toEqual({ online: true });
  });

  it('should report offline on an error response', () => {
    let result: { online: boolean } | undefined;
    service.checkStatus().subscribe((status) => (result = status));

    httpMock
      .expectOne(HEALTH_URL)
      .flush('failure', { status: 503, statusText: 'Service Unavailable' });

    expect(result).toEqual({ online: false });
  });
});
