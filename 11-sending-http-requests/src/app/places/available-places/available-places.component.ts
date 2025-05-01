import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent]
})
export class AvailablePlacesComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  placesService = inject(PlacesService);

  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');



  ngOnInit(): void {

    this.isFetching.set(true);

    var subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        console.log(places);
        this.places.set(places);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        this.isFetching.set(false);
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onSelectPlace = (selectedPlace: Place)  => {

    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (response) => {
        console.log(response);
        ///this.places.set(this.placesService.loadedUserPlaces())
      }
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });

  }




}
