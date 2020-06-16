import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap} from 'rxjs/operators';
import * as moment from 'moment';
import { IExchangeJSON } from './exchangeratesapi';
import { Exchange } from './exchange';


@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  constructor(private http:HttpClient) { }

  public getRates() {
    let apiEndpoint = 'https://api.exchangeratesapi.io/history?start_at=2020-01-01&end_at=2020-01-10&base=USD&symbols=GBP,CHF';
    
    return this.http.get<IExchangeJSON>(apiEndpoint).pipe(
      map(res => new Exchange(res))
    )

  }
}
