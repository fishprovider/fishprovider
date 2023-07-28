const IS_DEV = process.env.NODE_ENV === 'development';

const name = IS_DEV ? 'FishProvider (Dev)' : 'FishProvider';
const appId = IS_DEV ? 'com.fishprovider.app-dev' : 'com.fishprovider.app';

export default {
  expo: {
    name,
    description: 'Never Lose Money - Think Big Do Small',
    version: '5.0.0',
    slug: 'fishprovider',
    owner: 'fishprovider',
    scheme: 'fishprovider',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: [
      '**/*',
    ],
    ios: {
      bundleIdentifier: appId,
      googleServicesFile: './GoogleService-Info.plist',
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
      },
      entitlements: {
        'aps-environment': 'development',
        'com.apple.developer.applesignin': ['Default'],
      },
      supportsTablet: true,
    },
    android: {
      package: appId,
      googleServicesFile: './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-firebase/auth',
      '@react-native-google-signin/google-signin',
      'expo-apple-authentication',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
    ],
    extra: {
      eas: {
        projectId: 'ec0f4220-7564-4608-93a3-ac7aebf2c1ab',
      },
    },
  },
};
