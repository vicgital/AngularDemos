import { Injectable } from "@angular/core";
import { IUserInputModel } from "../models/user-input.model";
import { IInvestmentResults } from "../models/investment-results";

@Injectable({
    providedIn: 'root',
})
export class InvestmentService {

    public calculateInvestmentResults(userInput: IUserInputModel): IInvestmentResults {
        const result: IInvestmentResults = { items: [] };

        let investmentValue = userInput.initialInvestment;
      
        for (let i = 0; i < userInput.duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (userInput.expectedReturn / 100);
          investmentValue += interestEarnedInYear + userInput.annualInvestment;
          const totalInterest =
            investmentValue - userInput.annualInvestment * year - userInput.initialInvestment;


            result.items.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: userInput.annualInvestment,
            totalInterest: totalInterest,
            totalAmountInvested: userInput.initialInvestment + userInput.annualInvestment * year,
          });
        }
      
        return result;
      }

}