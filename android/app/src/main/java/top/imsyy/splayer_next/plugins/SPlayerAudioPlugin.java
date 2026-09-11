package top.imsyy.splayer_next.plugins;

import android.app.PendingIntent;
import android.content.Intent;
import android.net.Uri;
import android.support.v4.media.MediaMetadataCompat;
import android.support.v4.media.session.MediaSessionCompat;
import android.support.v4.media.session.PlaybackStateCompat;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;
import com.google.android.exoplayer2.Player;
import com.google.android.exoplayer2.audio.AudioAttributes;

/**
 * SPlayer 音频播放插件
 * 基于 ExoPlayer 实现音乐播放功能
 */
@CapacitorPlugin(name = "SPlayerAudio")
public class SPlayerAudioPlugin extends Plugin {
    
    private static final String TAG = "SPlayerAudio";
    
    private ExoPlayer player;
    private MediaSessionCompat mediaSession;
    private boolean isInitialized = false;
    
    @Override
    public void load() {
        super.load();
        initializePlayer();
    }
    
    /**
     * 初始化播放器
     */
    private void initializePlayer() {
        if (isInitialized) {
            return;
        }
        
        try {
            // 配置音频属性
            AudioAttributes audioAttributes = new AudioAttributes.Builder()
                .setUsage(androidx.media3.common.C.USAGE_MEDIA)
                .setContentType(androidx.media3.common.C.AUDIO_CONTENT_TYPE_MUSIC)
                .build();
            
            // 创建 ExoPlayer 实例
            player = new ExoPlayer.Builder(getContext())
                .setAudioAttributes(audioAttributes, true)
                .setHandleAudioBecomingNoisy(true)
                .build();
            
            // 创建 MediaSession
            mediaSession = new MediaSessionCompat(getContext(), "SPlayer");
            mediaSession.setCallback(new MediaSessionCallback());
            
            isInitialized = true;
            Log.i(TAG, "Player initialized successfully");
        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize player", e);
        }
    }
    
    /**
     * 加载音频并准备播放
     * @param call 包含 url, title, artist, album, coverUrl 等参数
     */
    @PluginMethod
    public void load(PluginCall call) {
        try {
            String url = call.getString("url");
            String title = call.getString("title", "");
            String artist = call.getString("artist", "");
            String album = call.getString("album", "");
            String coverUrl = call.getString("coverUrl", "");
            
            if (url == null || url.isEmpty()) {
                call.reject("URL is required");
                return;
            }
            
            ensurePlayerInitialized();
            
            // 创建媒体项
            MediaItem mediaItem = new MediaItem.Builder()
                .setUri(Uri.parse(url))
                .setMediaMetadata(new androidx.media3.common.MediaMetadata.Builder()
                    .setTitle(title)
                    .setArtist(artist)
                    .setAlbumTitle(album)
                    .build())
                .build();
            
            // 设置媒体项并准备
            player.setMediaItem(mediaItem);
            player.prepare();
            
            // 更新 MediaSession 元数据
            updateMediaMetadata(title, artist, album, coverUrl);
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error loading media", e);
            call.reject("Failed to load media: " + e.getMessage());
        }
    }
    
    /**
     * 开始/恢复播放
     */
    @PluginMethod
    public void play(PluginCall call) {
        try {
            ensurePlayerInitialized();
            player.play();
            
            JSObject result = new JSObject();
            result.put("success", true);
            result.put("state", "playing");
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error playing", e);
            call.reject("Failed to play: " + e.getMessage());
        }
    }
    
    /**
     * 暂停播放
     */
    @PluginMethod
    public void pause(PluginCall call) {
        try {
            ensurePlayerInitialized();
            player.pause();
            
            JSObject result = new JSObject();
            result.put("success", true);
            result.put("state", "paused");
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error pausing", e);
            call.reject("Failed to pause: " + e.getMessage());
        }
    }
    
    /**
     * 停止播放
     */
    @PluginMethod
    public void stop(PluginCall call) {
        try {
            ensurePlayerInitialized();
            player.stop();
            player.clearMediaItems();
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error stopping", e);
            call.reject("Failed to stop: " + e.getMessage());
        }
    }
    
