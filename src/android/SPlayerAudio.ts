/**
 * SPlayer Android 音频播放插件接口
 * 
 * 该模块提供与原生 Android 音频播放器的 TypeScript 接口
 * 用于在 Vue 前端中调用 ExoPlayer 播放功能
 */

import { registerPlugin } from '@capacitor/core';
import type { PluginListenerHandle } from '@capacitor/core';

/**
 * 播放器状态枚举
 */
export enum PlayerState {
  IDLE = 'idle',
  BUFFERING = 'buffering',
  READY = 'ready',
  ENDED = 'ended',
  PLAYING = 'playing',
  PAUSED = 'paused'
}

/**
 * 音频轨道信息
 */
export interface AudioTrack {
  id: string;
  url: string;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  duration?: number;
}

/**
 * 播放器状态信息
 */
export interface PlayerStateInfo {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  bufferedPosition: number;
  state: PlayerState;
}

/**
 * 播放事件数据
 */
export interface PlayEventData {
  trackId?: string;
  timestamp: number;
}

/**
 * 暂停事件数据
 */
export interface PauseEventData {
  position: number;
  timestamp: number;
}

/**
 * 进度更新事件数据
 */
export interface ProgressEventData {
  currentTime: number;
  duration: number;
  percent: number;
}

/**
 * SPlayerAudio 插件接口定义
 */
export interface SPlayerAudioPlugin {
  /**
   * 加载音频并准备播放
   * @param options 音频选项
   */
  load(options: {
    url: string;
    title: string;
    artist: string;
    album?: string;
    coverUrl?: string;
  }): Promise<{ success: boolean }>;

  /**
   * 开始/恢复播放
   */
  play(): Promise<{ success: boolean; state: string }>;

  /**
   * 暂停播放
   */
  pause(): Promise<{ success: boolean; state: string }>;

  /**
   * 停止播放
   */
  stop(): Promise<{ success: boolean }>;

  /**
   * 跳转到指定位置
   * @param options 跳转位置（毫秒）
   */
  seekTo(options: { position: number }): Promise<{ success: boolean }>;

  /**
   * 获取当前播放器状态
   */
  getPlayerState(): Promise<PlayerStateInfo>;

  /**
   * 设置播放速度
   * @param options 播放速度（0.5 - 2.0）
   */
  setPlaybackSpeed(options: { speed: number }): Promise<{ success: boolean }>;

  /**
   * 释放播放器资源
   */
  release(): Promise<{ success: boolean }>;

  /**
   * 监听播放事件
   * @param eventName 事件名称
   * @param listenerFunc 回调函数
   */
  addListener(
    eventName: 'onPlay' | 'onPause' | 'onStop' | 'onSeekTo' | 'onProgress',
    listenerFunc: (event: any) => void
  ): Promise<PluginListenerHandle>;

  /**
   * 移除所有监听器
   */
  removeAllListeners(): Promise<void>;
}

/**
 * 注册 SPlayerAudio 插件
 */
const SPlayerAudio = registerPlugin<SPlayerAudioPlugin>('SPlayerAudio', {
  web: () => import('./SPlayerAudioWeb').then(m => new m.SPlayerAudioWeb()),
});

export { SPlayerAudio };

/**
 * 辅助类：音频播放管理器
 */
export class AudioManager {
  private progressInterval: number | null = null;
  private progressCallback?: (data: ProgressEventData) => void;

  /**
   * 播放指定音频
   */
  async playTrack(track: AudioTrack): Promise<void> {
    await SPlayerAudio.load({
      url: track.url,
      title: track.title,
      artist: track.artist,
      album: track.album,
      coverUrl: track.coverUrl,
    });
    
    await SPlayerAudio.play();
    this.startProgressMonitoring();
  }

  /**
   * 暂停播放
   */
  async pause(): Promise<void> {
    await SPlayerAudio.pause();
    this.stopProgressMonitoring();
  }

  /**
   * 恢复播放
   */
  async resume(): Promise<void> {
    await SPlayerAudio.play();
    this.startProgressMonitoring();
  }

  /**
   * 停止播放
   */
  async stop(): Promise<void> {
    await SPlayerAudio.stop();
    this.stopProgressMonitoring();
  }

  /**
   * 跳转到指定位置
   */
  async seek(position: number): Promise<void> {
    await SPlayerAudio.seekTo({ position });
  }

  /**
   * 获取当前播放状态
   */
  async getState(): Promise<PlayerStateInfo> {
    return await SPlayerAudio.getPlayerState();
  }

  /**
   * 设置播放速度
   */
  async setSpeed(speed: number): Promise<void> {
    if (speed < 0.5 || speed > 2.0) {
      throw new Error('Speed must be between 0.5 and 2.0');
    }
    await SPlayerAudio.setPlaybackSpeed({ speed });
  }

  /**
   * 设置进度回调
   */
  onProgress(callback: (data: ProgressEventData) => void): void {
    this.progressCallback = callback;
  }

  /**
   * 启动进度监控
   */
  private startProgressMonitoring(): void {
    this.stopProgressMonitoring();
    
    this.progressInterval = window.setInterval(async () => {
      try {
        const state = await SPlayerAudio.getPlayerState();
        
        if (this.progressCallback && state.duration > 0) {
          this.progressCallback({
            currentTime: state.currentTime,
            duration: state.duration,
            percent: (state.currentTime / state.duration) * 100,
          });
        }
      } catch (error) {
        console.error('Error getting player state:', error);
      }
    }, 1000);
  }

  /**
   * 停止进度监控
   */
  private stopProgressMonitoring(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  /**
   * 清理资源
   */
  async dispose(): Promise<void> {
    this.stopProgressMonitoring();
    await SPlayerAudio.release();
  }
}

// 导出单例
export const audioManager = new AudioManager();
