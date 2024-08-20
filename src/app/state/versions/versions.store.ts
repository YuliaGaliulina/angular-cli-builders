import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { NgVersion } from './ng-version';
import { ANGULAR_VERSIONS } from "../../angular-versions";

type VersionsState = {
    versionList: NgVersion[];
    selectedVersion: NgVersion | null;
}

const initialState = {
    versionList: ANGULAR_VERSIONS,
    selectedVersion: null,
};

export const VersionsStore = signalStore(
    { providedIn: 'root' },
    withState<VersionsState>(initialState),
    withMethods((store) => ({
        setCurrentVersion: (version: NgVersion) => {
            patchState(store, { selectedVersion: version });
        }
    })),
    withComputed(({ selectedVersion, versionList }) => ({
        currentVersion: computed(() => selectedVersion()),
        versions: computed(() => versionList())
    })),
    withHooks({
        onInit(store) {
            const latest = store.versions().reduce((maxVersion, currentVersion) => {
                return currentVersion.majorVersion > maxVersion.majorVersion ? currentVersion : maxVersion;
            });
            store.setCurrentVersion(latest);
        }
    })
);