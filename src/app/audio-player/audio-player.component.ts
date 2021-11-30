import { Component, OnDestroy, AfterViewInit } from '@angular/core';

import wavesurfer from 'wavesurfer.js';

interface ITrack {
  title: string;
  link: string;
}

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  wave: any;
  totalDuration = '0:0';
  currentTime = '0:0';
  playStatus = false;
  muteStatus = false;
  playlist: ITrack[] = [
    {
      title: 'Sample 1',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 2',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 3',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 4',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 5',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 6',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 7',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 8',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 9',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
    {
      title: 'Sample 10',
      link: 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3',
    },
  ];

  ngAfterViewInit(): void {
    this.wave = wavesurfer.create({
      container: '#waveform',
      waveColor: 'gray',
      progressColor: 'black',
    });

    // sample url - http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3

    this.wave.load(this.playlist[0].link);

    this.wave.on('mute', () => {
      this.muteStatus = !this.muteStatus;
    });

    this.wave.on('play', () => {
      this.playStatus = true;
    });

    this.wave.on('pause', () => {
      this.playStatus = false;
    });

    this.wave.on('ready', () => {
      this.totalDuration = this.timeCalculator(this.wave.getDuration());
    });

    this.wave.on('audioprocess', () => {
      this.currentTime = this.timeCalculator(this.wave.getCurrentTime());
    });

    this.wave.on('seek', () => {
      this.currentTime = this.timeCalculator(this.wave.getCurrentTime());
    });
  }

  timeCalculator = function (value: number) {
    let second = Math.floor(value % 60);
    let minute = Math.floor((value / 60) % 60);

    if (second < 10) {
      second = 0 + second;
    }

    return minute + ':' + second;
  };

  loadSong(songIndex: number): void {
    this.wave.load(this.playlist[songIndex].link);
  }

  changeVolumeRange(e: Event) {
    const volumeRangeInput = e.target as HTMLInputElement;
    this.wave.setVolume(volumeRangeInput.value);
  }

  ngOnDestroy(): void {
    this.wave.destory();
  }
}
