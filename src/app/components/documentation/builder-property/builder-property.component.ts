import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase } from "@angular/common";
import { OneOfOptionComponent } from "../one-of-option/one-of-option.component";
import { BuilderHelperService } from "../../../services/builder-helper.service";

@Component({
    selector: 'app-builder-property',
    standalone: true,
    imports: [
        NgSwitch,
        NgSwitchCase,
        NgForOf,
        NgIf,
        NgClass,
        OneOfOptionComponent,
    ],
    templateUrl: './builder-property.component.html',
    styleUrl: './builder-property.component.scss'
})
export class BuilderPropertyComponent implements OnChanges {
    @Input() propertyKey = '';
    @Input() schema: any = null;
    @Input() isOption = false;
    
    collapsed = true;
    highlight = false;
    propertyType = '';
    
    objectKeys = Object.keys;
    isArray = Array.isArray;
    
    private timeoutId: any;
    
    constructor(
        private builderHelperService: BuilderHelperService,
    ) {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.schema.currentValue !== changes.schema.previousValue) {
            this.propertyType = this.builderHelperService.getTypeText(this.schema)
        }
    }
    
    toggleCollapsible() {
        this.collapsed = !this.collapsed;
        this.highlight = !this.highlight;
        
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = setTimeout(() => {
            this.highlight = false;
            this.timeoutId = null;
        }, 500);
    }
}
