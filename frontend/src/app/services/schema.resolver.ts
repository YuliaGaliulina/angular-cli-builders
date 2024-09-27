import { ActivatedRoute, ResolveFn } from '@angular/router';
import { BuilderHttpService } from './builder-http.service';
import { inject } from '@angular/core';
import { filter, map, Observable, of, switchMap } from 'rxjs';
import { Builder } from '../models/Builder';

export const schemaResolver: ResolveFn<Observable<any>> = (route) => {
    const builderHttpService = inject(BuilderHttpService);
    const activatedRoute = inject(ActivatedRoute);
    
    const builderParam = route.paramMap.get('builder');
    const versionParam = route.parent!.paramMap.get('version')!;
    
    return activatedRoute.data
        .pipe(
            filter(() => !!route.parent!.data),
            map(() => route.parent!.data.builders),
            switchMap((builders: Builder[]) => {
                const builder = builders?.find(builder => builder.title === builderParam);
               
                return builder ? builderHttpService.getBuilderSchema(versionParam, builder) : of(null);
            })
        );
};