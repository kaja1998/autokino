import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-start',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {

}
/*window.onload = function() {
  var video = document.querySelector('video');
  if (video !== null) {
      video.muted = true;
  }
};*/
