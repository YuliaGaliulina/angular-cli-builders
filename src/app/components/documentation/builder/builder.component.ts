import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SelectedBuilderStore } from "../../../state/selected-builder/selected-builder.store";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { KeyValuePipe, NgForOf, NgIf, NgTemplateOutlet } from "@angular/common";
import { BuilderPropertyComponent } from "../builder-property/builder-property.component";
import { SchemaPropertiesPipe } from "../../../pipes/schema.pipe";
import { VersionsStore } from "../../../state/versions/versions.store";
import { BuilderListStore } from "../../../state/builder-list/builder-list.store";
import { distinctUntilChanged, filter, map, Observable, Subscription, switchMap, tap } from "rxjs";
import { Builder } from "../../../state/builder-list/Builder";
import { toObservable } from "@angular/core/rxjs-interop";
import { ActivatedRoute, Router } from "@angular/router";
import { NgVersion } from "../../../state/versions/ng-version";

@Component({
    selector: 'app-builder',
    standalone: true,
    imports: [
        MatProgressSpinner,
        NgIf,
        NgTemplateOutlet,
        NgForOf,
        BuilderPropertyComponent,
        KeyValuePipe,
        SchemaPropertiesPipe
    ],
    templateUrl: './builder.component.html',
    styleUrl: './builder.component.scss',
})
export class BuilderComponent implements OnInit, OnDestroy {
    readonly selectedBuilderStore = inject(SelectedBuilderStore);
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
        this.subscription$.add(
            this.route.params.pipe(
                map((params) => params.builder),
                distinctUntilChanged(),
                switchMap((name) => this.builders$.pipe(
                    filter(builders => builders.length > 0),
                    map((builders) => {
                        const builder = builders.find(builder => builder.title === name);
                        return builder || null;
                    })
                ))
            )
                .pipe(
                    tap((builder) => {
                        if (builder === null) {
                            // TODO: output user friendly message
                            this.router.navigate(['not-found']);
                        }
                    }),
                    filter((path) => path !== null)
                )
                .subscribe((builder) => {
                    this.selectedBuilderStore.fetchBuilder({
                        version: this.versionsStore.currentVersion() as NgVersion,
                        builder
                    });
                })
        )
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}