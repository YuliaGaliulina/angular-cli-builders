import { Component, OnInit, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { NgVersion } from '../../../models/ng-version';
import { ActivatedRoute, Router } from '@angular/router';
import versions from '../../../../../public/ng-versions.json';
import { Builder } from '../../../models/Builder';

@Component({
    selector: 'app-versions-menu',
    imports: [
        MatIcon,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatButton
    ],
    templateUrl: './versions-menu.component.html',
    styleUrl: './versions-menu.component.scss'
})
export class VersionsMenuComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    
    versions = versions;
    currentVersion!: string;
    builders: Builder[] = [];
    
    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            const versionParam = paramMap.get('version')!.split('v')[1];
            if (versionParam) {
                this.currentVersion = versions.find(version => version.majorVersion === versionParam)!.version;
            }
        });
        
        this.route.data.subscribe((data) => {
            this.builders = data.builderData?.builders;
        });
    }
    
    selectVersion(version: NgVersion) {
        const versionParam = version.majorVersion;
        const builderParam = this.route.snapshot.paramMap.get('builder');
        
        this.router.navigate(['/docs/', 'v' + versionParam, builderParam]);
    }
}
