import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatAnchor } from '@angular/material/button';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [
    LogoComponent,
    MatAnchor
  ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
}
