import { Component, Input } from '@angular/core';
import { IInvestmentResults } from '../../models/investment-results';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  
  @Input({required:true}) results!: IInvestmentResults;

}
