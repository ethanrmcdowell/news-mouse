import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import axios from 'axios';
import { Firestore, collection, addDoc, collectionData, query, where, getDocs, DocumentData, deleteDoc, doc, setDoc, orderBy }  from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl: string = 'https://api.thenewsapi.com/v1/news/top&locale=us&language=en';
  accessKey: string = 'oSnyys30Y2Yx81RdE73weaeKrFNnUrl3TBrRMAES';

  constructor(private http: HttpClient, private firestore: Firestore) { }

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

  async saveFavorite(data: any) {
    const collectionInstance = collection(this.firestore, 'userFavorites');
    addDoc(collectionInstance, data).then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.error(error);
    })
  }

  async getFavorites(email: string) {
    let favoriteArray: DocumentData[] = [];
    const q = query(collection(this.firestore, 'userFavorites'), where('user', '==', email));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const id = doc.id;
      data = { id,  ...data };
      favoriteArray.push(data);
    });
    return favoriteArray;
  }

  async removeFavorite(id: string) {
    const docInstance = doc(this.firestore, 'userFavorites', id);
    deleteDoc(docInstance).then(() => {
      console.log("Successfully removed favorite!");
    }).catch((error) => {
      console.error(error);
    })
  }
}
