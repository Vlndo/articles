import { Component, inject } from '@angular/core';
import { ArticleComponent } from './article/article.component';
import { Article } from './article/article';
import { ArticleService } from '../../services/articles.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ArticleComponent, AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected service = inject(ArticleService);

  private route = inject(ActivatedRoute);

  data = this.route.data.pipe(map(({ articles }) => articles));
}
