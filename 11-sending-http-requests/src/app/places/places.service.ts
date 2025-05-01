import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  
  private userPlaces = signal<Place[]>([]);
  loadedUserPlaces = this.userPlaces.asReadonly();
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);

  loadAvailablePlaces(): Observable<Place[]> {
    return this.fetchPlaces('/places', 'Something went wrong fetching places');
  }

  loadUserPlaces(): Observable<Place[]> {
    return this.fetchPlaces('/user-places', 'Something went wrong fetching user places').pipe(
      tap({
        next: (userPlaces) => {
          this.userPlaces.set(userPlaces);
        }
      })
    );
  }

  addPlaceToUserPlaces(place: Place) {

    const prevPlaces = this.userPlaces();

    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId : place.id
    }).pipe(
      catchError(error => {
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to store selected place');
        return throwError(() => new Error('Failed to store selected place'))
      }));
  }

  removeUserPlace(place: Place) {

    const prevPlaces = this.userPlaces();

    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter(item => item.id !== place.id));
    }

    return this.httpClient.delete('http://localhost:3000/user-places/' + place.id).pipe(
      catchError(error => {
        // rollback
        this.userPlaces.set(prevPlaces);
        this.errorService.showError('Failed to delete selected place');
        return throwError(() => new Error('Failed to delete selected place'))
      }));


  }


  private fetchPlaces(route:string, errorMessage: string) {
    return this.httpClient
        .get<{places: Place[]}>('http://localhost:3000' + route)
        .pipe(
           map((responseData) => responseData.places),
           catchError((error) => {
            console.log(error);
            return throwError(() => new Error(errorMessage))
           } )
        )
  }

}
