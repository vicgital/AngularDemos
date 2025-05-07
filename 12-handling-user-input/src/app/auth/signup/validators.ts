import { AbstractControl } from "@angular/forms";

export const equalValues = (controlName1:string, controlName2:string) => {

  const checkValues = (control: AbstractControl) => {

    const val1 = control.get(controlName1)?.value
    const val2 = control.get(controlName2)?.value
    if(val1 === val2){
      return null;
    }
    return { isEqual: false };
  } 
  return checkValues;
};