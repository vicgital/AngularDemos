import { Directive, ElementRef, HostBinding, inject, input, Input } from '@angular/core';

@Directive({
    selector: 'a[appSafeLink]',
    standalone: true,
    host: {
        '(click)': 'onConfirmLeavePage($event)', 
    }
})
export class SafeLinkDirective {
    constructor() {
        console.log('SafeLinkDirective initialized');
    }

    queryParam = input('myapp', { alias: 'appSafeLink' });
    private hostElementRef = inject<ElementRef<HTMLAnchorElement>>(ElementRef)


    onConfirmLeavePage(event: MouseEvent) {
        const success = window.confirm('Are you sure you want to leave this page?');
        if (!success) {
            event.preventDefault(); // Prevent the default action of the link
            return;
        }

        const address = (event.target as HTMLAnchorElement).href;
        (event.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam(); 

    }

}