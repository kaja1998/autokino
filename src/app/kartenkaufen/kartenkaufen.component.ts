import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kartenkaufen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kartenkaufen.component.html',
  styleUrls: ['./kartenkaufen.component.css']
})
export class KartenkaufenComponent {
  zerosArray: number[] = Array(60).fill(0);

  public select(index: number) {
    // this.zerosArray[index] = this.zerosArray[index] === 0 ? 1 : 0
    if (this.zerosArray[index] === 0){
      this.zerosArray[index] = 1;
  }else if (this.zerosArray[index] === 1) {
    this.zerosArray[index] = 2;
  } else {
    this.zerosArray[index] = 0;
  }
  }
}
