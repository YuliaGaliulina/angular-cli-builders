import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, switchMap } from 'rxjs';
import { NgVersion } from '../state/versions/ng-version';
import { Builder } from "../state/builder-list/Builder";
import { dereference, JSONSchema } from "@apidevtools/json-schema-ref-parser";
import { SelectedBuilder } from "../state/selected-builder/selected-builder.store";

const baseUrl = 'https://unpkg.com/@angular-devkit/build-angular@';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    
    constructor(private http: HttpClient) {
    }
    
    getBuilders(version: NgVersion): Observable<Builder[]> {
        return this.http.get<{ builders: any }>(`${baseUrl}${version.version}/builders.json`)
            .pipe(map((resp) => {
                const builders = resp.builders;
                return Object.keys(builders).map(key => ({ title: key, schemaUrl: builders[key].schema }))
            }))
    }
    
    getBuilder(version: string, builder: Builder): Observable<SelectedBuilder> {
        const formattedPath = builder.schemaUrl.replace(/^\.\//, '');
        return this.http.get<JSONSchema>(`${baseUrl}${version}/${formattedPath}`)
            .pipe(
                map((schema) => {
                    if (schema.$id) {
                        delete schema.$id;
                    }
                    
                    return schema;
                }),
                switchMap((schema) => from(dereference(schema))),
                map((schema) => ({title: builder.title, schema}))
            );
    }
}
