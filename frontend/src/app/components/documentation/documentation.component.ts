import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    HostListener,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';
import {
    ActivatedRoute, Router,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
} from '@angular/router';
import { filter, map, Subscription } from 'rxjs';
import { BuilderComponent } from './builder/builder.component';
import { LogoComponent } from '../logo/logo.component';
import { MatButton, MatIconButton } from '@angular/material/button';
import { VersionsMenuComponent } from './versions-menu/versions-menu.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { NgForOf, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { Builder } from '../../models/Builder';

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
    
    isSmallScreen = window.innerWidth < 768;
    builders: Builder[] = [];
    versionParam = '';
    
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        this.versionParam = this.route.snapshot.paramMap.get('version')!;
        
        this.subscription$.add(
            this.route.data
                .pipe(
                    map(data => data.builderData?.builders),
                    filter(builders => !!builders)
                )
                .subscribe((builders) => {
                    this.builders = builders;
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
