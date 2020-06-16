import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExchangeService } from '../shared/model/exchange.service';
import { Exchange } from '../shared/model/exchange';
import { IExchange, IExchangeJSON } from '../shared/model/exchangeratesapi';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit {

  public myrates$: Observable<Exchange>;
  public mybase$: Observable<any>

  constructor(private exchangeservice: ExchangeService) { 
    this.searchRates();
  }

  searchRates() {
    console.log('searchRates()');
    this.myrates$ = this.exchangeservice.getRates();

    this.mybase$ = this.myrates$.pipe(
      map(res => ({
        base: res.getBase(),
        start_at: res.getStart(),
        end_at: res.getEnd(),
        rates: res.getRates()
      }))
    );
  }
  
  ngOnInit(): void {
  }

}
