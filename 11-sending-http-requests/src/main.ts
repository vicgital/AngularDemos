import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpClient, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    const req = request.clone({
        //headers : request.headers.set('X-DEBUG', 'TESTING')
    })
    console.log('[Outgoing Request]')
    console.log(req);
    return next(req);
}

bootstrapApplication(AppComponent, { providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
)] }).catch((err) => console.error(err));
