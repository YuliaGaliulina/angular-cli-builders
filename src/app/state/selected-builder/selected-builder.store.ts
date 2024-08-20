import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { NgCliHttpService } from '../../services/ng-cli-http.service';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NgVersion } from '../versions/ng-version';

type SelectedBuilderState = {
    selectedBuilder: any;
    isLoading: boolean;
    error: boolean;
}

const initialState = {
    selectedBuilder: null,
    isLoading: false,
    error: false,
};

export const SelectedBuilderStore = signalStore(
    { providedIn: 'root' },
    withState<SelectedBuilderState>(initialState),
    withMethods((store, ngCliHttpService = inject(NgCliHttpService)) => ({
        fetchBuilder: rxMethod<{ path: string, version: NgVersion }>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(({ path, version }) => ngCliHttpService.getBuilder(version.version, path)),
                tap((builder) => {
                    patchState(store, { selectedBuilder: builder, isLoading: false });
                }),
                finalize(() => {
                    // TODO: handle error
                    patchState(store, { isLoading: false });
                })
            )
        ),
    })),
    withComputed(({ isLoading, selectedBuilder }) => ({
        loading: computed(() => isLoading()),
        builder: computed(() => !isLoading() && selectedBuilder() ? selectedBuilder() : null)
    })),
);
