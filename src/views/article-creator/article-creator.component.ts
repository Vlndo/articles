import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../services/articles.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AbstractFormComponent } from '../../tools/abstract-form-component';

@Component({
  selector: 'app-article-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-creator.component.html',
  styleUrl: './article-creator.component.css',
})
export class ArticleCreatorComponent extends AbstractFormComponent {
  data: Image[] = [
    {
      id: 0,
      src: 'pic01.jpg',
    },
    {
      id: 1,
      src: 'pic02.jpg',
    },
    {
      id: 2,
      src: 'pic03.jpg',
    },
    {
      id: 3,
      src: 'pic04.jpg',
    },
    {
      id: 4,
      src: 'pic05.jpg',
    },
    {
      id: 5,
      src: 'pic06.jpg',
    },
    {
      id: 6,
      src: 'pic07.jpg',
    },
    {
      id: 7,
      src: 'pic08.jpg',
    },
    {
      id: 8,
      src: 'pic09.jpg',
    },
    {
      id: 9,
      src: 'pic10.jpg',
    },
    {
      id: 10,
      src: 'pic11.jpg',
    },
  ];

  pics: string[] = this.data.map((image) => image.src);

  form: FormGroup = new FormGroup({
    id: new FormControl(0),
    src: new FormControl(null),
    alt: new FormControl('', { validators: [Validators.required] }),
    titre: new FormControl('', { validators: [Validators.required] }),
    description: new FormControl('', { validators: [Validators.required] }),
    lien: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(
    private service: ArticleService,
    private router: Router,
    route: ActivatedRoute
  ) {
    super();
    route.data.subscribe(({ article }) => {
      if (article) this.form.patchValue(article);
      else
        this.form.reset({
          id: 0,
          description: 'Description Reset',
        });
    });
  }

  onSubmit$(): void {
    this.service
      .newArticle(this.form.value)
      .subscribe(() => this.router.navigate(['/home']));
  }
}

export interface Image {
  id: number;
  src: string;
}
