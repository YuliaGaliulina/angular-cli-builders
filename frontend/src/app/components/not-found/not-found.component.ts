import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatAnchor } from '@angular/material/button';
import { VersionsStore } from "../../state/versions/versions.store";
import { GoToDocsButtonComponent } from "../go-to-docs-button/go-to-docs-button.component";

@Component({
  selector: 'app-not-found',
  standalone: true,
    imports: [
        LogoComponent,
        MatAnchor,
        GoToDocsButtonComponent
    ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    readonly versionsStore = inject(VersionsStore);
}
