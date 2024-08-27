import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    standalone: true,
    name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {
    
    constructor(private sanitizer: DomSanitizer) {}
    
    transform(value: string): SafeHtml {
        if (!value) {
            return value;
        }
        
        value = value.replace(/"([^"]+)"/g, '<span class="property-option">$1</span>');
        value = value.replace(/`([^`]+)`/g, '<span class="property-option">$1</span>');
        value = value.replace(/'([^']+)'/g, '<span class="property-option">$1</span>');
        value = value.replace(/(https?:\/\/[^\s]+)/g, (match) => {
            const url = new URL(match);
            const hashFragment = url.hash ? url.hash.slice(1).replace(/-/g, ' ') : null;
            const formattedText = hashFragment ? hashFragment : url.hostname;
            return `<a class="docs-link" href="${match}" target="_blank">${formattedText}</a>`;
        });

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}