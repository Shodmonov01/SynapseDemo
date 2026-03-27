import type * as React from 'react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export interface AppTableRowMenuAction {
  id: string;
  label: React.ReactNode;
  onSelect: () => void;
  isDisabled?: boolean;
}

export interface AppTableRowMenuProps {
  actions: AppTableRowMenuAction[];
  /** Подпись для кнопки-триггера (скринридеры) */
  ariaLabel?: string;
}

export const AppTableRowMenu: React.FC<AppTableRowMenuProps> = ({
  actions,
  ariaLabel = 'Действия со строкой',
}) => {
  return (
    <Menu placement='bottom-end' isLazy gutter={4}>
      <MenuButton
        as={IconButton}
        aria-label={ariaLabel}
        icon={<ChevronDownIcon />}
        variant='ghost'
        size='sm'
        colorScheme='gray'
      />
      <MenuList zIndex={20} py={1} fontSize='sm'>
        {actions.map((action) => (
          <MenuItem
            key={action.id}
            onClick={() => {
              action.onSelect();
            }}
            isDisabled={action.isDisabled}
          >
            {action.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
