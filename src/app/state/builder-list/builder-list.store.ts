import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { NgCliHttpService } from '../../services/ng-cli-http.service';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Builder } from './Builder';
import { NgVersion } from '../versions/ng-version';

type BuilderListState = {
    builderList: Builder[];
    isLoading: boolean;
    error: boolean;
}

const initialState = {
    builderList: [],
    isLoading: false,
    error: false,
};

export const BuilderListStore = signalStore(
    { providedIn: 'root' },
    withState<BuilderListState>(initialState),
    withMethods((store, ngCliHttpService = inject(NgCliHttpService)) => ({
        fetchBuilders: rxMethod<NgVersion>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap((currentVersion) => ngCliHttpService.getBuilders(currentVersion)),
                tap((builders) => patchState(store, { builderList: builders, isLoading: false })),
                finalize(() => {
                    // TODO: error handling
                    patchState(store, { isLoading: false });
                })
            )
        ),
    })),
    withComputed(({ builderList, isLoading }) => ({
        loading: computed(() => isLoading()),
        builders: computed(() => !isLoading() && builderList().length > 0 ? builderList() : []),
    })),
);
