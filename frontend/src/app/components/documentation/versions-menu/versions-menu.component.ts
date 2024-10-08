import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { NgForOf, NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { NgVersion } from '../../../models/ng-version';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VERSIONS_MAPPED } from '../../../angular-versions';
import { Builder } from '../../../models/Builder';

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
export class VersionsMenuComponent implements OnInit, OnDestroy {
    versions = VERSIONS_MAPPED;
    currentVersion!: string;
    builders: Builder[] = [];
    
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }
    
    ngOnInit() {
        this.subscription$.add(
            this.route.paramMap.subscribe(paramMap => {
                const versionParam = paramMap.get('version');
                if (versionParam) {
                    this.currentVersion = VERSIONS_MAPPED.find(version => version.majorVersion === versionParam)!.version;
                }
            })
        );
        
        this.subscription$.add(
            this.route.data.subscribe((data) => {
                this.builders = data.builderData?.builders;
            })
        );
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
    
    selectVersion(version: NgVersion) {
        const versionParam = version.majorVersion;
        const builderParam = this.route.snapshot.paramMap.get('builder');
        
        this.router.navigate(['/docs/', versionParam, builderParam]);
    }
}
