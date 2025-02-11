import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [MatIconModule, MatInputModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent implements ControlValueAccessor {
  constructor() {}

  value: string = '';
  onChange: any = (value: string) => {};
  onTouched: any = () => {};
  @Output() pressEnter:  EventEmitter<boolean> = new EventEmitter();

  onInput(e: Event) {
    let input = (e.target as HTMLInputElement).value;
    this.value = input;
    this.onChange(input);
  }

  keyPress(e: KeyboardEvent){
    if(e.key == "Enter"){
      this.pressEnter.emit(true);
      console.log("CLick enter")
    }
  }

  writeValue(obj: any): void {
    this.value = obj || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() iconInput: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() isValid!: boolean;

  changeVisibility() {
    console.log('Valor do iconInput: ' + this.iconInput);
    console.log('Valor isValid: ' + this.isValid);

    if (this.iconInput == 'visibility_off') {
      this.type = 'text';
      this.iconInput = 'visibility';
    } else {
      this.type = 'password';
      this.iconInput = 'visibility_off';
    }
  }
}
