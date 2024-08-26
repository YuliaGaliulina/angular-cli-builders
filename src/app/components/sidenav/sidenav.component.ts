import { Component, inject } from '@angular/core';
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListItem, MatNavList } from "@angular/material/list";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";
import { NgForOf, NgIf } from "@angular/common";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { VersionsStore } from "../../state/versions/versions.store";

@Component({
    selector: 'app-sidenav',
    standalone: true,
    imports: [MatSidenavModule, MatNavList, RouterLink, NgIf, NgForOf, MatListItem, RouterOutlet, RouterLinkActive],
    templateUrl: './sidenav.component.html',
    styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
    readonly versionsStore = inject(VersionsStore);
    readonly builderListStore = inject(BuilderListStore);
    
    placeholderArray = Array(10).fill(0);
}
