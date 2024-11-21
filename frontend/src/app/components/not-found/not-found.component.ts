import { Component } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { GoToDocsButtonComponent } from "../go-to-docs-button/go-to-docs-button.component";

@Component({
    selector: 'app-not-found',
    imports: [
        LogoComponent,
        GoToDocsButtonComponent
    ],
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
}
