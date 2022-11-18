import React, {ReactElement, useState} from 'react';
import {
  Input,
  IInputProps,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
  Select,
} from 'native-base';
import {HTTPProtocol} from './enums/http.enum';
import {StyleSheet} from 'react-native';


interface Props extends IInputProps {
  onSearch: (protocol: HTTPProtocol) => void;
  errorMessage?: string;
  hasError: boolean;
}

type HttpOption = {
  value: HTTPProtocol;
  label: string;
};

export const SearchInput = (props: Props): ReactElement => {
  const {onSearch, errorMessage, hasError} = props;
  const [protocol, setProtocol] = useState<HTTPProtocol>(HTTPProtocol.HTTP);

  const httpOptions: HttpOption[] = [
    {label: 'HTTP', value: HTTPProtocol.HTTP},
    {label: 'HTTPS', value: HTTPProtocol.HTTPS},
  ];
  return (
    <Box alignItems="center">
      <FormControl isInvalid={hasError}>
        <Input
          type="text"
          w="100%"
          py="0"
          {...props}
          InputRightElement={
            <Button
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              onPress={() => onSearch(protocol)}>
              Search
            </Button>
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
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {errorMessage ? errorMessage : 'Error'}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
