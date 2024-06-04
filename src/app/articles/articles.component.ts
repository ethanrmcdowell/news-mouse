import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  @Input() articles: any;
  @Output() addFavorite = new EventEmitter<any>();

  ngOnInit() {
    console.log("articles", this.articles);
  }

  handleFavorite(article: any) {
    this.addFavorite.emit(article);
  }
}
