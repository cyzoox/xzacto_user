package com.xzct_cshr;

import android.os.Bundle;

import com.blitzapp.animatedsplash.animation.AddImageView;
import com.blitzapp.animatedsplash.animation.GroupAnimation;
import com.facebook.react.ReactActivity;

import static com.blitzapp.animatedsplash.animation.Splash.SPLASHSLIDELEFT;
import static com.blitzapp.animatedsplash.animation.Splash.ROTATE;
import static com.blitzapp.animatedsplash.animation.Splash.SCALE;
import static com.blitzapp.animatedsplash.animation.Splash.SLIDE;
import static com.blitzapp.animatedsplash.animation.Splash.createSplashView;
import static com.blitzapp.animatedsplash.animation.Splash.performSingleAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.screenHeight;
import static com.blitzapp.animatedsplash.animation.Splash.screenWidth;
import static com.blitzapp.animatedsplash.animation.Splash.setBackgroundImage;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideAnimation;
import static com.blitzapp.animatedsplash.animation.Splash.setSplashHideDelay;
import static com.blitzapp.animatedsplash.animation.Splash.splashShow;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "xzct_cshr";
  }

    public void onCreate(Bundle saved) {
       super.onCreate(saved);
       initiateSplash();
   }

   public void initiateSplash() {
        //Create dialog
        createSplashView(MainActivity.this);

        setBackgroundImage(R.drawable.splashbg);
        setSplashHideAnimation(SPLASHSLIDELEFT);

        setSplashHideDelay(1500);

        // Create and add images to view
        AddImageView headerimage = new AddImageView(R.drawable.header, screenHeight * 0.15, screenWidth, 0, 0, AddImageView.FIT_XY, false);
        AddImageView footerimage = new AddImageView(R.drawable.footer, screenHeight * 0.15, screenWidth, 0, screenHeight - screenHeight * 0.15, AddImageView.FIT_XY, false);
        AddImageView logoimage = new AddImageView(R.drawable.logo, screenHeight * 0.24, screenWidth * 0.4, AddImageView.getCenterX(screenWidth * 0.41), AddImageView.getCenterY(screenHeight * 0.26), AddImageView.FIT_XY, false);


        GroupAnimation group1 = new GroupAnimation();
        group1.performGroupAnimation(headerimage, SLIDE, 780, 0f, 0f, -screenHeight * 0.15f, 0f);
        group1.performGroupAnimation(footerimage, SLIDE, 780, 0f, 0f, screenHeight * 0.15f, 0f);
        performSingleAnimation(logoimage, SCALE, 780, 0.2f, 1f, 0.2f, 1f);

        splashShow();

    }
}

