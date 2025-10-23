import {
  AdMob,
  InterstitialAdPluginEvents,
} from '@capacitor-community/admob';

const INTERSTITIAL_TEST = 'ca-app-pub-3940256099942544/1033173712'
const INTERSTITIAL_ID = ''

export async function interstitial() {
  AdMob.addListener(InterstitialAdPluginEvents.Loaded, (info) => {
    // Subscribe prepared interstitial
  });

  const options = {
    adId: INTERSTITIAL_TEST,
    // isTesting: true
    // npa: true
    // immersiveMode: true
  };
  await AdMob.prepareInterstitial(options);
  await AdMob.showInterstitial();
}