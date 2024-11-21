import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { GoToDocsButtonComponent } from "../go-to-docs-button/go-to-docs-button.component";

@Component({
    selector: 'app-home-page',
    imports: [
        LogoComponent,
        GoToDocsButtonComponent
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
}
