import { Component, Input, OnChanges } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";

@Component({
    selector: 'app-one-of-option',
    standalone: true,
    templateUrl: './one-of-option.component.html',
    imports: [
        NgIf,
        NgClass
    ],
    styleUrl: './one-of-option.component.scss'
})
export class OneOfOptionComponent implements OnChanges {
    @Input() schema = null;
    @Input() id: number = 0;
    
    propertyType!: string;
    
    ngOnChanges(): void {
        // TODO: optimize ngOnChanges
        this.propertyType = this.getTypeText(this.schema)
    }
    
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
}
