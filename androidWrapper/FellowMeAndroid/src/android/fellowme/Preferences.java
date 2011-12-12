package android.fellowme;

import android.os.Bundle;
import android.preference.PreferenceActivity;

/**
 *
 * @author premysl.vyhnal
 */
public class Preferences extends PreferenceActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        addPreferencesFromResource(R.xml.preferences);
    }
}
