import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Article } from './article';
import { Router, RouterLink } from '@angular/router';
import { ArticleService } from '../../../services/articles.service';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css',
})
export class ArticleComponent {
  @Input({ required: true }) article!: Article;
  @Output() articleDeleted: EventEmitter<never> = new EventEmitter<never>();

  service: ArticleService = inject(ArticleService);
  constructor(private router: Router) {}

  delete() {
    this.service.delete(this.article.id).subscribe(() => {
      console.log('Article supprimé');
      this.articleDeleted.emit();
    });
  }
}
