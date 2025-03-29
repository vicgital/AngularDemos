import { Component, ContentChild, ElementRef, Host, HostBinding, HostListener, inject, input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  // host: {
  //   class: 'control'
  // }
})
export class ControlComponent {

  label = input.required<string>(); 
  private el = inject(ElementRef)

  @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;

  @HostBinding('class') className = 'control';
  @HostListener('click') onClick() {
    console.log('ControlComponent.onClick');
    console.log(this.el);

  }

}
