import { Component, Input, OnChanges } from '@angular/core';
import { NgClass, NgIf } from "@angular/common";
import { BuilderHelperService } from "../../../services/builder-helper.service";

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
    
    constructor(
        private builderHelperService: BuilderHelperService,
    ) {
    }
    
    ngOnChanges(): void {
        // TODO: optimize ngOnChanges
        this.propertyType = this.builderHelperService.getTypeText(this.schema)
    }
}
