package com.msdkproject;

import com.facebook.react.ReactActivity;
import android.content.ContextWrapper;
import android.system.Os;


public class MainActivity extends ReactActivity {

@Override
protected void onStart() {
    super.onStart();
    try {
        ContextWrapper c = new ContextWrapper(this);
        Os.setenv("EXTERNAL_STORAGE", c.getFilesDir().toString(), true);
    } catch (Exception e) {
        e.printStackTrace();
    }
}

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MsdkProject";
  }
}
