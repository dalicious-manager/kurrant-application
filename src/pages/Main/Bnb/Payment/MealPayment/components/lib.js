import {Linking, Platform} from 'react-native';
import WebView from 'react-native-webview';

import {
  ANDROID_APPSCHEME,
  ANDROID_MARKET_PREFIX,
  ANDROID_PACKAGE,
  IOS_MARKET_PREFIX,
} from './constant';
import {getStorage} from '../../../../../../utils/asyncStorage';

export function getMarketUrl(url, scheme, packageName) {
  if (Platform.OS === 'ios') {
    switch (scheme) {
      case 'kftc-bankpay': // 뱅크페이
        return IOS_MARKET_PREFIX + 'id398456030';
      case 'ispmobile': // ISP/페이북
        return IOS_MARKET_PREFIX + 'id369125087';
      case 'hdcardappcardansimclick': // 현대카드 앱카드
        return IOS_MARKET_PREFIX + 'id702653088';
      case 'shinhan-sr-ansimclick': // 신한 앱카드
        return IOS_MARKET_PREFIX + 'id572462317';
      case 'kb-acp': // KB국민 앱카드
        return IOS_MARKET_PREFIX + 'id695436326';
      case 'mpocket.online.ansimclick': // 삼성앱카드
        return IOS_MARKET_PREFIX + 'id535125356';
      case 'lottesmartpay': // 롯데 모바일결제
        return IOS_MARKET_PREFIX + 'id668497947';
      case 'lotteappcard': // 롯데 앱카드
        return IOS_MARKET_PREFIX + 'id688047200';
      case 'cloudpay': // 하나1Q페이(앱카드)
        return IOS_MARKET_PREFIX + 'id847268987';
      case 'citimobileapp': // 시티은행 앱카드
        return IOS_MARKET_PREFIX + 'id1179759666';
      case 'payco': // 페이코
        return IOS_MARKET_PREFIX + 'id924292102';
      case 'kakaotalk': // 카카오톡
        return IOS_MARKET_PREFIX + 'id362057947';
      case 'lpayapp': // 롯데 L.pay
        return IOS_MARKET_PREFIX + 'id1036098908';
      case 'wooripay': // 우리페이
        return IOS_MARKET_PREFIX + 'id1201113419';
      case 'com.wooricard.wcard': // 우리WON카드
        return IOS_MARKET_PREFIX + 'id1499598869';
      case 'nhallonepayansimclick': // NH농협카드 올원페이(앱카드)
        return IOS_MARKET_PREFIX + 'id1177889176';
      case 'hanawalletmembers': // 하나카드(하나멤버스 월렛)
        return IOS_MARKET_PREFIX + 'id1038288833';
      case 'shinsegaeeasypayment': // 신세계 SSGPAY
        return IOS_MARKET_PREFIX + 'id666237916';
      case 'naversearchthirdlogin': // 네이버페이 앱 로그인
        return IOS_MARKET_PREFIX + 'id393499958';
      case 'lguthepay-xpay': // 페이나우
        return IOS_MARKET_PREFIX + 'id760098906';
      case 'lmslpay': // 롯데 L.POINT
        return IOS_MARKET_PREFIX + 'id473250588';
      case 'liivbank': // Liiv 국민
        return IOS_MARKET_PREFIX + 'id1126232922';
      case 'supertoss': // 토스
        return IOS_MARKET_PREFIX + 'id839333328';
      case 'newsmartpib': // 우리WON뱅킹
        return IOS_MARKET_PREFIX + 'id1470181651';
      case 'ukbanksmartbanknonloginpay': // 케이뱅크 페이
        return IOS_MARKET_PREFIX + 'id1178872627';
      default:
        return url;
    }
  } else if (Platform.OS === 'android') {
    if (packageName != null) {
      return ANDROID_MARKET_PREFIX + packageName;
    }
    switch (scheme) {
      case ANDROID_APPSCHEME.ISP:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_ISP;
      case ANDROID_APPSCHEME.BANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_BANKPAY;
      case ANDROID_APPSCHEME.KB_BANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KB_BANKPAY;
      case ANDROID_APPSCHEME.NH_BANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_NH_BANKPAY;
      case ANDROID_APPSCHEME.MG_BANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_MG_BANKPAY;
      case ANDROID_APPSCHEME.KN_BANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KN_BANKPAY;
      case ANDROID_APPSCHEME.KAKAOPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KAKAOPAY;
      case ANDROID_APPSCHEME.SMILEPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_SMILEPAY;
      case ANDROID_APPSCHEME.CHAIPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_CHAIPAY;
      case ANDROID_APPSCHEME.PAYCO:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_PAYCO;
      case ANDROID_APPSCHEME.HYUNDAICARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_HYUNDAICARD;
      case ANDROID_APPSCHEME.TOSS:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_TOSS;
      case ANDROID_APPSCHEME.SHINHANCARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_SHINHANCARD;
      case ANDROID_APPSCHEME.HANACARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_HANACARD;
      case ANDROID_APPSCHEME.SAMSUNGCARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_SAMSUNGCARD;
      case ANDROID_APPSCHEME.KBCARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KBCARD;
      case ANDROID_APPSCHEME.NHCARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_NHCARD;
      case ANDROID_APPSCHEME.CITICARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_CITICARD;
      case ANDROID_APPSCHEME.LOTTECARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_LOTTECARD;
      case ANDROID_APPSCHEME.LPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_LPAY;
      case ANDROID_APPSCHEME.SSGPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_SSGPAY;
      case ANDROID_APPSCHEME.KPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KPAY;
      case ANDROID_APPSCHEME.KBANKPAY:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KBANKPAY;
      case ANDROID_APPSCHEME.PAYNOW:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_PAYNOW;
      case ANDROID_APPSCHEME.WOORIWONCARD:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_WOORIWONCARD;
      case ANDROID_APPSCHEME.LPOINT:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_LPOINT;
      case ANDROID_APPSCHEME.KTFAUTH:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_KTFAUTH;
      case ANDROID_APPSCHEME.LGTAUTH:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_LGTAUTH;
      case ANDROID_APPSCHEME.SKTAUTH:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_SKTAUTH;
      case ANDROID_APPSCHEME.WOORIWONBANK:
        return ANDROID_MARKET_PREFIX + ANDROID_PACKAGE.PACKAGE_WOORIWONBANK;
      default:
        return url;
    }
  } else {
    return url;
  }
}

