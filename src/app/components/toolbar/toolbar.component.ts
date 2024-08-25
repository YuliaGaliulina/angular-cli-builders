import { Component } from '@angular/core';
import { LogoComponent } from "../logo/logo.component";
import { VersionsMenuComponent } from "../versions-menu/versions-menu.component";
import { MatButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-toolbar',
    standalone: true,
    imports: [
        LogoComponent,
        VersionsMenuComponent,
        MatButton,
        RouterLink
    ],
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

}
