import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { Subscription } from "rxjs";
import { NgVersion } from "../../state/versions/ng-version";
import { BuilderComponent } from "./builder/builder.component";
import { LogoComponent } from "../logo/logo.component";
import { MatButton, MatIconButton } from "@angular/material/button";
import { VersionsMenuComponent } from "./versions-menu/versions-menu.component";
import { MatListItem, MatNavList } from "@angular/material/list";
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from "@angular/material/sidenav";
import { NgForOf, NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";

@Component({
    selector: 'app-documentation',
    standalone: true,
    imports: [
        RouterOutlet,
        BuilderComponent,
        LogoComponent,
        MatButton,
        VersionsMenuComponent,
        RouterLink,
        MatListItem,
        MatNavList,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        NgForOf,
        NgIf,
        RouterLinkActive,
        MatIconButton,
        MatIcon
    ],
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') sidenav!: MatSidenav;
    
    placeholderArray = Array(10).fill(0);
    isSmallScreen = window.innerWidth < 768;
    
    readonly versionsStore = inject(VersionsStore);
    readonly builderListStore = inject(BuilderListStore);
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
    ) {
    }
    
    ngOnInit() {
        this.subscription$.add(
            this.route.params
                .subscribe((params) => {
                    this.versionsStore.setCurrentVersion(params.version);
                    this.builderListStore.fetchBuilders(this.versionsStore.currentVersion() as NgVersion);
                })
        );
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isSmallScreen = window.innerWidth < 768;
    }
    
    toggleSidenav() {
        this.sidenav.toggle();
    }
    
    closeSidenavIfMobile() {
        if (this.isSmallScreen) {
            this.sidenav.close();
        }
    }
}
