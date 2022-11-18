import React, {ReactElement, useState} from 'react';
import {
  Input,
  IInputProps,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
  Select,
  Heading,
} from 'native-base';
import Animated, {FadeOut} from 'react-native-reanimated';
import {HTTPProtocol} from './enums/http.enum';

interface Props extends IInputProps {
  onSearch?: (protocol: HTTPProtocol) => void;
  errorMessage?: string;
  hasError: boolean;
  showSearchBtn: boolean;
  handleTextchange: (protocol: HTTPProtocol, text: string) => void;
}

type HttpOption = {
  value: HTTPProtocol;
  label: string;
};

export const SearchInput = (props: Props): ReactElement => {
  const {onSearch, errorMessage, hasError, showSearchBtn, handleTextchange} =
    props;
  const [protocol, setProtocol] = useState<HTTPProtocol>(HTTPProtocol.HTTP);
  const [showHeading, setShowHeading] = useState<boolean>(true);

  const httpOptions: HttpOption[] = [
    {label: 'HTTP', value: HTTPProtocol.HTTP},
    {label: 'HTTPS', value: HTTPProtocol.HTTPS},
  ];

  const handleSearch = (): void => {
    setShowHeading(false);
    if (onSearch) {
      onSearch(protocol);
    }
  };
  return (
    <Box alignItems="flex-start" mb={10}>
      {showHeading && (
        <Animated.View exiting={FadeOut}>
          <Heading mb="5" color={'gray.500'}>
            Search
          </Heading>
        </Animated.View>
      )}
      <FormControl isInvalid={hasError}>
        <Input
          type="text"
          w="100%"
          py="0"
          {...props}
          InputRightElement={
            showSearchBtn ? (
              <Button
                size="xs"
                rounded="none"
                w="1/6"
                h="full"
                onPress={handleSearch}>
                Search
              </Button>
            ) : (
              <></>
            )
          }
          InputLeftElement={
            <Select
              selectedValue={protocol}
              h="12"
              borderColor="transparent"
              placeholder="http://"
              mt={1}
              onValueChange={itemValue =>
                setProtocol(itemValue as HTTPProtocol)
              }>
              {httpOptions.map(option => (
                <Select.Item
                  label={option.label}
                  value={option.value}
                  key={`${option.label}-${option.value}`}
                />
              ))}
            </Select>
          }
          placeholder="Enter URL"
          onChangeText={(text: string) => {
            handleTextchange(protocol, text);
          }}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage ? errorMessage : 'Error'}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
