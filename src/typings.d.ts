// typings.d.ts
declare module 'process' {
    export const env: {
        [key: string]: string | undefined;
    };
    // Add other properties or methods from the process module as needed
}