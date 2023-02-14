
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { WebView ,Linking } from 'react-native-webview';
import useUserInfo from '../../../../../../biz/useUserInfo';
import { getStorage } from '../../../../../../utils/asyncStorage';

import { isAppUrl, isBlank, openPGApp } from './lib';



const Payment = ({
  clientKey,
  payment,
  onWebViewMessageReceived,
  detectIsLoading,
  orderItems,
}) => {
  const [token ,setToken] = useState();
  const webviewRef = useRef();
  const WEBVIEW_SOURCE_HTML = `
      <html>
        <head>
          <meta http-equiv='content-type' content='text/html; charset=utf-8'>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'>
          <script src="https://js.tosspayments.com/v1"></script>
        </head>
        <body>    
                
          <script>
            var clientKey = '${clientKey}'
            var tossPayments = TossPayments(clientKey) // 클라이언트 키로 초기화하기
          </script> 
          
        </body>
      </html>
      `;
  const [urls ,setUrls] = useState({
    html: WEBVIEW_SOURCE_HTML,
  });
  useEffect(()=>{
    const getToken =async()=>{
      const token = await getStorage("token");
      setToken(JSON.parse(token).accessToken);
    }
    getToken();
  },[])
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <WebView
        ref={webviewRef}
        style={{
          flex: 1,
        }}
        source={urls}
        injectedJavaScript={`
          if(${orderItems.length > 0}){
            tossPayments.requestPayment('카드',${JSON.stringify(
              payment
            )}).catch(err => {              
              window.ReactNativeWebView.postMessage(JSON.stringify(err));  
            })
          }
        `}     
        onMessage={onWebViewMessageReceived}
        originWhitelist={['*']}
        sharedCookiesEnabled={true}
        onShouldStartLoadWithRequest={(request) => {
          const { url, mainDocumentURL } = request;
          if (isBlank(url, mainDocumentURL,orderItems,setUrls,token)) {
            detectIsLoading(true);
            return true;
          }
          detectIsLoading(false);

          if (isAppUrl(url)) {
            /* 3rd-party 앱 오픈 */
            openPGApp(url);

            return false;
          }
          return true;
        }}
      />
    </SafeAreaView>
  );
};

export default Payment;