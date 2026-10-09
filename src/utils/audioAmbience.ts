/**
 * Self-contained ambient rain and cozy tea-shop lo-fi sound generator
 * utilizing Web Audio API. Requires zero external network audio files.
 */
class AmbientSoundManager {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private rainNode: AudioBufferSourceNode | null = null;
  private padOscillators: OscillatorNode[] = [];

  public start(): boolean {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isPlaying) return true;

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.18, this.ctx.currentTime + 1.5);
      this.masterGain.connect(this.ctx.destination);

      // Rain Synthesizer (White/Pink noise buffer filtered through lowpass and highpass)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        // Pink-ish noise filter
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      this.rainNode = this.ctx.createBufferSource();
      this.rainNode.buffer = noiseBuffer;
      this.rainNode.loop = true;

      // Lowpass filter for muffled cozy rain drop texture
      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(800, this.ctx.currentTime);

      const highpass = this.ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(120, this.ctx.currentTime);

      const rainGain = this.ctx.createGain();
      rainGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.rainNode.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(rainGain);
      rainGain.connect(this.masterGain);

      this.rainNode.start();

      // Soft Warm Ambient Lo-Fi Pad Chords (Gentle Pentatonic D major/minor cozy resonance)
      const frequencies = [146.83, 220.00, 261.63, 329.63]; // D3, A3, C4, E4
      this.padOscillators = [];

      frequencies.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const padFilter = this.ctx.createBiquadFilter();
        const padGain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        padFilter.type = 'lowpass';
        padFilter.frequency.setValueAtTime(450, this.ctx.currentTime);

        padGain.gain.setValueAtTime(0.015 / (idx + 1), this.ctx.currentTime);

        osc.connect(padFilter);
        padFilter.connect(padGain);
        padGain.connect(this.masterGain);

        osc.start();
        this.padOscillators.push(osc);
      });

      this.isPlaying = true;
      return true;
    } catch {
      return false;
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);

      setTimeout(() => {
        if (this.rainNode) {
          try { this.rainNode.stop(); } catch { /* ignore */ }
          this.rainNode.disconnect();
          this.rainNode = null;
        }
        this.padOscillators.forEach((osc) => {
          try { osc.stop(); } catch { /* ignore */ }
          osc.disconnect();
        });
        this.padOscillators = [];
        this.isPlaying = false;
      }, 900);
    } catch {
      this.isPlaying = false;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      return this.start();
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientSound = new AmbientSoundManager();
