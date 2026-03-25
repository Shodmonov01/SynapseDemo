import * as React from 'react';

import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, type InputProps, InputRightElement } from '@chakra-ui/react';

export interface SearchInputProps extends Omit<InputProps, 'variant'> {
  /** Иконка справа (по умолчанию поиск) */
  rightElement?: React.ReactNode;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  rightElement,
  pr,
  ...rest
}) => {
  const icon = React.useMemo(
    () => rightElement ?? <SearchIcon color='gray.400' boxSize={4} />,
    [rightElement],
  );

  return (
    <InputGroup size='md'>
      <Input variant='search' pr={pr ?? 10} {...rest} />
      <InputRightElement pointerEvents='none' h='full' pr={3}>
        {icon}
      </InputRightElement>
    </InputGroup>
  );
};
