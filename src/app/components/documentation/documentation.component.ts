import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { ActivatedRoute, RouterOutlet } from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { Subscription } from "rxjs";
import { NgVersion } from "../../state/versions/ng-version";
import { BuilderComponent } from "./builder/builder.component";

@Component({
    selector: 'app-documentation',
    standalone: true,
    imports: [
        ToolbarComponent,
        SidenavComponent,
        RouterOutlet,
        BuilderComponent
    ],
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit, OnDestroy {
    private readonly versionsStore = inject(VersionsStore);
    private readonly builderListStore = inject(BuilderListStore);
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
}
