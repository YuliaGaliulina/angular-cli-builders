import {
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    HostListener,
    inject,
    OnInit, signal,
    viewChild
} from '@angular/core';
import {
    ActivatedRoute,
    RouterLink,
    RouterLinkActive,
} from '@angular/router';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { BuilderComponent } from './builder/builder.component';
import { LogoComponent } from '../logo/logo.component';
import { MatIconButton } from '@angular/material/button';
import { VersionsMenuComponent } from './versions-menu/versions-menu.component';
import { MatListItem, MatNavList } from '@angular/material/list';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { Builder } from '../../models/Builder';
import { BuilderHttpService } from '../../services/builder-http.service';

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
    private builderHttpService = inject(BuilderHttpService);
    
    readonly sidenav = viewChild.required<MatSidenav>('sidenav');
    
    isSmallScreen = signal(window.innerWidth < 768);
    builders = signal<Builder[]>([]);
    versionParam = signal('');
    
    ngOnInit() {
        this.route.params.pipe(
            map((params) => params.version),
            distinctUntilChanged(),
            tap((version) => this.versionParam.set(version)),
            switchMap(version => {
                return this.builderHttpService.getBuilders(version);
            })
        )
            .subscribe(builders => {
                this.builders.set(builders);
            });
    }
    
    @HostListener('window:resize', ['$event'])
    onResize() {
        this.isSmallScreen.set(window.innerWidth < 768);
    }
    
    toggleSidenav() {
        this.sidenav().toggle();
    }
    
    closeSidenavIfMobile() {
        if (this.isSmallScreen()) {
            this.sidenav().close();
        }
    }
}
