import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { schemaResolver } from './services/schema.resolver';
import { buildersResolver } from './services/builders.resolver';
import { BuilderComponent } from './components/documentation/builder/builder.component';
import { DocsIntroductionComponent } from './components/documentation/guide/docs-introduction.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    {
        path: 'docs/:version',
        component: DocumentationComponent,
        resolve: {
            builders: buildersResolver
        },
        children: [
            { path: '', component: DocsIntroductionComponent, pathMatch: 'full' },
            {
                path: ':builder',
                component: BuilderComponent,
                resolve: {
                    schema: schemaResolver
                }
            },
        ]
    },
    
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
