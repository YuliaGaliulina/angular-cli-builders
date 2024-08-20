import { Component, inject } from '@angular/core';
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { NgForOf, NgIf } from "@angular/common";
import { MatButton } from "@angular/material/button";
import { VersionsStore } from "../../state/versions/versions.store";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { NgVersion } from "../../state/versions/ng-version";

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
    readonly builderListStore = inject(BuilderListStore);
    
    selectVersion(version: NgVersion) {
        this.versionsStore.setCurrentVersion(version);
        this.builderListStore.fetchBuilders(version);
    }
}
