import { Card, CardBody, type CardProps } from '@chakra-ui/react';
import * as React from 'react';

export interface SectionCardProps extends CardProps {
  children: React.ReactNode;
  bodyProps?: React.ComponentProps<typeof CardBody>;
}

export const SectionCard: React.FC<SectionCardProps> = ({
  children,
  bodyProps,
  variant = 'elevated',
  ...rest
}) => {
  return (
    <Card variant={variant} {...rest}>
      <CardBody {...bodyProps}>{children}</CardBody>
    </Card>
  );
};
