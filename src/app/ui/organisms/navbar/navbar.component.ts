import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { JwtService } from '@kakkoii/services/jwt.service';

@Component({
  selector: 'kk-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
  ],
  standalone: true,
})
export class NavbarComponent {
  constructor(
    private readonly jwtService: JwtService,
    private readonly router: Router,
  ) {
  }

  public logOut(): void {
    this.jwtService.removeToken();
    this.router.navigate([ '/auth' ]);
  }
}