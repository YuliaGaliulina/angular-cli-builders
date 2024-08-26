import { Component, inject } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { MatAnchor } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        LogoComponent,
        MatAnchor,
        RouterLink,
        MatIcon
    ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
    readonly versionsStore = inject(VersionsStore);
}
