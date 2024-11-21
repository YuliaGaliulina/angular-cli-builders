import { Component, input, signal } from '@angular/core';
import { JsonPipe, NgClass } from '@angular/common';
import { OneOfOptionComponent } from '../one-of-option/one-of-option.component';
import { SchemaPropertiesPipe } from '../../../pipes/schema.pipe';
import { CamelCaseWrapPipe } from '../../../pipes/camel-case-wrap.pipe';
import { FormatTextPipe } from '../../../pipes/format-text.pipe';
import { TypeStringPipe } from '../../../pipes/type-string.pipe';

@Component({
    selector: 'app-builder-property',
    imports: [
        NgClass,
        OneOfOptionComponent,
        SchemaPropertiesPipe,
        JsonPipe,
        CamelCaseWrapPipe,
        FormatTextPipe,
        TypeStringPipe
    ],
    templateUrl: './builder-property.component.html',
    styleUrl: './builder-property.component.scss'
})
export class BuilderPropertyComponent {
    readonly propertyKey = input('');
    readonly schema = input<any>(null);
    readonly isOption = input(false);
    readonly isRequired = input(false);
    
    collapsed = signal(true);
    highlight = signal(false);
    
    isArray = Array.isArray;
    
    private timeoutId: any;
    
    toggleCollapsible() {
        this.collapsed.update(value => !value);
        this.highlight.update(value => !value);
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = setTimeout(() => {
            this.highlight.set(false);
            this.timeoutId = null;
        }, 500);
    }
}
