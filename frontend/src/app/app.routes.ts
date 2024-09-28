import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { builderDataResolver } from './resolvers/builderDataResolver';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    {
        path: 'docs/:version/:builder',
        component: DocumentationComponent,
        resolve: {
            builderData: builderDataResolver
        },
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
