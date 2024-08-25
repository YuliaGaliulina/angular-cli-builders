import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { distinctUntilChanged, filter, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { BuilderListStore } from "../../../state/builder-list/builder-list.store";
import { VersionsStore } from "../../../state/versions/versions.store";
import { SelectedBuilderStore } from "../../../state/selected-builder/selected-builder.store";
import { NgVersion } from "../../../state/versions/ng-version";
import { toObservable } from "@angular/core/rxjs-interop";
import { Builder } from "../../../state/builder-list/Builder";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";
import { BuilderPropertyComponent } from "../builder-property/builder-property.component";

@Component({
    selector: 'app-builder',
    standalone: true,
    imports: [
        MatProgressSpinner,
        NgIf,
        NgTemplateOutlet,
        NgForOf,
        BuilderPropertyComponent
    ],
    templateUrl: './builder.component.html',
    styleUrl: './builder.component.scss',
})
export class BuilderComponent implements OnInit, OnDestroy {
    readonly selectedBuilderStore = inject(SelectedBuilderStore);
    objectKeys = Object.keys;
    
    private readonly versionsStore = inject(VersionsStore);
    private readonly builderListStore = inject(BuilderListStore);

    private builders$: Observable<Builder[]> = toObservable(this.builderListStore.builders);
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }
    
    ngOnInit() {
        this.subscription$.add(this.route.params.pipe(
            map((params) => params['name']),
            distinctUntilChanged(),
            switchMap((name) => this.builders$.pipe(
                filter(builders => builders.length > 0),
                map((builders) => {
                    const builder = builders.find(builder => builder.title === name);
                    return builder ? builder.schemaUrl : null;
                })
            ))
        )
            .pipe(
                tap((path) => {
                    if (path === null) {
                        // TODO: output user friendly message
                        this.router.navigate(['not-found']);
                    }
                }),
                filter((path) => path !== null)
            )
            .subscribe((path) => {
                this.selectedBuilderStore.fetchBuilder({
                    version: this.versionsStore.currentVersion() as NgVersion,
                    path
                });
            })
            )
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}