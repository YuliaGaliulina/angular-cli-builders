import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { distinctUntilChanged, filter, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { BuilderListStore } from "../../state/builder-list/builder-list.store";
import { VersionsStore } from "../../state/versions/versions.store";
import { SelectedBuilderStore } from "../../state/selected-builder/selected-builder.store";
import { NgVersion } from "../../state/versions/ng-version";
import { toObservable } from "@angular/core/rxjs-interop";
import { Builder } from "../../state/builder-list/Builder";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgIf } from "@angular/common";

@Component({
    selector: 'app-markdown',
    standalone: true,
    imports: [
        MatProgressSpinner,
        NgIf
    ],
    templateUrl: './markdown.component.html',
    styleUrl: './markdown.component.scss',
})
export class MarkdownComponent implements OnInit, OnDestroy {
    readonly versionsStore = inject(VersionsStore);
    readonly selectedBuilderStore = inject(SelectedBuilderStore);
    readonly builderListStore = inject(BuilderListStore);
    
    builders$: Observable<Builder[]> = toObservable(this.builderListStore.builders);
    
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private router: Router
    ) {
    }
    
    ngOnInit() {
        console.log('MarkdownComponent ngOnInit');
        
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
                        // TODO: handle case 404
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