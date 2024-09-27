import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BuilderHttpService } from './builder-http.service';
import { Observable, of } from 'rxjs';
import { VERSIONS_MAPPED } from '../angular-versions';

export const buildersResolver: ResolveFn<Observable<any>> = (route) => {
    const builderHttpService = inject(BuilderHttpService);
    const router = inject(Router);
    const versionParam = route.paramMap.get('version')!;
    
    const version = VERSIONS_MAPPED.find(version => version.majorVersion === versionParam);
    
    if (version) {
        return builderHttpService.getBuilders(version.majorVersion);
    } else {
        router.navigate(['not-found']);
        return of(null);
    }
};
