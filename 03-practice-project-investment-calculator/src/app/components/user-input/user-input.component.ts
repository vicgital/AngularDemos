import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IUserInputModel } from '../../models/user-input.model';


@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  @Output() onSubmit: EventEmitter<IUserInputModel> = new EventEmitter<IUserInputModel>();

  initialInvestment: number = 0;
  annualInvestment: number = 0;
  expectedReturn: number = 0;
  duration: number = 0;


  calculate() {

    // add some validation??
    const userInput: IUserInputModel = {
      initialInvestment: this.initialInvestment,
      annualInvestment: this.annualInvestment,
      expectedReturn: this.expectedReturn,
      duration: this.duration
    };  
    
    this.onSubmit.emit(userInput);    
    
  }

}




