import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lyrics = "";

  addNewLinesToLyrics(e: any) {
    const keyCode = e.code;
    if (keyCode === "Enter") {
      this.lyrics += "\n";
    }
  }
}
