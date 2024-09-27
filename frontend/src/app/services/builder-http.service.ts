import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
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
        private router: Router
    ) {
    }
    
    getBuilders(majorVersion: string): Observable<Builder[]> {
        const version = VERSIONS_MAPPED.find(version => version.majorVersion === majorVersion);
        return this.http.get<Builder[]>(`${this.baseUrl}/api/builders/${version?.version}`)
            .pipe(
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
    
    getBuilderSchema(majorVersion: string, builder: Builder): Observable<any> {
        const version = VERSIONS_MAPPED.find(version => version.majorVersion === majorVersion);
        const url = `${this.baseUrl}/api/builders/${version?.version}/${builder.title}?schemaUrl=${encodeURIComponent(
            builder.schemaUrl)}`;
        return this.http.get<JSONSchema7>(url)
            .pipe(
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
}
