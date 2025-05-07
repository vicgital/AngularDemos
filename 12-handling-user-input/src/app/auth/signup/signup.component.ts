import { Component, signal } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { equalValues } from './validators';

@Component({
  selector: 'app-signup',
  standalone: true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  imports: [ReactiveFormsModule]
})
export class SignupComponent {

  isFormValid = signal(true);

  signupForm = new FormGroup({
      email: new FormControl('', {
        validators: [ Validators.email, Validators.required ]
      }),
      passwords: new FormGroup({
        password: new FormControl('', {
          validators: [ Validators.required, Validators.minLength(6) ]
        }),
        confirmPassword : new FormControl('', {
          validators: [ Validators.required, Validators.minLength(6) ]
        })
      }, {validators: [ equalValues('password','confirmPassword' ) ] }),
      firstName: new FormControl('', { validators: [ Validators.required ]}),
      lastName: new FormControl('', { validators: [ Validators.required ]}),
      address: new FormGroup({
        street: new FormControl('', { validators: [ Validators.required ]}),
        number: new FormControl('', { validators: [ Validators.required ]}),
        postalCode: new FormControl('', { validators: [ Validators.required ]}),
        city: new FormControl('', { validators: [ Validators.required ]}),
      }),
      role: new FormControl<'student' | 'teacher' | 'employee' | 'founder' | 'other'>('student', { validators: [ Validators.required ]}),
      source: new FormArray([
        new FormControl(false),
        new FormControl(false),
        new FormControl(false)
      ]),
      agree: new FormControl<boolean>(false, { validators: [Validators.required] })
    });
      

    onSubmit() {
      if (this.signupForm.invalid) {
        console.log('invalid form!');
        this.isFormValid.set(false);
        return;
      }

      var enteredEmail = this.signupForm.value.email;
      var enteredPassword = this.signupForm.value.passwords?.password;
      console.log(enteredEmail,enteredPassword);
    }

    onReset() {
      this.isFormValid.set(true);
      this.signupForm.reset();
    }

}
