Custom frameworks for iOS.

TNSMLKitCamera: Using this wrapper because of buffer issues. Sad.

TNSCrashlyticsLogger: Using this wrapper because CLS_LOG macro is not accessible from nativescript.

### Building TNSMLKitCamera framework
- Run the target for simulator and 'generic ios device' (disconnect any real device to be sure), make sure to not only build for the active architecture.
- Right-click the file in the Products folder and open in Finder.
- In a Terminal `cd` to that folder, move up to the `Products` folder.
- Run `lipo -create -output "TNSMLKitCamera" "Debug-iphonesimulator/TNSMLKitCamera.framework/TNSMLKitCamera" "Debug-iphoneos/TNSMLKitCamera.framework/TNSMLKitCamera"`.
- Use the resulting `TNSMLKitCamera` file instead of the one generated inside any of the targets.

### Building TNSCrashlyticsLogger framework
- Run `pod install`
- Run the target for simulator and 'generic ios device' (disconnect any real device to be sure), make sure to not only build for the active architecture.
- Right-click the file in the Products folder and open in Finder.
- In a Terminal `cd` to that folder, move up to the `Products` folder.
- Run `lipo -create -output "TNSCrashlyticsLogger" "Debug-iphonesimulator/TNSCrashlyticsLogger.framework/TNSCrashlyticsLogger" "Debug-iphoneos/TNSCrashlyticsLogger.framework/TNSCrashlyticsLogger"`.
- Use the resulting `TNSCrashlyticsLogger` file instead of the one generated inside any of the targets.
- Troubleshoot: In case you get `ld: framework not found Pods_TNSCrashlyticsLogger` when building in xcode, select `TNSCrashlyticsLogger` target then go to `Build Phases` -> `Link Binary With Libraries` and remove `Pods_TNSCrashlyticsLogger`
