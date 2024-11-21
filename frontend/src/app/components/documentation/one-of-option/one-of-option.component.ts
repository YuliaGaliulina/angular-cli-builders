import { Component, input } from '@angular/core';
import { TypeStringPipe } from '../../../pipes/type-string.pipe';

@Component({
    selector: 'app-one-of-option',
    templateUrl: './one-of-option.component.html',
    styleUrl: './one-of-option.component.scss',
    imports: [TypeStringPipe]
})
export class OneOfOptionComponent {
    readonly schema = input(null);
    readonly id = input<number>(0);
}
