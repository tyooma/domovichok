package com.domovichoknew;

import com.facebook.react.ReactActivity;

import android.os.Bundle;

import android.content.res.Configuration;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */



  @Override
  protected String getMainComponentName() {
//    switch (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) {
//      case Configuration.UI_MODE_NIGHT_YES:
//        setTheme(R.style.DarkTheme);
//
//        break;
//      case Configuration.UI_MODE_NIGHT_NO:
//        setTheme(R.style.LightTheme);
//        break;
//      default:
//        setTheme(R.style.LightTheme);
//    }

    SplashScreen.show(this);
    return "DomovichokNew";
  }  
}
