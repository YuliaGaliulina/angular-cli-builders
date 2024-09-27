import { Injectable, makeStateKey, TransferState } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { Builder } from '../models/Builder';
import { JSONSchema7 } from 'json-schema';
import { environment } from '../../environments/environment';
import { VERSIONS_MAPPED } from '../angular-versions';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    private baseUrl = environment.apiUrl;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private transferState: TransferState
    ) {
    }
    
    getBuilders(majorVersion: string): Observable<Builder[]> {
        const BUILDERS = makeStateKey<any>(`builders-${majorVersion}`);
        
        if (this.transferState.hasKey(BUILDERS)) {
            const data = this.transferState.get(BUILDERS, null);
            
            return of(data);
        }
        
        const version = VERSIONS_MAPPED.find(version => version.majorVersion === majorVersion);
        return this.http.get<Builder[]>(`${this.baseUrl}/api/builders/${version?.version}`)
            .pipe(
                tap((builders: Builder[]) => {
                    this.transferState.set(BUILDERS, builders);
                }),
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
    
    getBuilderSchema(majorVersion: string, builder: Builder): Observable<any> {
        const SCHEMA = makeStateKey<any>(`builders-${majorVersion}-${builder.title}`);
        
        if (this.transferState.hasKey(SCHEMA)) {
            const data = this.transferState.get(SCHEMA, null);
            
            return of(data);
        }
        
        const version = VERSIONS_MAPPED.find(version => version.majorVersion === majorVersion);
        const url = `${this.baseUrl}/api/builders/${version?.version}/${builder.title}?schemaUrl=${encodeURIComponent(
            builder.schemaUrl)}`;
        return this.http.get<JSONSchema7>(url)
            .pipe(
                tap((schema: any) => {
                    this.transferState.set(SCHEMA, schema);
                }),
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
}

