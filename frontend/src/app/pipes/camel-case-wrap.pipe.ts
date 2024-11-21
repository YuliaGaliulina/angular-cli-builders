import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    standalone: true,
    name: 'camelCaseWrap'
})
export class CamelCaseWrapPipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);
    
    transform(value: string): SafeHtml {
        const wrappedValue = value.replace(/([a-z])([A-Z])/g, '$1&#8203;$2');
        return this.sanitizer.bypassSecurityTrustHtml(wrappedValue);
    }
}