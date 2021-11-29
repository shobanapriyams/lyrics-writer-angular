import { Component, AfterViewInit, OnDestroy } from '@angular/core';

import wavesurfer from 'wavesurfer.js';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
})
export class AudioPlayerComponent implements AfterViewInit, OnDestroy {
  wave: any;
  mp3url = '';
  totalDuration = '0:0';
  currentTime = '0:0';
  playStatus = false;
  muteStatus = false;

  ngAfterViewInit(): void {
    this.wave = wavesurfer.create({
      container: '#waveform',
      waveColor: 'gray',
      progressColor: 'black',
    });

    this.wave.load(
      'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
    );

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

  loadSong(): void {
    // sample url - http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3

    this.wave.load(
      'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'
    );
  }

  ngOnDestroy(): void {
    this.wave.destory();
  }

  timeCalculator = function (value: number) {
    let second = Math.floor(value % 60);
    let minute = Math.floor((value / 60) % 60);

    if (second < 10) {
      second = 0 + second;
    }

    return minute + ':' + second;
  };
}
