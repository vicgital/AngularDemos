import { Component, inject } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";

import { InvestmentResultsComponent } from "./components/investment-results/investment-results.component";
import { IUserInputModel } from './models/user-input.model';
import { IInvestmentResults } from './models/investment-results';
import { InvestmentService } from './services/investment.service';
import { UserInputComponent } from './components/user-input/user-input.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultsComponent],
})
export class AppComponent {

  investmentResults:IInvestmentResults = {items: []};
  private investmentService: InvestmentService = inject(InvestmentService);



  calculateInvestment($event: IUserInputModel) {
    this.investmentResults = this.investmentService.calculateInvestmentResults($event);
  }

}
