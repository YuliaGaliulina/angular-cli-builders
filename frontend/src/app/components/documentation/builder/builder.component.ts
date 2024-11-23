import { Component, ElementRef, OnDestroy, OnInit, inject, viewChild, signal } from '@angular/core';
import { BuilderPropertyComponent } from '../builder-property/builder-property.component';
import { SchemaPropertiesPipe } from '../../../pipes/schema.pipe';
import { filter, Subscription, switchMap, tap } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { BuilderHttpService } from '../../../services/builder-http.service';
import { JSONSchema7 } from 'json-schema';

@Component({
    selector: 'app-builder',
    imports: [
        BuilderPropertyComponent,
        SchemaPropertiesPipe
    ],
    templateUrl: './builder.component.html',
    styleUrl: './builder.component.scss'
})
export class BuilderComponent implements OnInit, OnDestroy {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private builderHttpService = inject(BuilderHttpService);
    
    readonly topElement = viewChild.required<ElementRef>('scrollContainer');
    
    schema = signal<JSONSchema7>({});
    version = signal('');
    builder = signal('');
    
    private subscription$ = new Subscription();
    
    ngOnInit() {
        this.route.params.pipe(
            tap((params) => {
                this.builder.set(params.builder);
                this.version.set(params.version);
            }),
            switchMap((params: Params) => {
                return this.builderHttpService.getBuilderSchema(params.version, params.builder)
            })
        )
            .subscribe((schema) => {
                this.schema.set(schema);
            });
        
        this.subscription$.add(
            this.router.events
                .pipe(
                    filter((event) => event instanceof NavigationEnd && !!this.topElement())
                ).subscribe(() => {
                this.topElement().nativeElement.scrollIntoView(true);
            })
        );
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}