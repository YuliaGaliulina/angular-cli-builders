import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, map, Observable, switchMap } from 'rxjs';
import { NgVersion } from '../state/versions/ng-version';
import { Builder } from "../state/builder-list/Builder";
import { dereference } from "@apidevtools/json-schema-ref-parser";
import { SelectedBuilder } from "../state/selected-builder/selected-builder.store";
import { JSONSchema7 } from 'json-schema';

const ANGULAR_DEVKIT_BUILD = 'https://unpkg.com/@angular-devkit/build-angular@';
const ANGULAR_BUILD = 'https://unpkg.com/@angular/build@';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    
    constructor(private http: HttpClient) {
    }
    
    getBuilders(version: NgVersion): Observable<Builder[]> {
        return this.http.get<{ builders: any }>(`${ANGULAR_DEVKIT_BUILD}${version.version}/builders.json`)
            .pipe(map((resp) => {
                const cliVersion = +version.majorVersion.split('v')[1];
                const builders = resp.builders;
                
                return Object.keys(builders).map(key => {
                    let schemaPath: string;
                    
                    if (cliVersion > 17 && key === 'application') {
                        schemaPath = `${ANGULAR_BUILD}ngVersion/src/builders/application/schema.json`;
                    } else {
                        const subPath = builders[key].schema.replace(/^\.\//, '');
                        schemaPath = `${ANGULAR_DEVKIT_BUILD}ngVersion/${subPath}`;
                    }
                    
                    return { title: key, schemaUrl: schemaPath }
                })
            }))
    }
    
    getBuilder(version: string, builder: Builder): Observable<SelectedBuilder> {
        const schemaPath = builder.schemaUrl.replace('ngVersion', version);
        return this.http.get<JSONSchema7>(schemaPath)
            .pipe(
                map((schema) => {
                    if (schema.$id) {
                        delete schema.$id;
                    }
                    
                    return schema;
                }),
                switchMap((schema) => from(dereference(schema))),
                map((schema) => ({ title: builder.title, schema: schema as JSONSchema7 }))
            );
    }
}
