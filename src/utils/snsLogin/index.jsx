import { appleAuth,appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import Clipboard from '@react-native-clipboard/clipboard';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

import useAuth from '../../biz/useAuth';
import { SCREEN_NAME } from '../../screens/Main/Bnb';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'
const nonce = uuid();


const naverData = ()=>{
    const data = {
        consumerKey : 'P2W9Zz6uKFyGPmuUfChT',
        consumerSecret : 'ac256jv8OZ',
        appName :'kurrant',
    }
    if(Platform.OS  === 'ios'){
      return{
        ...data,
        serviceUrlScheme : 'kurrant-naver',
      }
    }
    return data;
  }
export default () => {
    const {snsLogin} =useAuth();
    const navigation = useNavigation();
    const naverLogin = async () => {
        console.log('로그인')
        const {successResponse} = await NaverLogin.login(naverData());
        if(successResponse){
            // console.log(successResponse)
            // Clipboard.setString(successResponse.accessToken)
            // const data = await NaverLogin.getProfile(successResponse.accessToken);
            // console.log(data);
            await snsLogin({
                snsAccessToken:successResponse.accessToken,
                autoLogin:true,
            },'NAVER');
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN_NAME,
                },
              ],
            })
        }
      };
    
      const googleLogin = async ()=>{
        try {
          // Get the users ID token
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          // Get the users ID token
          const { idToken ,scopes} = await GoogleSignin.signIn();
        
          // Create a Google credential with the token
          
          const {accessToken} =await GoogleSignin.getTokens();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          console.log(scopes);
          console.log(accessToken);
          Clipboard.setString(accessToken)
          // Sign-in the user with the credential
          await auth().signInWithCredential(googleCredential);
          await snsLogin({
            snsAccessToken:accessToken,
            autoLogin:true,
          },'GOOGLE');
          navigation.reset({
            index: 0,
            routes: [
              {
                name: SCREEN_NAME,
              },
            ],
          })
        } catch (error) {
          console.log("err",error.toString());
        }
        
      }
      const appleLogin  = async() =>{
        try {
        // Start the sign-in request
        if(Platform.OS === "android"){
          const {id_token} = await appleAuthAndroid.signIn();
          console.log(id_token);
          await snsLogin({
            snsAccessToken:id_token,
            autoLogin:true,
          },'APPLE');
          avigation.reset({
            index: 0,
            routes: [
              {
                name: SCREEN_NAME,
              },
            ],
          })
        }else{
            const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });


            // // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
              throw new Error('Apple Sign-In failed - no identify token returned');
            }
          

            // // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            console.log(identityToken)
            Clipboard.setString(identityToken)

            await snsLogin({
                snsAccessToken:identityToken,
                autoLogin:true,
            },'APPLE');
            avigation.reset({
              index: 0,
              routes: [
                {
                  name: SCREEN_NAME,
                },
              ],
            })
          }
          } catch (error) {
            console.log("err",error.toString());
          }
        // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        // // Sign the user in with the credential
        // return auth().signInWithCredential(appleCredential);
      }
    
      const kakaoLogin = async () => {
        const token = await login();
        Clipboard.setString(token.accessToken);
        console.log(token.accessToken)
        await snsLogin({
            snsAccessToken:token.accessToken,
            autoLogin:true,
        },'KAKAO');
        navigation.reset({
            index: 0,
            routes: [
              {
                name: SCREEN_NAME,
              },
            ],
          })
      };     
      const facebookLogin = async () => {
        try {
          const result = await LoginManager.logInWithPermissions(
            ['public_profile', 'email'],
            nonce
          );
          console.log(result);
      
          if (Platform.OS === 'ios') {
            const result = await AuthenticationToken.getAuthenticationTokenIOS();
            console.log(result?.authenticationToken);
            await snsLogin({
              snsAccessToken:token.accessToken,
              autoLogin:true,
            },'KAKAO');
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              })
          } else {
            const result = await AccessToken.getCurrentAccessToken();
            console.log(result?.accessToken);
            await snsLogin({
              snsAccessToken:token.accessToken,
              autoLogin:true,
            },'KAKAO');
            navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              })
          }
        } catch (error) {
          console.log(error);
        }
       
      };     

    return {naverLogin,kakaoLogin,googleLogin,appleLogin,facebookLogin};
};
