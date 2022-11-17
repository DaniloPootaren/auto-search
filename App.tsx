import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Alert} from 'react-native';
import {NativeBaseProvider, Flex, VStack} from 'native-base';
import {colors} from './src/utils/styles.util';
import {SearchInput} from './src/components/Input';
import {URL_MATCHER} from './src/constants/regex.constant';
import {HTTPProtocol} from './src/components/Input/enums/http.enum';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
});

const App = () => {
  // @DEV: Normally form state should be managed by formik, redux form etc...
  // But since this is a simple demo its doing the job.
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleChangeText = (text: string): void => {
    setUrl(text.toLowerCase());
  };

  const onSearch = (protocol: HTTPProtocol): void => {
    const regex = new RegExp(URL_MATCHER);
    const fullURL = `${protocol.toLowerCase()}://${url}`;
    setError(!url || !regex.test(fullURL));

    if (!error) {
      Alert.alert(fullURL);
    }
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        <Flex height="full" style={styles.container}>
          <VStack padding="2">
            <SearchInput
              hasError={error}
              onSearch={onSearch}
              errorMessage="Please enter a valid url."
              onChangeText={handleChangeText}
              value={url}
            />
          </VStack>
        </Flex>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default App;
