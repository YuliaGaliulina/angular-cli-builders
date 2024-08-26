import { Pipe, PipeTransform } from '@angular/core';
import { JSONSchema7Definition, JSONSchema4, JSONSchema6Definition } from 'json-schema';

type SchemaProperties =
    { [key: string]: JSONSchema7Definition; } | { [k: string]: JSONSchema6Definition; } | { [k: string]: JSONSchema4; } | undefined

@Pipe({
    standalone: true,
    name: 'schemaProperties'
})
export class SchemaPropertiesPipe implements PipeTransform {
    transform(value: SchemaProperties): { key: string; value: any }[] {
        if (!value) return [];
        return Object.entries(value).map(([key, value]) => ({ key, value }));
    }
}