import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [
    MatIconModule,
    MatInputModule,
    CommonModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextComponent),
      multi: true,
    },
  ],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent implements ControlValueAccessor{
  constructor() {}

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  input(e: Event){
    this.onChange((e.target as HTMLInputElement).value);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() iconInput: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() isValid!: boolean;

  changeVisibility(){
    console.log("Valor do iconInput: " + this.iconInput)
    console.log("Valor isValid: " + this.isValid)
    // console.log("Valor valor: " + this.valor)

    if(this.iconInput == "visibility_off"){
      this.type = "text"
      this.iconInput = "visibility"
    } else {
      this.type = "password"
      this.iconInput = "visibility_off"
    }
  }

}
