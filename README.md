# EKIII Teacher Hub - Android (100% offline)

Your HTML app is bundled inside the APK at `app/src/main/assets/www/index.html`.
The app declares NO INTERNET permission, so it cannot go online.

## Build the APK (Android Studio)
1. Install Android Studio (Ladybug or newer) and open this folder (File > Open).
2. Let Gradle sync (needs internet ONCE to download build tools; the finished app does not).
3. Build > Build Bundle(s) / APK(s) > Build APK(s)
4. APK: app/build/outputs/apk/debug/app-debug.apk -> copy to phone and tap to install
   (allow "Install unknown apps" for your file manager).

For a release-style APK: Build > Generate Signed App Bundle / APK, and create a keystore.
KEEP that keystore: updates must be signed with the same key, or users must uninstall first
(which erases their data).

## Updating the app
Replace app/src/main/assets/www/index.html with your new file, raise versionCode in
app/build.gradle, rebuild. Data survives updates if package name and signing key are unchanged.

## Options
- MainActivity.BLOCK_SCREENSHOTS = true blocks screenshots/screen recording.
- Package/app name: app/build.gradle, AndroidManifest.xml, res/values/strings.xml.
