import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private progressRef: NgProgressRef;

  constructor(
    private readonly ngProgress: NgProgress,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.progressRef = this.ngProgress.ref('routingProgress');

    this.subscriptions.add(
      this.router.events.subscribe((event) => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.progressRef.start();
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.progressRef.complete();
            break;
          }
          default: {
            break;
          }
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
