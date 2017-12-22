package com.rusmigal.vlcplayer;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.UiThreadUtil;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;


public class VLCPlayerModule extends ReactContextBaseJavaModule {
    private static final String TAG = "VLCPlayerModule";


    public VLCPlayerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "VLCPlayerModule";
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        return Collections.unmodifiableMap(new HashMap<String, Object>() {
            {
            }
        });
    }

    @ReactMethod
    public void releaseView() {
        VLCPlayerViewManager.getInstance().vlcView.releasePlayer();
    }
}