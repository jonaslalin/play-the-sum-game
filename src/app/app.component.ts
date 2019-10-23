import { Component } from '@angular/core';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';
import { map, mapTo, scan, startWith, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="card mt-5">
        <h1 class="card-header">Play the sum game</h1>
        <div class="card-body">
          <h2 class="card-title">
            Sum: <span [ngClass]="sumCssClass | async">{{ sum | async }}</span>
          </h2>
          <p class="card-text">
            Add or subtract to the sum by using the buttons below.
          </p>
          <button
            type="button"
            class="btn btn-primary mr-2"
            (click)="plusOne()"
          >
            Plus 1
          </button>
          <button
            type="button"
            class="btn btn-danger mr-2"
            (click)="minusOne()"
          >
            Minus 1
          </button>
          <button type="button" class="btn btn-secondary" (click)="reset()">
            Reset
          </button>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  sum: Observable<number>;
  sumCssClass: Observable<string>;
  private plusOne$ = new Subject<void>();
  private minusOne$ = new Subject<void>();
  private reset$ = new BehaviorSubject<void>(undefined); // flow from start

  constructor() {
    this.sum = this.reset$.pipe(
      switchMapTo(
        merge(
          this.plusOne$.pipe(mapTo(1)),
          this.minusOne$.pipe(mapTo(-1))
        ).pipe(
          scan((sum, i) => sum + i, 0),
          startWith(0)
        )
      )
    );

    this.sumCssClass = this.sum.pipe(
      map(sum => (sum > 0 ? 'text-primary' : sum < 0 ? 'text-danger' : ''))
    );
  }

  plusOne() {
    this.plusOne$.next();
  }

  minusOne() {
    this.minusOne$.next();
  }

  reset() {
    this.reset$.next();
  }
}
