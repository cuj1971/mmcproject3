import { Component, OnInit } from '@angular/core';
import { TestService } from '../../shared/model/test.service'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  news = [];

  constructor( private testService: TestService ) { 

  }

  ngOnInit(): void {
    this.testService.sendGetRequest().subscribe((data: any[])=>{
      console.log('data:', data);
      this.news = data;
      console.log('this.news:', this.news);
    })  
  }

}
