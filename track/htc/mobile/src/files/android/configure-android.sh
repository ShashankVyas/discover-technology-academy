#!/bin/bash

echo "Configure MSDK application for Android"

templatesPath='node_modules/@evernym/react-native-white-label-app/files'

echo "1. Increasing the available JXN memory"
echo -e 'org.gradle.jvmargs=-Xmx4608m -XX:MaxPermSize=512m -XX:+HeapDumpOnOutOfMemoryError -Dfile.encoding=UTF-8\n' >> android/gradle.properties

echo "2. Updating minimum supported SDK version to ${minVersion}"
minVersion=23
sed -ri "s|minSdkVersion = [0-9]*|minSdkVersion = ${minVersion}|" android/build.gradle

echo "3. Adding the source repository for VCX library"
repository="
allprojects {
    repositories {
        maven {
            url 'https://evernym.mycloudrepo.io/public/repositories/libvcx-android'
        }
        maven {
            url 'https://evernym.mycloudrepo.io/public/repositories/evernym'
        }
        maven { url 'http://mobile-sdk.jumio.com' }
    }
}"
cat <<EOT >> android/build.gradle
$repository
EOT

echo "4. Setting up packaging options"
packagingOptions="
android {
   packagingOptions{
       pickFirst 'lib/armeabi-v7a/libc++_shared.so'
       pickFirst 'lib/arm64-v8a/libc++_shared.so'
       pickFirst 'lib/x86_64/libc++_shared.so'
       pickFirst 'lib/x86/libc++_shared.so'

       if (enableHermes) {
           exclude '**/libjsc*.so'
       }
   }
}
"
cat <<EOT >> android/app/build.gradle
$packagingOptions
EOT

echo "5. Setting default configuration for react-native-camera"
reactNativeCameraStrategy="
android {
    defaultConfig {
        missingDimensionStrategy 'react-native-camera', 'general'
    }
}
"
cat <<EOT >> android/app/build.gradle
$reactNativeCameraStrategy
EOT

echo "6. Updating AndroidManifest.xml to grant permissions and specify dependencies"
currentManifestPath="android/app/src/main/AndroidManifest.xml"
targetManifestPath="${templatesPath}/android/AndroidManifest.xml"

packageName=$(grep -Eo 'package="(.*)"' ${currentManifestPath}  | cut -f2 -d '"')
placeholderName=$(grep -Eo 'package="(.*)"' ${targetManifestPath}  | cut -f2 -d '"')

cp -R ${targetManifestPath} ${currentManifestPath}
sed -i "s/${placeholderName}/${packageName}/g" ${currentManifestPath}

echo "7. Copy required files"
currentManifestPath="android/app/src/main/res/xml/"
targetManifestPath="${templatesPath}/android/file_viewer_provider_paths.xml"

mkdir ${currentManifestPath}
cp -R ${targetManifestPath} ${currentManifestPath}

echo "8. Updating MainActivity to specify storage directory"
filepath=$(find android/app/src/main/java  -path \*/MainActivity.java)

imports='\
import android.content.ContextWrapper;\
import android.system.Os;\
'
sed -i "/^package/a ${imports}" ${filepath}

method='\
    @Override \
    protected void onStart() { \
        super.onStart(); \
        try { \
            ContextWrapper c = new ContextWrapper(this); \
            Os.setenv("EXTERNAL_STORAGE", c.getFilesDir().toString(), true); \
        } catch (Exception e) { \
            e.printStackTrace(); \
        } \
    } \
    '
sed -i "/.*MainActivity.*/a ${method}" ${filepath}

echo "9. Add blacklist to gradle.properties"
blacklist="
android.jetifier.blacklist=bcprov
"
cat <<EOT >> android/gradle.properties
$blacklist
EOT

echo "10. Add kotlin dependence"
dependencies="
dependencies {
    implementation \"org.jetbrains.kotlin:kotlin-stdlib:1.4.20\"
}
"
cat <<EOT >> android/app/build.gradle
$dependencies
EOT
sed -i "s/classpath 'com.android.tools.build:gradle:[0-9]\.[0-9]\.[0-9]'/classpath 'com.android.tools.build:gradle:4.2.1'\n\t\tclasspath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.20'/g" android/build.gradle
sed -i "s/classpath(\"com.android.tools.build:gradle:[0-9]\.[0-9]\.[0-9]\")/classpath(\"com.android.tools.build:gradle:4.2.1\")\n\t\tclasspath 'org.jetbrains.kotlin:kotlin-gradle-plugin:1.4.20'/g" android/build.gradle

echo "11. Apply fonts"
fonts="
apply from: \"../../node_modules/react-native-vector-icons/fonts.gradle\"
"
cat <<EOT >> android/app/build.gradle
$fonts
EOT

echo "Completed!"
