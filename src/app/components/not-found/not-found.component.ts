import { Component, inject } from '@angular/core';
import { LogoComponent } from '../logo/logo.component';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";

@Component({
  selector: 'app-not-found',
  standalone: true,
    imports: [
        LogoComponent,
        MatAnchor,
        RouterLink
    ],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {
    readonly versionsStore = inject(VersionsStore);
}
