import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { KeyValuePipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import { BuilderPropertyComponent } from '../builder-property/builder-property.component';
import { SchemaPropertiesPipe } from '../../../pipes/schema.pipe';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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
    @ViewChild('scrollContainer') topElement!: ElementRef;
    schema!: any;
    version = '';
    builder = '';
    
    private subscription$ = new Subscription();
    
    constructor(
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }
    
    ngOnInit() {
        this.subscription$.add(
            this.route.params.subscribe(paramMap => {
                this.builder = paramMap.builder;
                this.version = paramMap.version;
            })
        );
      
        this.subscription$.add(
            this.route.data.subscribe((data) => {
                this.schema = data.builderData?.schema;
            })
        );
        
        
        this.subscription$.add(
            this.router.events
                .pipe(
                    filter((event) => event instanceof NavigationEnd && !!this.topElement)
                ).subscribe(() => {
                this.topElement.nativeElement.scrollIntoView(true);
            })
        );
    }
    
    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }
}