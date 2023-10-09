import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { DataService } from './data.service';
import { newsData }  from '../assets/news';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
constructor(private authService: AuthService, private dataService: DataService) {
  this.authService.userAuthenticated$.subscribe(isAuthenticated => {
    this.userAuthenticated = isAuthenticated;
  });
}

  title = 'news-mouse';
  userEmail: string = '';
  userPass: string = '';
  userPass2: string = '';
  userAuthenticated: boolean = false;
  loginToggle: boolean = false;
  newsData: any;
  topStories: any;
  feedbackMsg: string = '';
  toggleBtn: string = 'login';
  loggedInUser: string = '';
  favoriteArticles: any;

  ngOnInit() {
    // this.getData('en');
    this.topStories = newsData;
    console.log("top stories ->", this.topStories);
  }

  loginUser() {
    this.authService.loginUser(this.userEmail, this.userPass, async (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
        this.handleFeedbackMsg('success');
      } else {
        console.log("FAILURE:", response);
        this.handleFeedbackMsg('failure');
      }
    })
  }

  registerUser() {
    this.authService.registerUser(this.userEmail, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
        this.handleFeedbackMsg('success');
      } else {
        console.log("FAILURE:", response);
        this.handleFeedbackMsg('failure');
      }
    })
  }

  async getFavorites() {
    console.log("LOGGED IN USER ->", this.loggedInUser);
    await this.dataService.getFavorites(this.loggedInUser).then((articles) => {
      this.favoriteArticles = articles;
      console.log("FAVORITE ARTICLES", this.favoriteArticles);
    }).catch((error) => {
      console.error(error);
    });
  }
  
  showFavorites() {
    this.getFavorites();
  }

  getDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  logoutUser() {
    this.authService.logOutUser((response) => {
      console.log(response);
    })
  }

  testFuction() {
    console.log("button worked~~");
  }

  loginClick() {
    this.loginToggle = !this.loginToggle;
  }

  addFavorite(article: any) {
    if (!this.userAuthenticated) {
      this.loginClick();
    } else {
      let articleData = {
        id: article.article_id,
        user: this.loggedInUser,
        title: article.title,
        content: article.content,
        link: article.link,
        pubDate: article.pubDate,
        timestamp: this.getDate(),
      }

      console.log("ARTICLE DATA TO BE FAVORITED ->", articleData);

      this.dataService.saveFavorite(articleData).then(async res => {
        console.log(res);
      }).catch((error) => {
        console.error(error);
      })
    }
  }

  handleFeedbackMsg(res: string) {
    if (res === 'success') {
      this.feedbackMsg = "Successfully logged in!";
      this.loggedInUser = this.userEmail;
      setTimeout(() => {
        this.loginClick();
      }, 3000);
    } else {
      this.feedbackMsg = "Error logging in!";
      setTimeout(() => {
        this.feedbackMsg = '';
      }, 3000);
    }
  }

  async getData(language: string) {
    try {
      this.newsData = await this.dataService.getNews(language);
      this.topStories = this.newsData.data.results;
      console.log("TOP STORIES", this.topStories);
    } catch (error) {
      console.error("Error:", error);
    }
  }
}