export function isAppUrl(scheme) {
  // console.log(scheme);
  return !(
    scheme.startsWith('https://') ||
    scheme.startsWith('http://') ||
    scheme.startsWith('about:blank')
  );
}

export function isBlank(url, mainDocumentUrl, orderItems, setUrls, token) {
  if (url.includes('3.35.197.186/admin')) {
    const reqUrl =
      url + `&token=${token}&orderItems=${JSON.stringify(orderItems)}`;
    setUrls({uri: reqUrl});
    return (
      reqUrl.startsWith('about:blank') &&
      mainDocumentUrl &&
      mainDocumentUrl.startsWith('about:blank')
    );
  }
  if (url.includes('admin.dalicious.co')) {
    if (!url.includes('orderItems')) {
      const reqUrl = url + `&orderItems=${orderItems}&token=${token}`;
      console.log(reqUrl, 'testset');
      setUrls({uri: reqUrl});
      return (
        reqUrl.startsWith('about:blank') &&
        mainDocumentUrl &&
        mainDocumentUrl.startsWith('about:blank')
      );
    }
  }
  return (
    url.startsWith('about:blank') &&
    mainDocumentUrl &&
    mainDocumentUrl.startsWith('about:blank')
  );
}

export async function openPGApp(url) {
  console.log(url);
  let splittedUrl = url?.replace('://', ' ').split(' ');
  let scheme = splittedUrl[0];

  if (scheme === undefined) {
    return;
  }

  if (Platform.OS === 'ios') {
    try {
      await Linking.openURL(url);
    } catch (error) {
      await Linking.openURL(getMarketUrl(url, scheme, ''));
    }
  } else if (Platform.OS === 'android') {
    let packageName = '';
    let intentUrl = splittedUrl[1].split('#Intent;');
    let host = intentUrl[0];
    let args = intentUrl[1].split(';');
    let path = '';
    if (scheme !== 'intent') {
      scheme = scheme.split(':')[1];
      path = scheme + '://' + host;
    }
    args.forEach(s => {
      if (s.startsWith('scheme')) {
        let scheme = s.split('=')[1];
        path = scheme + '://' + host;
      } else if (s.startsWith('package')) {
        const packagee = s.split('=')[1];

        packageName = packagee;
      }
    });

    try {
      await Linking.openURL(path);
    } catch (error) {
      await Linking.openURL(getMarketUrl(url, scheme, packageName));
    }
  }
}
