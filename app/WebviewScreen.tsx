import React, {useRef} from 'react';
import {ActivityIndicator, Linking, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {useLocalSearchParams, useRouter} from "expo-router";
import { LinerGradientBG } from '@/components/molecules/Background/LinerGradientBG';
import { COLOR } from '@/constants/Colors';


const WebviewScreen = () => {

  const viewport = useSafeAreaInsets();
  const router = useRouter()
  const {title, url, html} = useLocalSearchParams<{ url: string, title: string, html: string }>();

  const webviewRef = useRef<WebView>(null);

  const injectedJavaScript = `
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = 'header, header+div, #root-layout > div:last-of-type {height:0!important;overflow:hidden!important}';
    document.head.appendChild(style);
  `;

  return (
    <View className={'flex-1'}>
      {/*<ScreenHeader title={title} variant={'row'}/>*/}
      <View style={{backgroundColor: COLOR.white}} className={'flex-1'}>
        <WebView
          ref={webviewRef}
          injectedJavaScript={injectedJavaScript}
          startInLoadingState={!!url}
          containerStyle={{
            paddingBottom: viewport.bottom || 20
          }}
          renderLoading={() => (
            <View className={'absolute h-full w-full items-center justify-center'} style={{
              backgroundColor: COLOR.overlay.light
            }}>
              <ActivityIndicator
                animating={true}
                color={COLOR.primary["500"]}
                size={40}
              />
            </View>
          )}
          source={{
            uri: url,
            html: html
          }}
          onNavigationStateChange={(navState) => {
            if (url && navState.url !== url) {
              if (navState.url.includes("#max-widget")) {
                router.dismissTo('/(tabs)/chat')
                return;
              }
              webviewRef.current?.stopLoading();

              router.dismissTo('/search');
            }
          }}
          onShouldStartLoadWithRequest={request => {
            if (process.env.EXPO_PUBLIC_WEB_HOST && !request.url.includes(process.env.EXPO_PUBLIC_WEB_HOST) && (request.url.startsWith('http://') ||
              request.url.startsWith('https://'))) {
              Linking.openURL(request.url)
              return false;
            }
            return true;
          }}
          onMessage={() => {
          }}
        />
        <LinerGradientBG style={{marginBottom: viewport.bottom || 20}}/>
      </View>
    </View>
  );
};

export default WebviewScreen;
