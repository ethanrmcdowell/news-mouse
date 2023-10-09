import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = 'https://api.thenewsapi.com/v1/news/top&locale=us&language=en';
  accessKey: string = 'oSnyys30Y2Yx81RdE73weaeKrFNnUrl3TBrRMAES';

  constructor(private http: HttpClient) { }

  getNews(language: string) {
    let url = "https://newsdata.io/api/1/news?apikey=pub_26343bd51473001e6f4a9f2a8a16d68b91285&country=us&language=";
    url += language;

    console.log("URL", url);

    return axios.get(url)
      .then(response => response)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}
