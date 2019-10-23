import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="card mt-5">
        <h1 class="card-header">Play the sum game</h1>
        <div class="card-body">
          <h2 class="card-title">
            Sum: <span class="text-info">{{ sum }}</span>
          </h2>
          <p class="card-text">
            Add or subtract to the sum by using the buttons below.
          </p>
          <button type="button" class="btn btn-primary mr-2">Plus 1</button>
          <button type="button" class="btn btn-danger mr-2">Minus 1</button>
          <button type="button" class="btn btn-secondary">Reset</button>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  sum = 0;
}
