import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BuilderHelperService {
    
    constructor() {
    }
    
    public getTypeText(schema: any): string {
        if (schema?.items?.type) {
            return `<${schema.items?.type}[]>`;
        } else if (schema.type === 'object') {
            const keyType = schema.propertyNames?.pattern ? 'string' : '';
            const valueType = schema.additionalProperties?.type;
            return (keyType && valueType) ? `<{[key: ${keyType}]: ${valueType}}>` : `<${schema.type}>`;
        } else if (schema.type) {
            return Object.hasOwn(schema, 'const')? `<${schema.type}: ${schema.const}>` : `<${schema.type}>`;
        }
        return '';
    }
}
