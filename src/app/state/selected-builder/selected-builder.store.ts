import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { BuilderHttpService } from '../../services/builder-http.service';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { NgVersion } from '../versions/ng-version';
import { Builder } from "../builder-list/Builder";
import { JSONSchema7 } from 'json-schema';

export interface SelectedBuilder {
    title: string;
    schema: JSONSchema7;
}

type SelectedBuilderState = {
    selectedBuilder: SelectedBuilder | null;
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
    withMethods((store, ngCliHttpService = inject(BuilderHttpService)) => ({
        fetchBuilder: rxMethod<{ builder: Builder, version: NgVersion }>(
            pipe(
                tap(() => patchState(store, { isLoading: true })),
                switchMap(({ builder, version }) => ngCliHttpService.getBuilder(version.version, builder)),
                tap((builder) => {
                    patchState(store, { selectedBuilder: builder, isLoading: false });
                }),
                finalize(() => {
                    // TODO: handle error
                    patchState(store, { isLoading: false });
                })
            )
        ),
        setSelectedBuilder(builder: SelectedBuilder | null) {
            patchState(store, { selectedBuilder: builder });
        }
    })),
    withComputed(({ isLoading, selectedBuilder }) => ({
        loading: computed(() => isLoading()),
        builder: computed(() => !isLoading() && selectedBuilder() ? selectedBuilder() : null)
    })),
);
