import { Routes } from '@angular/router';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { HomePageComponent } from './components/home-page/home-page.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', component: HomePageComponent },
    {
        path: 'builders',
        component: DocumentationComponent,
        children: [
            { path: ':name', component: MarkdownComponent },
        ]
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', component: NotFoundComponent }
];
