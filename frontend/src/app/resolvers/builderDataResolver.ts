import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BuilderHttpService } from '../services/builder-http.service';
import { finalize, map, Observable, of, switchMap } from 'rxjs';
import { VERSIONS_MAPPED } from '../angular-versions';
import { Builder } from '../models/Builder';
import { LoadingService } from '../services/loading.service';

export const builderDataResolver: ResolveFn<Observable<any>> = (route) => {
    const builderHttpService = inject(BuilderHttpService);
    const loadingService = inject(LoadingService);
    const router = inject(Router);
    
    loadingService.loading$.next(true);
    
    const versionParam = route.paramMap.get('version')!;
    const builderParam = route.paramMap.get('builder');
    const version = VERSIONS_MAPPED.find(version => version.majorVersion === versionParam);
    
    if (!version) {
        loadingService.loading$.next(true);
        router.navigate(['not-found']);
        return of(null);
    }
    
    return builderHttpService.getBuilders(version.majorVersion)
        .pipe(
            switchMap((builders: Builder[]) => {
                const builder = builders?.find(builder => builder.title === builderParam);
                const schema$ = builder ? builderHttpService.getBuilderSchema(versionParam, builder) : of(null);
                
                return schema$
                    .pipe(
                        map(schema => ({ schema, builders })),
                        finalize(() => {
                            loadingService.loading$.next(false);
                        })
                    );
            }),
        );
};
