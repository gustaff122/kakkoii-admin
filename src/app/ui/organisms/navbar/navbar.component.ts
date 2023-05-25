import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink } from '@angular/router';
import { JwtService } from '@kakkoii/services/jwt.service';
import { Subscription } from 'rxjs';
import { NgProgress, NgProgressModule, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'kk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    NgProgressModule,
  ],
  standalone: true,
})
export class NavbarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();
  private progressRef: NgProgressRef;


  constructor(
    private readonly jwtService: JwtService,
    private readonly router: Router,
    private readonly ngProgress: NgProgress,
  ) {
  }

  public logOut(): void {
    this.jwtService.removeToken();
    this.router.navigate([ '/auth' ]);
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