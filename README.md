# Duella Frontend

Bu proje, Expo ve React Native ile gelistirilen `Duella Quiz` mobil uygulamasinin frontend tarafidir.

## Gereksinimler

Projeyi yerelde calistirmak ve native build almak icin asagidaki araclarin kurulu olmasi gerekir:

- Node.js
- npm
- Xcode
- CocoaPods
- Android Studio
- Android SDK
- ADB

## Kurulum

Proje klasorunde bagimliliklari yuklemek icin:

```bash
npm install
```

## Gelistirme Sunucusunu Baslatma

Expo gelistirme sunucusunu baslatmak icin:

```bash
npm run start
```

Bu komut Metro bundler'i ayaga kaldirir.

## Yerel Build Alma

Bu projede EAS kullanilmadan yerel native build alinabilir.

Ilk kez native build alinacaksa ya da native klasorler yeniden olusturulacaksa:

```bash
npx expo prebuild --platform all
```

Bu komut:

- `ios/` klasorunu olusturur
- `android/` klasorunu olusturur
- native proje dosyalarini Expo config'e gore uretir

## Android Build Alma ve Baslatma

Android icin yerel debug build alip emulator veya cihaza kurmak icin:

```bash
npm run android
```

Bu komut su islemleri yapar:

- Android native projeyi derler
- debug APK uretir
- bagli cihaz veya acik emulator varsa uygulamayi kurar
- Metro bundler ile uygulamayi acar

Dogrudan komut olarak calistirmak istersen:

```bash
npx expo run:android
```

Debug APK genelde su konumda uretilir:

```bash
android/app/build/outputs/apk/debug/app-debug.apk
```

## iOS Build Alma ve Baslatma

iOS icin yerel simulator build almak icin:

```bash
npm run ios
```

veya belirli bir simulator secmek icin:

```bash
npx expo run:ios --device "iPhone 16 Pro"
```

Bu komut su islemleri yapar:

- gerekli ise CocoaPods kurulumunu yapar
- Xcode tarafinda app'i derler
- secilen simulator'a kurar
- uygulamayi acip Metro'ya baglar

Not:

- iOS build yalnizca macOS uzerinde alinabilir
- CocoaPods tarafinda ag erisimi gerekebilir
- Xcode ile acilacak dosya `ios/duellafrontend.xcworkspace` olmalidir

## Orbit ile Kullanım

Expo Orbit kullaniliyorsa:

- Android icin uretilen `apk` dosyasi Orbit ile acilabilir
- iOS simulator icin uretilen `.app` paketi simulator tarafinda calistirilabilir

Orbit build alan arac degil, uretilmis build'i kurup acan arac olarak dusunulmelidir.

## Sik Kullanilan Komutlar

```bash
npm install
npm run start
npm run android
npm run ios
npx expo prebuild --platform all
```

## Notlar

- Bu proje su anda Expo SDK 54 kullaniyor.
- Font yuklemeleri `expo-font` ile yapiliyor.
- Native klasorler olusturuldugu icin proje artik hem Expo hem de yerel native akisla calistirilabilir.
