package com.hearme;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
import com.horcrux.svg.SvgPackage;
=======
import com.imagepicker.ImagePickerPackage;
>>>>>>> 694cc3560a8d2a8b37c2cb49b72fa8de071d51ab
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
            new SvgPackage(),
=======
            new ImagePickerPackage(),
>>>>>>> 694cc3560a8d2a8b37c2cb49b72fa8de071d51ab
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
