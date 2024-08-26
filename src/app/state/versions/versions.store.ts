import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { NgVersion } from './ng-version';
import { ANGULAR_VERSIONS } from "../../angular-versions";

type VersionsState = {
    versionList: NgVersion[];
    selectedVersion: NgVersion | null;
}

const initialState = {
    versionList: ANGULAR_VERSIONS.map((version) => ({ version: version, majorVersion: `v${version.split('.')[0]}` })),
    selectedVersion: null,
};

export const VersionsStore = signalStore(
    { providedIn: 'root' },
    withState<VersionsState>(initialState),
    withMethods((store) => ({
        setCurrentVersion: (majorVersion: string) => {
            const selectedVersion = store.versionList().find((v) => v.majorVersion === majorVersion);
            patchState(store, { selectedVersion });
        }
    })),
    withComputed(({ selectedVersion, versionList }) => ({
        currentVersion: computed(() => selectedVersion()),
        versions: computed(() => versionList()),
        latestVersion: computed(() => {
            return versionList().reduce((maxVersion, currentVersion) => {
                return currentVersion.majorVersion > maxVersion.majorVersion ? currentVersion : maxVersion;
            })
        }),
    })),
);