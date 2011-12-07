package android.fellowme;

import android.content.Context;
import android.os.Build;
import android.os.Vibrator;
import android.provider.Settings.Secure;
import android.webkit.WebView;
import android.widget.Toast;

/**
 *
 * @author premysl.vyhnal
 */
class JSInterface {

    private Context context;
    private WebView view;
    private static Vibrator vibrator;

    /** Instantiate the interface and set the context */
    JSInterface(Context c, WebView v) {
        context = c;
        view = v;
        vibrator = (Vibrator) context.getSystemService(Context.VIBRATOR_SERVICE);
    }

    /** Show a toast from the web page */
    public void showToast(String toast) {
        Toast.makeText(context, toast, Toast.LENGTH_SHORT).show();
    }

    public String getModel() {
        return Build.MODEL;
    }

    public String getManufacturer() {
        return Build.MANUFACTURER;
    }

    public String getUUID() {
        return Secure.getString(context.getContentResolver(), Secure.ANDROID_ID);
    }

    public void vibrate(int milliseconds) {
        vibrator.vibrate(milliseconds);
    }
}
