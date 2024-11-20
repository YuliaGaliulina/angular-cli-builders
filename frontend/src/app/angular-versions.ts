import { NgVersion } from './models/ng-version';

export const ANGULAR_VERSIONS = [
    '19.0.0',
    '18.2.12',
    '17.3.11',
    '16.2.16',
    '15.2.11',
    '14.2.13',
    '13.3.11',
    '12.2.18',
];

export const VERSIONS_MAPPED: NgVersion[] = ANGULAR_VERSIONS.map((version) => ({
    version: version,
    majorVersion: `v${version.split('.')[0]}`
}));
