import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    HostListener,
    inject,
    OnInit,
    viewChild
} from '@angular/core';
import {
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { BuilderComponent } from './builder/builder.component';
import { LogoComponent } from '../logo/logo.component';
import { MatIconButton } from '@angular/material/button';
import { VersionsMenuComponent } from './versions-menu/versions-menu.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { Builder } from '../../models/Builder';

@Component({
    selector: 'app-documentation',
    imports: [
        BuilderComponent,
        LogoComponent,
        VersionsMenuComponent,
        RouterLink,
        MatListItem,
        MatNavList,
        MatSidenav,
        MatSidenavContainer,
        MatSidenavContent,
        RouterLinkActive,
        MatIconButton,
        MatIcon
    ],
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DocumentationComponent implements OnInit {
    private route = inject(ActivatedRoute);
    
    readonly sidenav = viewChild.required<MatSidenav>('sidenav');
    
    isSmallScreen = false;
    builders: Builder[] = [];
    versionParam = '';
    
    ngOnInit() {
        this.isSmallScreen = window.innerWidth < 768;
        this.versionParam = this.route.snapshot.paramMap.get('version')!;
        
        this.route.params.subscribe(params => {
            this.versionParam = params.version;
        });
        
        this.route.data
            .pipe(
                map(data => data.builderData?.builders),
                filter(builders => !!builders)
            )
            .subscribe((builders) => {
                this.builders = builders;
            })
    }
    
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isSmallScreen = window.innerWidth < 768;
    }
    
    toggleSidenav() {
        this.sidenav().toggle();
    }
    
    closeSidenavIfMobile() {
        if (this.isSmallScreen) {
            this.sidenav().close();
        }
    }
}
