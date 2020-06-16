import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { News } from '../shared/model/news';
import { NewsService } from '../shared/model/news.service';
import { INewYorkTimesResponseMeta, INewYorkTimesResponseDoc } from '../shared/model/newyorktimes';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  searchForm: FormGroup;
  page: number = 0;
  public mynews$: Observable<News>;
  public newsSearchHits$: Observable<INewYorkTimesResponseMeta>;
  public newsDocs$: Observable<INewYorkTimesResponseDoc[]>;

  constructor(private fb: FormBuilder, private mynews: NewsService) {

  }

  searchNews(setpage: string) {
    console.log(
      `in searchNews(),
      ${this.searchForm.value.primarySearch}, 
      ${this.searchForm.value.startDatePicker}, 
      ${this.searchForm.value.endDatePicker},
      ${setpage}`
      );

      if (setpage === 'next') {
         this.page = this.page + 1;
        } 
      else if (setpage === 'prev') {
          this.page = this.page - 1;
        }
      else {
          this.page = 0;
        }

    this.mynews$ = this.mynews.fetchAndGetNews$(this.searchForm.value.primarySearch, this.searchForm.value.startDatePicker, this.searchForm.value.endDatePicker, this.page);

    this.newsSearchHits$ = this.mynews$.pipe(
      map(newsSearchHits => ({
        hits: newsSearchHits.getHits(),
        offset: newsSearchHits.getOffset(),
        time: newsSearchHits.getTime()
      }))
    );

    this.newsDocs$ = this.mynews$.pipe(
      map(docs => {
        let alldocs = docs.getDocs();
        return alldocs.map(doc => ({
          abstract: doc.abstract,
          lead_paragraph: doc.lead_paragraph,
          pub_date: doc.pub_date,
          web_url: doc.web_url,
          headline: {
            main: doc.headline.main
          }
        }))
      })
    )
  }

  searchExchange(e) {
    console.log("searchExchange", e);
  }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      primarySearch: ['Trump', Validators.required],
      startDatePicker: ['01/01/2020', Validators.required],
      endDatePicker: ['31/12/2020', Validators.required]
    })
  }

}
