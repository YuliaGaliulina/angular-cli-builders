import { Component, Input } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { OneOfOptionComponent } from "../one-of-option/one-of-option.component";

@Component({
    selector: 'app-builder-property',
    standalone: true,
    imports: [
        NgSwitch,
        NgSwitchCase,
        NgForOf,
        NgIf,
        NgClass,
        OneOfOptionComponent,
    ],
    templateUrl: './builder-property.component.html',
    styleUrl: './builder-property.component.scss'
})
export class BuilderPropertyComponent {
    @Input() propertyKey = '';
    @Input() schema!: any;
    @Input() isOption = false;
    timeoutId: any;
    
    collapsed = true;
    highlight = false;
    
    objectKeys = Object.keys;
    isArray = Array.isArray;
    
    getTypeText(schema: any): string {
        if (schema.enum) {
            return `<${schema.type || 'any'} : ${schema.enum.join(' | ')}>`;
        } else if (schema?.items?.type) {
            return `<${schema.items?.type}[]>`;
        } else if (schema.type === 'object') {
            const keyType = schema.propertyNames?.pattern ? 'string' : '';
            const valueType = schema.additionalProperties?.type;
            return (keyType && valueType) ? `<{ [key: ${keyType}]: ${valueType} }>` : `<${schema.type}>`;
        } else if (schema.type) {
            return `<${schema.type}>`;
        }
        return '';
    }
    
    isExpandable(): boolean {
        return this.schema.type === 'object' ||
            (this.schema.type === 'array' && this.schema.items && this.schema.items.type === 'object') ||
            this.schema.oneOf;
    }
    
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
