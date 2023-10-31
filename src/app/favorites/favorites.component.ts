import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent {
  @Input() articles: any;
  @Output() removeFavorite = new EventEmitter<any>();

  handleRemoveFav(article: any) {
    this.removeFavorite.emit(article);
  }
}
