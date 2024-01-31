import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  API_ID,
} from "react-native-dotenv";
export default {
  expo: {
    name: "AppAccommodation",
    slug: "AppAccommodation",
    version: "1.0.0",
    assetBundlePatterns: ["**/*"],
    android: {
      package: "com.minhtam78945.AppAccommodation",
    },
    extra: {
      eas: {
        projectId: "a3145b2f-19c6-4119-bcff-7d0998809891",
      },
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./src/assets/fonts/Poppins-Medium.ttf",
            "./src/assets/fonts/Poppins-Bold.ttf",
            "./src/assets/fonts/Poppins-Italic.ttf",
            "./src/assets/fonts/Poppins-Regular.ttf",
            "./src/assets/fonts/Poppins-ExtraBold.ttf",
          ],
        },
      ],
    ],
    extra: {
      apiKey: API_KEY,
      authDomain: AUTH_DOMAIN,
      projectId: PROJECT_ID,
      storageBucket: STORAGE_BUCKET,
      messagingSenderId: MESSAGING_SENDER_ID,
      appId: API_ID,
    },
  },
  name: "AppAccommodation",
};
