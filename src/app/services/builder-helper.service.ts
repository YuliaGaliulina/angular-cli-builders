import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BuilderHelperService {
    
    constructor() {
    }
    
    public getTypeText(schema: any): string {
        if (schema.enum) {
            return `<${schema.type || 'any'}: ${schema.enum.join(' | ')}>`;
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
