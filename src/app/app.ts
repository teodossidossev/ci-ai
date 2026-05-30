import { Component, OnInit, inject, signal } from '@angular/core';
import { BackendStatusService } from './backend-status.service';

/** Possible UI states for the backend connectivity check. */
type StatusState = 'loading' | 'online' | 'offline';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = 'Forum MSE 2026';
  protected readonly subtitle = 'AI-ready CI/CD teaching frontend';

  /** Current backend status, used to render the status card. */
  protected readonly status = signal<StatusState>('loading');

  private readonly backendStatus = inject(BackendStatusService);

  ngOnInit(): void {
    this.backendStatus
      .checkStatus()
      .subscribe((result) => this.status.set(result.online ? 'online' : 'offline'));
  }
}
