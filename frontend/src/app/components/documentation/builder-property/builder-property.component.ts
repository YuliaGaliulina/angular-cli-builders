import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    JsonPipe,
    KeyValuePipe,
    NgClass,
    NgForOf,
    NgIf,
    NgSwitch,
    NgSwitchCase,
} from "@angular/common";
import { OneOfOptionComponent } from "../one-of-option/one-of-option.component";
import { BuilderHelperService } from "../../../services/builder-helper.service";
import { SchemaPropertiesPipe } from "../../../pipes/schema.pipe";
import { CamelCaseWrapPipe } from "../../../pipes/camel-case-wrap.pipe";
import { FormatTextPipe } from "../../../pipes/format-text.pipe";

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
        KeyValuePipe,
        SchemaPropertiesPipe,
        JsonPipe,
        CamelCaseWrapPipe,
        FormatTextPipe,
    ],
    templateUrl: './builder-property.component.html',
    styleUrl: './builder-property.component.scss'
})
export class BuilderPropertyComponent implements OnChanges {
    @Input() propertyKey = '';
    @Input() schema: any = null;
    @Input() isOption = false;
    @Input() requiredArray: string[] | undefined = [];
    
    collapsed = true;
    highlight = false;
    propertyType = '';
    isRequired = false;
    
    isArray = Array.isArray;
    
    private timeoutId: any;
    
    constructor(
        private builderHelperService: BuilderHelperService,
    ) {
    }
    
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.schema.currentValue !== changes.schema.previousValue) {
            this.propertyType = this.builderHelperService.getTypeText(this.schema);
        }
        
        if (changes.requiredArray.currentValue !== changes.requiredArray.previousValue &&
            changes.propertyKey.currentValue !== changes.propertyKey.previousValue)
        {
            this.isRequired = this.requiredArray?.indexOf(this.propertyKey) !== -1;
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
