import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { VersionsStore } from "../../state/versions/versions.store";
import { NgVersion } from "../../state/versions/ng-version";
import { Router } from "@angular/router";
import { SelectedBuilderStore } from "../../state/selected-builder/selected-builder.store";

@Component({
    selector: 'app-versions-menu',
    standalone: true,
    imports: [
        MatIcon,
        MatMenu,
        MatMenuItem,
        NgForOf,
        MatMenuTrigger,
        MatButton,
        NgIf
    ],
    templateUrl: './versions-menu.component.html',
    styleUrl: './versions-menu.component.scss'
})
export class VersionsMenuComponent {
    readonly versionsStore = inject(VersionsStore);
    private selectedBuilderStore = inject(SelectedBuilderStore);
    
    constructor(
        private router: Router
    ) {
    }
    
    selectVersion(version: NgVersion) {
        const builder = this.selectedBuilderStore.builder();
        this.router.navigate(['/docs/', version.majorVersion, builder?.title || []]);
    }
}
