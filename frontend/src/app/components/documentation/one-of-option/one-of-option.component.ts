import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BuilderHelperService } from "../../../services/builder-helper.service";

@Component({
    selector: 'app-one-of-option',
    templateUrl: './one-of-option.component.html',
    styleUrl: './one-of-option.component.scss'
})
export class OneOfOptionComponent implements OnChanges {
    @Input() schema = null;
    @Input() id: number = 0;
    
    propertyType!: string;
    
    constructor(
        private builderHelperService: BuilderHelperService,
    ) {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.schema.currentValue !== changes.schema.previousValue) {
            this.propertyType = this.builderHelperService.getTypeText(this.schema)
        }
    }
}
