import { Pipe, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';

@Pipe({
    standalone: true,
    name: 'filterError',
})
export class FilterErrorPipe implements PipeTransform {
    transform(control: FormControl, error: string): boolean {
        return control.errors !== null && control.errors[error] != null && control.errors[error] === true;
    }
}
