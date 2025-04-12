import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'temp',
    standalone: true,
})
export class TemperaturePipe implements PipeTransform {

    transform(value: number | number | null, unit: 'C' |'F'): string {
        if (!value || isNaN(value)) {
            return '';
        }

        if (unit === 'C') {
            const celsius = (value - 32) * 5 / 9;
            return `${celsius.toFixed(2)} °C`;
        } else if (unit === 'F') {
            const fahrenheit = (value * 9 / 5) + 32;
            return `${fahrenheit.toFixed(2)} °F`;
        }
        

        return `${value} °${unit}`;
    }

}