import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { App } from './app';
import { BACKEND_BASE_URL } from './backend.config';
import { BackendStatusService } from './backend-status.service';

const TEST_BASE_URL = 'http://backend.test';
const HEALTH_URL = `${TEST_BASE_URL}${BackendStatusService.HEALTH_PATH}`;

describe('App', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BACKEND_BASE_URL, useValue: TEST_BASE_URL },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(HEALTH_URL).flush('ok');
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the title and subtitle', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(HEALTH_URL).flush('ok');
    await fixture.whenStable();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Forum MSE 2026');
    expect(compiled.querySelector('.page__subtitle')?.textContent).toContain(
      'AI-ready CI/CD teaching frontend',
    );
  });

  it('should show the backend as online when the health check succeeds', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock.expectOne(HEALTH_URL).flush('ok');
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status--online')).not.toBeNull();
  });

  it('should show the backend as offline when the health check fails', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    httpMock
      .expectOne(HEALTH_URL)
      .flush('error', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.status--offline')).not.toBeNull();
  });
});
