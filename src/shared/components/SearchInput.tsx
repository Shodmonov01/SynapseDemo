import * as React from 'react';

import { colors } from '../tokens/colors';
import { radii } from '../tokens/radii';

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
      <Input
        variant='unstyled'
        pr={pr ?? 10}
        h='40px'
        pl={4}
        borderRadius={radii.pill}
        bg={colors.app.surface}
        borderWidth='1px'
        borderStyle='solid'
        borderColor={colors.neutral[200]}
        _hover={{ borderColor: colors.neutral[300] }}
        _focusVisible={{
          borderColor: colors.app.shellStripIconFg,
          boxShadow: `0 0 0 1px ${colors.app.shellStripIconFg}`,
        }}
        {...rest}
      />
      <InputRightElement
        pointerEvents='none'
        h='full'
        pr={3}
        sx={{ insetInlineEnd: '13px' }}
      >
        {icon}
      </InputRightElement>
    </InputGroup>
  );
};
