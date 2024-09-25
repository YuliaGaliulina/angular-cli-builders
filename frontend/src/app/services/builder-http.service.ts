import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NgVersion } from '../state/versions/ng-version';
import { Builder } from '../state/builder-list/Builder';
import { SelectedBuilder } from '../state/selected-builder/selected-builder.store';
import { JSONSchema7 } from 'json-schema';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    private baseUrl = environment.apiUrl;
    
    constructor(private http: HttpClient) {
    }
    
    getBuilders(version: NgVersion): Observable<any> {
        return this.http.get<{ builders: any }>(`${this.baseUrl}/api/builders/${version.version}`);
    }
    
    getBuilder(version: string, builder: Builder): Observable<SelectedBuilder> {
        return this.http.get<JSONSchema7>(`${this.baseUrl}/api/builders/${version}/${builder.title}`)
            .pipe(
                map((schema) => ({ title: builder.title, schema: schema as JSONSchema7 }))
            );
    }
}
