import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map, switchMap, tap} from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { INewYorkTimesResponse, INewYorkTimesFullJSON, INewYorkTimesResponseDoc, INewYorkTimesResponseMeta, INewYorkTimes } from './newyorktimes';
import { News } from './news'

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // The BehaviorSubject will store the New York Times Search instance into memory and allows us to emit new values
  private _news: BehaviorSubject<News> = new BehaviorSubject<News>(null);
  // The Observable is just a limited version of BehaviorSubject to expose to public
  private news$: Observable<News> = this._news.asObservable();

  constructor(private http:HttpClient) { }

  public getNews$(): Observable<News> {
    console.log('getNews:');
    return this.news$
  }

  public fetchAndGetNews$(searchTerm: string, startDate: Date): Observable<News> {
    console.log('fetchAndGetNews:');
    console.log('startYear', startDate.getFullYear(), 'startMonth', startDate.getMonth(), 'startDay', startDate.getDate());
    let apiKey = environment.apiKey;
    // https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Trump&sort=newest&fq=pub_year:(2001)&api-key=B2O7riG2DAbmoBannY9R03ytV2AiACpP
    
    // pub_year:[2003 TO 2005]
    // pub_date:[2005-12-01 TO 2005-12-31]

    let apiEndpoint = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchTerm}&sort=newest&fq=pub_date:[2005-12-01 TO 2005-12-31]&api-key=${apiKey}`;
    //private apiEndpoint = 'http://localhost:3000/response';

    return this.http.get<INewYorkTimesFullJSON>(apiEndpoint).pipe(
      map(res => new News(res)),
      //tap(res => console.log('res', res)),
      //tap(news => this._news.next(news)),
      //switchMap(() => this.getNews$())
    )
  }
}
