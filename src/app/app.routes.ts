import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ArticleService } from '../services/articles.service';
import { inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { authGuard } from '../tools/auth.guard';
import { ArticleResolver } from '../tools/article-resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../views/home/home.component').then((m) => m.HomeComponent),
    resolve: { articles: ArticleResolver },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('../views/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('../views/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'form-control',
    loadComponent: () =>
      import('../views/form-control/form-control.component').then(
        (m) => m.FormControlComponent
      ),
  },
  {
    path: 'editor/:id',
    loadComponent: () =>
      import('../views/article-editor/article-editor.component').then(
        (m) => m.ArticleEditorComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: 'new-article',
    loadComponent: () =>
      import('../views/article-creator/article-creator.component').then(
        (m) => m.ArticleCreatorComponent
      ),
    canMatch: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('../views/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
  },
];
