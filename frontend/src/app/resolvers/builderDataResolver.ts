import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { BuilderHttpService } from '../services/builder-http.service';
import { map, Observable, of, switchMap } from 'rxjs';
import { Builder } from '../models/Builder';
import versions from '../../../public/ng-versions.json';

export const builderDataResolver: ResolveFn<Observable<any>> = (route) => {
    const builderHttpService = inject(BuilderHttpService);
    const router = inject(Router);
    const versionParam = route.paramMap.get('version')!.split('v')[1];
    const builderParam = route.paramMap.get('builder');
    const version = versions.find(version => version.majorVersion === versionParam);
    
    if (!version) {
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
                    );
            }),
        );
};
