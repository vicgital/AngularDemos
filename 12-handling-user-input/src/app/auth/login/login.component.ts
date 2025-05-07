import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, of } from 'rxjs';


const mustContainQuestionMark = (control: AbstractControl) => {
  if (control.value.includes('?')) {
    return null;
  } 
  return { doesNotContainQuestionMark : true }
};

const emailIsUnique = (control: AbstractControl) => {
  if (control.value !== 'test@example.com') {
    return of(null);
  }

  return of({notUnique : true});
};

const savedForm = window.localStorage.getItem('saved-login-form');

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit{
  
  private destroyRef = inject(DestroyRef)
  
  ngOnInit(): void {
    


    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   this.loginForm.patchValue({
    //     email: loadedForm.email
    //   });
    // }

    const subscribe = this.loginForm.valueChanges.pipe(debounceTime(500)).subscribe(
      {
        next: value => {
          window.localStorage.setItem('saved-login-form', JSON.stringify({
            email : value.email
          }))
        }
      }
    );

    this.destroyRef.onDestroy(() => { subscribe.unsubscribe() })


  }

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [ Validators.email, Validators.required ],
      asyncValidators: [ emailIsUnique ]
    }),
    password: new FormControl('', {
      validators: [ Validators.required, Validators.minLength(6), mustContainQuestionMark ]
    }),
  });

  onSubmit() {
   console.log(this.loginForm);
   const enteredEmail = this.loginForm.value.email;
   const enteredPassword = this.loginForm.value.password;

   console.log(enteredEmail,enteredPassword);
  }

  get emailIsInvalid() {
    return this.loginForm.controls.email.touched && this.loginForm.controls.email.dirty && this.loginForm.controls.email.invalid;
  }

  get passwordIsInvalid() {
    return this.loginForm.controls.password.touched && this.loginForm.controls.password.dirty && this.loginForm.controls.password.invalid;
  }

}