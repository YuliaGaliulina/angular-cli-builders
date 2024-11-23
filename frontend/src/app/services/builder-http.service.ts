import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Builder } from '../models/Builder';
import { JSONSchema7 } from 'json-schema';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class BuilderHttpService {
    private http = inject(HttpClient);
    private router = inject(Router);
    
    getBuilders(version: string): Observable<Builder[]> {
        return this.http.get<Builder[]>(`./builders/${version}/builders.json`)
            .pipe(
                catchError(error => {
                    this.router.navigate(['not-found']);
                    throw error;
                })
            );
    }
    
    getBuilderSchema(version: string, builder: string): Observable<any> {
        const url = `./builders/${version}/schema/${builder}.json`;
        
        return this.http.get<JSONSchema7>(url)
            .pipe(
                catchError(() => of(null))
            );
    }
}

