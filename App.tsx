import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Alert, Dimensions} from 'react-native';
import {NativeBaseProvider, Flex, VStack, Spinner, Center} from 'native-base';
import {WebView} from 'react-native-webview';
import {colors} from './src/utils/styles.util';
import {SearchInput} from './src/components/Input';
import {URL_MATCHER} from './src/constants/regex.constant';
import {HTTPProtocol} from './src/components/Input/enums/http.enum';

const {width, height} = Dimensions.get('window');

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
  const [url, setUrl] = useState<string>('');
  const [fullURL, setFullURL] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeText = (text: string): void => {
    setUrl(text.toLowerCase());
  };

  const onSearch = (protocol: HTTPProtocol): void => {
    const regex = new RegExp(URL_MATCHER);
    const _fullURL = `${protocol.toLowerCase()}://${url}`;
    setError(!url || !regex.test(_fullURL));

    if (!error) {
      setFullURL(_fullURL);
      Alert.alert(_fullURL);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Flex height="full" style={styles.container}>
          <VStack padding="2" flex={1}>
            <SearchInput
              hasError={error}
              onSearch={onSearch}
              errorMessage="Please enter a valid url."
              onChangeText={handleChangeText}
              value={url}
            />
            {fullURL && (
              <WebView
                useWebKit={true}
                startInLoadingState={true}
                containerStyle={styles.webview}
                source={{
                  uri: fullURL,
                }}
                renderLoading={() => (
                  <Center mt="4" height="full">
                    <Spinner accessibilityLabel="Loading..." />
                  </Center>
                )}
              />
            )}
          </VStack>
        </Flex>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
