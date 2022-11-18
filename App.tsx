import React, {useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NativeBaseProvider, Flex, VStack, Spinner} from 'native-base';
import {WebView} from 'react-native-webview';
import {colors} from './src/utils/styles.util';
import {SearchInput} from './src/components/Input';
import {URL_MATCHER} from './src/constants/regex.constant';
import Animated, {SlideInUp} from 'react-native-reanimated';
import {useToast} from 'native-base';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  webview: {
    flex: 1,
    flexDirection: 'row',
  },
});

const App = () => {
  // @DEV: Normally form state should be managed by any statemanagement tool such as formik, redux form etc...
  // But since this is a simple demo its doing the job.
  const [fullURL, setFullURL] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const toast = useToast();

  const handleChangeText = (protocol: string, text: string): void => {
    const regex = new RegExp(URL_MATCHER);
    const _fullURL = `${protocol.toLowerCase()}://${text.toLowerCase()}`;
    setError(!regex.test(_fullURL));

    if (!error) {
      setFullURL(_fullURL);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Flex height="full" style={styles.container}>
          <VStack padding="2" flex={1} justifyContent="center">
            <Animated.View entering={SlideInUp}>
              <SearchInput
                showSearchBtn={false}
                hasError={error}
                errorMessage="Please enter a valid url."
                handleTextchange={handleChangeText}
              />
            </Animated.View>
            {fullURL && (
              <WebView
                style={styles.webview}
                startInLoadingState={true}
                source={{
                  uri: fullURL,
                }}
                renderLoading={() => (
                  <Spinner accessibilityLabel="Loading..." />
                )}
                onError={() => toast.show({description: 'Invalid domain'})}
              />
            )}
          </VStack>
        </Flex>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
