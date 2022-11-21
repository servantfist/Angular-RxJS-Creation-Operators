import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/timer";
import "rxjs/add/operator/do";
import "rxjs/add/operator/take";
import "rxjs/add/operator/share";
import "rxjs/add/operator/shareReplay";
import { of, from } from 'rxjs';
import { OnInit } from '@angular/core';
import { map, take, tap } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  name = 'Angular 6';


  ngOnInit() {
    of(1,2,3, 4, 5)
    .pipe(
      tap(item => console.log(`sub1: map/tap val0: ${item}`)),
      map(item => item * 2),
      tap(item => console.log(`sub1: map/tap (*2) val1: ${item}`)),
      map(item => item - 1),
      tap(item => console.log(`sub1: map/tap (-1) val2: ${item}`)),
      take(2) // stops and sends complete to subscription
  ).subscribe(item => console.log(`sub1 end val: ${item}`));

  // with error:  An error immediately halts processing observable
      from([20, 15,10, 5, 1]).pipe(
        tap(item => console.log(`sub2: map/tap val0: ${item}`)),
        map(item => item * 2),
        map(item => item - 10),
        map(item => {
          if(item == 0) {
            throw new Error(`sub2: zero detected`);
          }
          return item;
        }),
      ).subscribe({
          next: (item) => console.log(`sub2: ${item}`),
          error: (item) => console.log(`sub2: error detected`),
          // NOTE:  Does not complete after error
          complete: () => console.log(`sub2: complete`),
      });
  }

}
