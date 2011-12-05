package android.fellowme;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.util.Log;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

/**
 *
 * @author premysl.vyhnal - od Petra Polaka
 */
public class MainActivity extends Activity implements SharedPreferences.OnSharedPreferenceChangeListener {

    private SharedPreferences preferences;
    private ProgressDialog progressDialog;
    //static final int DIALOG_LOAD_ERROR = 0;

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        getWebView().saveState(outState);
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        requestWindowFeature(Window.FEATURE_INDETERMINATE_PROGRESS);

        setContentView(R.layout.main);

        PreferenceManager.setDefaultValues(this, R.xml.preferences, false);

        preferences = PreferenceManager.getDefaultSharedPreferences(getBaseContext());
        preferences.registerOnSharedPreferenceChangeListener(this);

        //resolveIntent(getIntent());

        progressDialog = new ProgressDialog(this);
        progressDialog.setCancelable(true);
        progressDialog.setCanceledOnTouchOutside(true);
        progressDialog.setMessage("Please wait...");

        WebView w = getWebView();

        w.getSettings().setBuiltInZoomControls(false);
        w.getSettings().setSupportZoom(false);
        w.getSettings().setAllowFileAccess(true);
        w.getSettings().setPluginsEnabled(true);
        w.getSettings().setSupportMultipleWindows(false);
        w.getSettings().setJavaScriptEnabled(true);
        w.setWebViewClient(new WebViewClientImpl());
        w.setWebChromeClient(new WebChromeClientImpl());
        //w.setWebViewClient(new WebViewClient());

        w.addJavascriptInterface(new JSInterface(this, getWebView()), "Device");

        if (savedInstanceState != null) {
            getWebView().restoreState(savedInstanceState);
        } else {
            start();
        }

        //appView.getSettings().setCacheMode(WebSettings.LOAD_NO_CACHE);

    }

    public void onSharedPreferenceChanged(SharedPreferences sp, String string) {
        start();
    }

    private void start() {

        String startUrl = preferences.getString("start_url", "");

        if (startUrl.length() == 0) {
            startUrl = getString(R.string.starturl); // wrong url will result in calling onReceivedError();
            preferences.edit().putString("start_url", startUrl).commit();
        }

        loadUrl(startUrl);
    }

    public void loadUrl(String url) {
        try {
            Log.i("LOAD", url);
//            super.loadUrl("file:///android_asset/www/index.html#" + url);
            getWebView().loadUrl(url);
        } catch (Exception e) {
            Log.e("LOAD", e.toString());
            onReceivedError(-1, "exception while loading " + url, url);
        }
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }


    public void onReceivedError(int errorCode, String description, String failingUrl) {
        Log.i("RCVDERR", "Errorcode: " + errorCode + ";Desc: " + description + ";Url:" + failingUrl);
        //showDialog(DIALOG_LOAD_ERROR);
        startActivity(new Intent(getBaseContext(), Preferences.class));
    }


    /* MENU *
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
    Log.d("KEYDOWN", keyCode + "");
    if (keyCode == KeyEvent.KEYCODE_MENU) {
    return false;
    }
    return super.onKeyDown(keyCode, event);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
    MenuInflater inflater = getMenuInflater();
    inflater.inflate(R.menu.mainmenu, menu);
    return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
    // Handle item selection
    switch (item.getItemId()) {
    case R.id.preferences:
    startActivity(new Intent(getBaseContext(), Preferences.class));
    return true;
    case R.id.refresh:
    getWebView().reload();
    return true;
    default:
    return super.onOptionsItemSelected(item);
    }
    }

     *
     */
    private WebView getWebView() {
        return (WebView) findViewById(R.id.web);
    }

    private void progressStart() {
        setProgressBarIndeterminateVisibility(true);

        //progressDialog.show();
//        getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_START);
        //getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_INDETERMINATE_ON);

    }

    private void progressStop() {
        setProgressBarIndeterminateVisibility(false);
        //progressDialog.dismiss();
//        getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_END);
        //getWindow().setFeatureInt(Window.FEATURE_PROGRESS, Window.PROGRESS_INDETERMINATE_ON);

    }

    private class WebChromeClientImpl extends WebChromeClient {

        private String TAG = "WEBCCL";

        @Override
        public boolean onConsoleMessage(ConsoleMessage cm) {
            Log.d(TAG, cm.message() + " -- From line "
                    + cm.lineNumber() + " of "
                    + cm.sourceId());
            return true;
        }

        @Override
        public void onReceivedTitle(WebView view, String title) {
            super.onReceivedTitle(view, title);
            setTitle(title);
        }
    }

    private class WebViewClientImpl extends WebViewClient {

        private String TAG = "WEBVCL";

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String url) {
            view.loadUrl(url);
            return true;
        }

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
            Log.w(TAG, "Error received:" + errorCode + "," + description);
            super.onReceivedError(view, errorCode, description, failingUrl);
            Toast.makeText(view.getContext(), description, 5000);
            progressStop();
            //alert();
        }

        @Override
        public void onPageFinished(WebView view, String url) {
            Log.w(TAG, "onPageFinished:" + view.getProgress());
            progressStop();
            super.onPageFinished(view, url);
            //setTitle(getWebView().getTitle());
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            Log.d(TAG, "Going to load " + url);
            progressStart();
            super.onPageStarted(view, url, favicon);
        }
        /*
        @Override
        public void onLoadResource(WebView view, String url) {
        Log.d(TAG", "Going to load resource " + url);
        progressStart();
        super.onLoadResource(view, url);
        }
         *
         */
    }
}