    /**
     * 跳转到指定位置（毫秒）
     */
    @PluginMethod
    public void seekTo(PluginCall call) {
        try {
            Integer position = call.getInt("position");
            if (position == null) {
                call.reject("Position is required");
                return;
            }
            
            ensurePlayerInitialized();
            player.seekTo(position);
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error seeking", e);
            call.reject("Failed to seek: " + e.getMessage());
        }
    }
    
    /**
     * 获取当前播放状态
     */
    @PluginMethod
    public void getPlayerState(PluginCall call) {
        try {
            ensurePlayerInitialized();
            
            JSObject result = new JSObject();
            result.put("isPlaying", player.isPlaying());
            result.put("currentTime", player.getCurrentPosition());
            result.put("duration", player.getDuration());
            result.put("bufferedPosition", player.getBufferedPosition());
            
            switch (player.getPlaybackState()) {
                case Player.STATE_IDLE:
                    result.put("state", "idle");
                    break;
                case Player.STATE_BUFFERING:
                    result.put("state", "buffering");
                    break;
                case Player.STATE_READY:
                    result.put("state", "ready");
                    break;
                case Player.STATE_ENDED:
                    result.put("state", "ended");
                    break;
            }
            
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error getting player state", e);
            call.reject("Failed to get player state: " + e.getMessage());
        }
    }
    
    /**
     * 设置播放速度
     */
    @PluginMethod
    public void setPlaybackSpeed(PluginCall call) {
        try {
            Float speed = call.getFloat("speed");
            if (speed == null || speed <= 0) {
                call.reject("Valid speed is required");
                return;
            }
            
            ensurePlayerInitialized();
            player.setPlaybackSpeed(speed);
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error setting playback speed", e);
            call.reject("Failed to set playback speed: " + e.getMessage());
        }
    }
    
    /**
     * 释放播放器资源
     */
    @PluginMethod
    public void release(PluginCall call) {
        try {
            if (player != null) {
                player.release();
                player = null;
            }
            if (mediaSession != null) {
                mediaSession.release();
                mediaSession = null;
            }
            isInitialized = false;
            
            JSObject result = new JSObject();
            result.put("success", true);
            call.resolve(result);
            
        } catch (Exception e) {
            Log.e(TAG, "Error releasing", e);
            call.reject("Failed to release: " + e.getMessage());
        }
    }
    
    /**
     * 更新媒体元数据
     */
    private void updateMediaMetadata(String title, String artist, String album, String coverUrl) {
        if (mediaSession == null) {
            return;
        }
        
        MediaMetadataCompat metadata = new MediaMetadataCompat.Builder()
            .putString(MediaMetadataCompat.METADATA_KEY_TITLE, title)
            .putString(MediaMetadataCompat.METADATA_KEY_ARTIST, artist)
            .putString(MediaMetadataCompat.METADATA_KEY_ALBUM, album)
            .build();
        
        mediaSession.setMetadata(metadata);
    }
    
    /**
     * 确保播放器已初始化
     */
    private void ensurePlayerInitialized() {
        if (!isInitialized || player == null) {
            initializePlayer();
        }
    }
    
    /**
     * MediaSession 回调处理
     */
    private class MediaSessionCallback extends MediaSessionCompat.Callback {
        @Override
        public void onPlay() {
            notifyListeners("onPlay", new JSObject());
        }
        
        @Override
        public void onPause() {
            notifyListeners("onPause", new JSObject());
        }
        
        @Override
        public void onStop() {
            notifyListeners("onStop", new JSObject());
        }
        
        @Override
        public void onSeekTo(long pos) {
            JSObject data = new JSObject();
            data.put("position", pos);
            notifyListeners("onSeekTo", data);
        }
    }
    
    /**
     * 通知监听器
     */
    private void notifyListeners(String event, JSObject data) {
        bridge.getActivity().runOnUiThread(() -> {
            notifyListeners(event, data);
        });
    }
}
