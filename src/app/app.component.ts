import { Component } from '@angular/core';

// Song Interfaces
interface ISong {
  title: string;
  lyrics: string;
}

interface ISongStore {
  total: number;
  songs: {
    [key: string]: ISong;
  };
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  songTitle = '';
  songLyrics = '';
  songStore: ISongStore = {
    total: 0,
    songs: {},
  };

  addNewLinesToLyrics(e: any) {
    const keyCode = e.code;
    if (keyCode === 'Enter') {
      this.songLyrics += '\n';
    }
  }

  //Lyric Writer Operations
  clearWriter() {
    this.songLyrics = '';
    this.songTitle = '';
  }

  // Song Store operations
  loadSongsFromStorage() {
    const store: any = localStorage.getItem('songStore');
    this.songStore = JSON.parse(store);
    return this.songStore;
  }

  saveSongToStorage() {
    if (!this.songTitle || !this.songLyrics) {
      console.log('No data to store');
      return null;
    }

    const title = this.songTitle.toLowerCase().replace(/\s/g, '-');

    if (this.songStore.songs[title]) {
      console.log('Song title is already present. Try new name');
      return null;
    }

    const tempSong: ISong = {
      title: this.songTitle,
      lyrics: this.songLyrics,
    };

    this.songStore.songs[title] = tempSong;
    this.songStore.total++;
    localStorage.setItem('songStore', JSON.stringify(this.songStore));
    this.loadSongsFromStorage();
    this.clearWriter();

    return tempSong;
  }

  deleteSongFromStorage(songTitle: string) {
    if (this.songStore.songs[songTitle]) {
      delete this.songStore.songs[songTitle];
      this.songStore.total--;
      localStorage.setItem('songStore', JSON.stringify(this.songStore));
      this.loadSongsFromStorage();
    }
  }
}
