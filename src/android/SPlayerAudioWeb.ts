/**
 * SPlayerAudio Web 实现
 * 
 * 用于在浏览器开发环境中模拟音频播放功能
 * 使用 HTML5 Audio API 实现基本播放控制
 */

import type { PluginListenerHandle } from '@capacitor/core';
import type { SPlayerAudioPlugin, PlayerStateInfo } from './SPlayerAudio';
import { PlayerState } from './SPlayerAudio';

export class SPlayerAudioWeb implements SPlayerAudioPlugin {
  private audio: HTMLAudioElement | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  constructor() {
    console.log('[SPlayerAudioWeb] Initialized');
  }

  async load(options: {
    url: string;
    title: string;
    artist: string;
    album?: string;
    coverUrl?: string;
  }): Promise<{ success: boolean }> {
    console.log('[SPlayerAudioWeb] Loading:', options);

    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
    }

    this.audio = new Audio(options.url);
    
    // 设置元数据（仅用于调试）
    this.audio.addEventListener('loadedmetadata', () => {
      console.log('[SPlayerAudioWeb] Metadata loaded:', {
        duration: this.audio?.duration,
      });
    });

    this.audio.addEventListener('ended', () => {
      this.notifyListeners('onStop', {});
    });

    return { success: true };
  }

  async play(): Promise<{ success: boolean; state: string }> {
    console.log('[SPlayerAudioWeb] Playing');
    
    if (!this.audio) {
      throw new Error('No audio loaded');
    }

    await this.audio.play();
    this.notifyListeners('onPlay', {});
    
    return { success: true, state: 'playing' };
  }

  async pause(): Promise<{ success: boolean; state: string }> {
    console.log('[SPlayerAudioWeb] Pausing');
    
    if (!this.audio) {
      throw new Error('No audio loaded');
    }

    this.audio.pause();
    this.notifyListeners('onPause', { position: this.audio.currentTime * 1000 });
    
    return { success: true, state: 'paused' };
  }

  async stop(): Promise<{ success: boolean }> {
    console.log('[SPlayerAudioWeb] Stopping');
    
    if (!this.audio) {
      throw new Error('No audio loaded');
    }

    this.audio.pause();
    this.audio.currentTime = 0;
    this.notifyListeners('onStop', {});
    
    return { success: true };
  }

  async seekTo(options: { position: number }): Promise<{ success: boolean }> {
    console.log('[SPlayerAudioWeb] Seeking to:', options.position);
    
    if (!this.audio) {
      throw new Error('No audio loaded');
    }

    this.audio.currentTime = options.position / 1000;
    this.notifyListeners('onSeekTo', { position: options.position });
    
    return { success: true };
  }

  async getPlayerState(): Promise<PlayerStateInfo> {
    if (!this.audio) {
      return {
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        bufferedPosition: 0,
        state: PlayerState.IDLE,
      };
    }

    let state: PlayerState = PlayerState.IDLE;
    
    if (this.audio.paused) {
      state = PlayerState.PAUSED;
    } else if (this.audio.ended) {
      state = PlayerState.ENDED;
    } else if (this.audio.readyState >= 3) {
      state = PlayerState.READY;
    } else {
      state = PlayerState.BUFFERING;
    }

    const buffered = this.audio.buffered.length > 0 
      ? this.audio.buffered.end(0) * 1000 
      : 0;

    return {
      isPlaying: !this.audio.paused && !this.audio.ended,
      currentTime: this.audio.currentTime * 1000,
      duration: this.audio.duration * 1000 || 0,
      bufferedPosition: buffered,
      state,
    };
  }

  async setPlaybackSpeed(options: { speed: number }): Promise<{ success: boolean }> {
    console.log('[SPlayerAudioWeb] Setting speed:', options.speed);
    
    if (!this.audio) {
      throw new Error('No audio loaded');
    }

    this.audio.playbackRate = options.speed;
    
    return { success: true };
  }

  async release(): Promise<{ success: boolean }> {
    console.log('[SPlayerAudioWeb] Releasing');
    
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    
    this.listeners.clear();
    
    return { success: true };
  }

  async addListener(
    eventName: 'onPlay' | 'onPause' | 'onStop' | 'onSeekTo' | 'onProgress',
    listenerFunc: (event: any) => void
  ): Promise<PluginListenerHandle> {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    
    this.listeners.get(eventName)!.add(listenerFunc);
    
    return {
      remove: async () => {
        this.listeners.get(eventName)?.delete(listenerFunc);
      },
    };
  }

  async removeAllListeners(): Promise<void> {
    this.listeners.clear();
  }

  private notifyListeners(eventName: string, data: any): void {
    const listeners = this.listeners.get(eventName);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(data);
        } catch (error) {
          console.error('[SPlayerAudioWeb] Listener error:', error);
        }
      });
    }
  }
}
