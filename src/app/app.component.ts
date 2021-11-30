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
})
export class AppComponent {
  songTitle = '';
  songLyrics = '';
  songStore: ISongStore = {
    total: 0,
    songs: {},
  };
  editMode = false;

  // To display error and success messages in the writer
  error = {
    title: '',
    lyrics: '',
  };
  success = {
    message: '',
  };

  addNewLinesToLyrics(e: any) {
    const keyCode = e.code;
    if (keyCode === 'Enter') {
      this.songLyrics += '\n';
    }
  }

  clearErrorMessages() {
    this.error = {
      title: '',
      lyrics: '',
    };
  }

  clearSuccessMessages() {
    this.success = {
      message: '',
    };
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
    // Check if the song title is entered or not
    if (!this.songTitle) {
      this.clearSuccessMessages();
      this.error.title = 'Please enter a title for the song entry';
      return null;
    }

    // Check if the song lyrics is entered or not
    if (!this.songLyrics) {
      this.clearSuccessMessages();
      this.error.lyrics = 'Please enter lyrics for the song entry';
      return null;
    }

    // Creating a song key to store song entries
    const songKey = this.songTitle.trim().toLowerCase().replace(/\s/g, '-');

    // Show error if the song title is already there in the storage
    if (this.songStore.songs[songKey] && !this.editMode) {
      this.clearErrorMessages();
      this.error.title = 'Song title is already present. Try new name';
      return null;
    }

    // Update the song lyrics if a song selected for editing and reload the song lyrics from storage
    else if (this.songStore.songs[songKey] && this.editMode) {
      this.songStore.songs[songKey].lyrics = this.songLyrics;
      this.clearErrorMessages();
      this.success.message = 'Updated song lyrics successfully';
      this.editMode = false;
    }

    // Create new song entry in the storage if song title is not already present in storage
    else {
      const tempSong: ISong = {
        title: this.songTitle,
        lyrics: this.songLyrics,
      };

      this.songStore.songs[songKey] = tempSong;
      this.songStore.total++;
      this.clearErrorMessages();
      this.success.message = 'Added song entry successfully';
      this.editMode = false;
    }

    localStorage.setItem('songStore', JSON.stringify(this.songStore));
    this.loadSongsFromStorage();
    this.clearWriter();

    // Clear the success message after few seconds
    setTimeout(() => {
      this.clearSuccessMessages();
    }, 2000);

    return this.songStore;
  }

  deleteSongFromStorage(songKey: string) {
    if (this.songStore.songs[songKey]) {
      // Clearing the writer if it holds the data of deleted song entry
      if (this.songTitle === this.songStore.songs[songKey].title) {
        this.clearWriter();
      }

      delete this.songStore.songs[songKey];
      this.songStore.total--;
      localStorage.setItem('songStore', JSON.stringify(this.songStore));
      this.loadSongsFromStorage();
    }
  }

  editSongFromStorage(songKey: string) {
    const title = this.songStore.songs[songKey].title;
    const lyrics = this.songStore.songs[songKey].lyrics;
    this.editMode = true;
    this.songTitle = title;
    this.songLyrics = lyrics;
  }
}
