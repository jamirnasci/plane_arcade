import {
    AdMob,
    BannerAdSize,
    BannerAdPosition,
    BannerAdPluginEvents
} from '@capacitor-community/admob';

const BANNER_ID = 'ca-app-pub-2077187211919243/7962358910'
const BANNER_TEST = 'ca-app-pub-3940256099942544/9214589741'

const options = {
    adId: BANNER_TEST,
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
    // isTesting: true
    // npa: true
};

export async function banner() {
    AdMob.addListener(BannerAdPluginEvents.Loaded, () => {
        // Subscribe Banner Event Listener
    });

    AdMob.addListener(
        BannerAdPluginEvents.SizeChanged,
        (size) => {
            // Subscribe Change Banner Size
        },
    );

    AdMob.showBanner(options);
}