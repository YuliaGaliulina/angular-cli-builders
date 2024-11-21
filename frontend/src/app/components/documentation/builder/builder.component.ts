import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { BuilderPropertyComponent } from '../builder-property/builder-property.component';
import { SchemaPropertiesPipe } from '../../../pipes/schema.pipe';
import { filter, Subscription } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

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

    @ViewChild('scrollContainer') topElement!: ElementRef;
    schema!: any;
    version = '';
    builder = '';
    
    private subscription$ = new Subscription();
    
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