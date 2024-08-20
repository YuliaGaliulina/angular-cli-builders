import { Component, inject, OnInit } from '@angular/core';
import { ToolbarComponent } from "../toolbar/toolbar.component";
import { SidenavComponent } from "../sidenav/sidenav.component";
import { RouterOutlet } from "@angular/router";
import { VersionsStore } from "../../state/versions/versions.store";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { NgVersion } from "../../state/versions/ng-version";

@Component({
    selector: 'app-documentation',
    standalone: true,
    imports: [
        ToolbarComponent,
        SidenavComponent,
        RouterOutlet
    ],
    templateUrl: './documentation.component.html',
    styleUrl: './documentation.component.scss'
})
export class DocumentationComponent implements OnInit {
    readonly versionsStore = inject(VersionsStore);
    readonly builderListStore = inject(BuilderListStore);
    
    ngOnInit() {
        this.builderListStore.fetchBuilders(this.versionsStore.currentVersion() as NgVersion);
    }
}
