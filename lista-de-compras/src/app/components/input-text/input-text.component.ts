import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  constructor() {}

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() iconInput: string = '';
  @Input() type: string = '';
  @Input() name: string = '';

  changeVisibility(){
    console.log("Valor do iconInput: " + this.iconInput)

    if(this.iconInput == "visibility_off"){
      this.type = "text"
      this.iconInput = "visibility"
    } else {
      this.type = "password"
      this.iconInput = "visibility_off"
    }
  }

}
