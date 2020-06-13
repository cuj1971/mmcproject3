import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { INewYorkTimesResponse } from './newyorktimes';
import { News } from './news';
import { map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  // The BehaviorSubject will store the New York Times Search instance into memory and allows us to emit new values
  private _test: BehaviorSubject<News> = new BehaviorSubject<News>(null);
  // The Observable is just a limited version of BehaviorSubject to expose to public
  private test$: Observable<News> = this._test.asObservable();
  
  apiKey: string = 'B2O7riG2DAbmoBannY9R03ytV2AiACpP';
  //private apiEndpoint = "http://localhost:3000/response";
  private apiEndpoint = `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=Celtic&sort=newest&api-key=${this.apiKey}`;

  constructor(private httpClient: HttpClient) { }

  public sendGetRequest() {
    return this.httpClient.get(this.apiEndpoint);

    //return this.httpClient.get<INewYorkTimesResponse>(this.apiEndpoint).pipe(
      //tap(res => console.log('hello')),
      //map(response => new News(response)),
      //tap(news => this._test.next(news)),
      //switchMap(()=> this.getNews$())
      //tap(ps2 => console.log(`Products number: ${ps2.rawResponse}`))
    //)
  }
}
