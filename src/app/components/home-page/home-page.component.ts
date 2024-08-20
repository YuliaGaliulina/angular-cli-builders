import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MatAnchor } from "@angular/material/button";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    LogoComponent,
    MatAnchor
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
