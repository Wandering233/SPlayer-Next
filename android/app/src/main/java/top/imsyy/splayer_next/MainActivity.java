package top.imsyy.splayer_next;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;

import java.util.ArrayList;
import java.util.List;

import top.imsyy.splayer_next.plugins.SPlayerAudioPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        // 注册自定义插件
        List<Class<? extends Plugin>> additionalPlugins = new ArrayList<>();
        additionalPlugins.add(SPlayerAudioPlugin.class);
        registerPlugin(additionalPlugins);
    }
}
