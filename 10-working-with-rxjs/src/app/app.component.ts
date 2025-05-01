import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);
  clickCount = signal(0);

  constructor() {
    // effect(() => {
    //   console.log('clicked button ' + this.clickCount());
    // });    
  }  

  ngOnInit(): void {
    // const subscription = interval(1000).pipe(
    //   map((value:number) => {
    //     return value * 2;
    //   })
    // ).subscribe({
    //   next: (value:number) => {
    //     console.log(value);
    //   },
    //   complete: () => {
    //     console.log('interval complete..');
    //   }
    // });

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // });

  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }

}
