import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    standalone: true,
    name: 'formatText'
})
export class FormatTextPipe implements PipeTransform {
    private sanitizer = inject(DomSanitizer);
    
    transform(value: string): SafeHtml {
        if (!value) {
            return value;
        }
        
        value = value.replace(/"([^"]+)"/g, '<span class="property-option">$1</span>');
        value = value.replace(/`([^`]+)`/g, '<span class="property-option">$1</span>');
        value = value.replace(/(?<!\w)'([^']+)'(?!\w)/g, '<span class="property-option">$1</span>');
        value = value.replace(/(https?:\/\/\S+)/g, (match) => {
            const url = new URL(match);
            const hashFragment = url.hash ? url.hash.slice(1).replace(/-/g, ' ') : null;
            const formattedText = hashFragment ? hashFragment : url.hostname;
            return `<a class="docs-link" href="${match}" target="_blank">${formattedText}</a>`;
        });

        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}