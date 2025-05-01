import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit {  
  private destroyRef = inject(DestroyRef);
  isFetching = signal(false);
  error = signal('');
  placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;

  ngOnInit(): void {

    this.isFetching.set(true);

    var getSubscribe = this.placesService.loadUserPlaces()
      .subscribe({
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        }
      });

    this.destroyRef.onDestroy(() => {
      getSubscribe.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const subscription = this.placesService.removeUserPlace(selectedPlace).subscribe({
      next: (response) => {
        console.log('REMOVED',response);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
