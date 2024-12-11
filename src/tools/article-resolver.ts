import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Article } from '../views/home/article/article';
import { ArticleService } from '../services/articles.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleResolver implements Resolve<Article[]> {
  constructor(private articleService: ArticleService) {}
  resolve(): Observable<Article[]> {
    return this.articleService.getAll();
  }
}
