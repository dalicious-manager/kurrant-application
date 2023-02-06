import { appleAuth,appleAuthAndroid } from '@invertase/react-native-apple-authentication';
import Clipboard from '@react-native-clipboard/clipboard';
import auth, { firebase } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { login } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import { useNavigation } from '@react-navigation/native';
import { Alert, Platform } from 'react-native';
import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

import useAuth from '../../biz/useAuth';
import { SCREEN_NAME } from '../../screens/Main/Bnb';
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid'

import { PAGE_NAME as AppleLoginPageName } from '../../pages/Main/Login/AppleSignup';
import jwtDecode from 'jwt-decode';

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
    const {snsLogin,snsAppleLogin} =useAuth();
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
          // Clipboard.setString(accessToken)
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
      const appleLogin  = async(name="") =>{
        try {
        // Start the sign-in request
        if(Platform.OS === "android"){
          const test = await appleAuthAndroid.signIn();
          // Clipboard.setString(test.id_token);
          const appleCredential = firebase.auth.AppleAuthProvider.credential(test.id_token, test.nonce);
          const userCredential = await firebase.auth().signInWithCredential(appleCredential);
          await snsAppleLogin({
            ...test,
            autoLogin:true,
          },'APPLE');
          navigation.reset({
            index: 0,
            routes: [
              {
                name: SCREEN_NAME,
              },
            ],
          })
        }else{
          // await appleAuth.onCredentialRevoked(async () => {
          //   console.warn('If this function executes, User Credentials have been Revoked');
          // });
            const appleAuthRequestResponse = await appleAuth.performRequest({
              requestedOperation: appleAuth.Operation.LOGIN,
              requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
            });

            
            // // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
              throw new Error('Apple Sign-In failed - no identify token returned');
            }
            const {email} = jwtDecode(appleAuthRequestResponse.identityToken);
            if(!email) throw new Error("이메일이 존재하지 않습니다.")

            const appleCredential = firebase.auth.AppleAuthProvider.credential(appleAuthRequestResponse.identityToken, appleAuthRequestResponse.nonce);
            const userCredential = await firebase.auth().signInWithCredential(appleCredential);
            const appleData = appleAuthRequestResponse;
            
            console.log(userCredential);
            await snsAppleLogin({
                ...appleData,
                autoLogin:true,
            },'APPLE');
            console.log(userCredential.additionalUserInfo.isNewUser);
            if(!userCredential.additionalUserInfo.isNewUser){
              navigation.reset({
                index: 0,
                routes: [
                  {
                    name: SCREEN_NAME,
                  },
                ],
              })
            }else{
              if(appleAuthRequestResponse.fullName.familyName){
                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: SCREEN_NAME,
                    },
                  ],
                })
              }else{
                Alert.alert("신규 유저","이름을 가져올수 없습니다 이름을 등록하시겠습니까? \n이름을 등록 하지 않으면 이름없음으로 자동 등록 됩니다.",[
                  {
                    text:'취소',
                    onPress:() => {
                      navigation.reset({
                        index: 0,
                        routes: [
                          {
                            name: SCREEN_NAME,
                          },
                        ],
                      })
                    },
                    
                  },
                  {
                    text:'확인',
                    onPress: async () => {
                        navigation.navigate(AppleLoginPageName)
                    },
                    style:'destructive'
                  }
                ])
              }        
              
            }
          }
          } catch (error) {
            console.log("err",error.toString());
            Alert.alert("로그인 에러","이메일을 가져올수 없습니다.\n핸드폰을 재부팅 하시고 이후 문제가 해결되지않는다면 고객센터로 문의 주세요");
          }
        // const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        // // Sign the user in with the credential
        // return auth().signInWithCredential(appleCredential);
      }
    
      const kakaoLogin = async () => {
        const token = await login();
        // Clipboard.setString(token.accessToken);
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
            // Clipboard.setString(result?.authenticationToken);

            await snsLogin({
              snsAccessToken:result?.authenticationToken,
              autoLogin:true,
            },'FACEBOOK');
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
            // Clipboard.setString(result?.accessToken);
            await snsLogin({
              snsAccessToken:result?.accessToken,
              autoLogin:true,
            },'FACEBOOK');
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
