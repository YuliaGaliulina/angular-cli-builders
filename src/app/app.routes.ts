import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { BuilderComponent } from "./components/documentation/builder/builder.component";
import { DocsIntroductionComponent } from "./components/guide/docs-introduction.component";

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    {
        path: 'docs/:version',
        component: DocumentationComponent,
        children: [
            { path: '', component: DocsIntroductionComponent },
            { path: ':builder', component: BuilderComponent },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
