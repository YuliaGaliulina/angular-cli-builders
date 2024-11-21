import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Builder } from '../models/Builder';
import { JSONSchema7 } from 'json-schema';
import { Router } from '@angular/router';
import versions from '../../../public/ng-versions.json';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    private http = inject(HttpClient);
    private router = inject(Router);
    
    getBuilders(majorVersion: string): Observable<Builder[]> {
        const version = versions.find(version => version.majorVersion === majorVersion);
        
        return this.http.get<Builder[]>(`./builders/v${version?.majorVersion}/builders.json`)
            .pipe(
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
    
    getBuilderSchema(majorVersion: string, builder: Builder): Observable<any> {
        const version = versions.find(version => version.majorVersion === majorVersion);
        const url = `./builders/v${version?.majorVersion}/schema/${builder.title}.json`;
        
        return this.http.get<JSONSchema7>(url)
            .pipe(
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
}

