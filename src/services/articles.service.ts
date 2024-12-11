import { Injectable } from '@angular/core';
import { AbstractService } from '../tools/abstract-service';
import { Article } from '../views/home/article/article';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService extends AbstractService<Article> {
  protected readonly ENDPOINT: string = 'http://localhost:3000/articles';

  getAll(): Observable<Article[]> {
    return this.http.get<Article[]>(this.ENDPOINT);
  }

  newArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.ENDPOINT, article);
  }
}
