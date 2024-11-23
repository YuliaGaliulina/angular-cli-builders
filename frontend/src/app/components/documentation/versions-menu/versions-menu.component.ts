import { Component, OnInit, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { NgVersion } from '../../../models/ng-version';
import { ActivatedRoute, Router } from '@angular/router';
import versions from '../../../../../public/ng-versions.json';

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
    
    versions: NgVersion[] = versions;
    currentVersion = signal('');
    currentBuilder = signal('');
    
    ngOnInit() {
        this.route.params.subscribe(params => {
            const versionParam = params.version!.split('v')[1];
            const selectedVersion = versions.find(version => version.majorVersion === versionParam)!.version;
            this.currentVersion.set(selectedVersion);
            this.currentBuilder.set(params.builder);
        });
    }
    
    selectVersion(version: string) {
        this.router.navigate(['/docs/', version, this.currentBuilder()]);
    }
}
