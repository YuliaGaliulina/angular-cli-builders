import { Component, Input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import versions from '../../../../public/ng-versions.json';

@Component({
    selector: 'app-go-to-docs-button',
    standalone: true,
    imports: [
        MatAnchor,
        RouterLink
    ],
    templateUrl: './go-to-docs-button.component.html',
    styleUrl: './go-to-docs-button.component.scss'
})
export class GoToDocsButtonComponent {
    @Input() title = 'Get started';
    
    latestVersion = versions.reduce((maxVersion, currentVersion) => {
        return currentVersion.majorVersion > maxVersion.majorVersion ? currentVersion : maxVersion;
    });
}
