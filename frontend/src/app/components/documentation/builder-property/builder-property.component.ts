import { Component, input } from '@angular/core';
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
    
    collapsed = true;
    highlight = false;
    
    isArray = Array.isArray;
    
    private timeoutId: any;
    
    toggleCollapsible() {
        this.collapsed = !this.collapsed;
        this.highlight = !this.highlight;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = setTimeout(() => {
            this.highlight = false;
            this.timeoutId = null;
        }, 500);
    }
}
