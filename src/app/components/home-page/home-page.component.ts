import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MatIcon } from "@angular/material/icon";
import { GoToDocsButtonComponent } from "../go-to-docs-button/go-to-docs-button.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        LogoComponent,
        MatIcon,
        GoToDocsButtonComponent
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
