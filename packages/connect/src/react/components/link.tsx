import React from 'react';
import { Text, Box, BoxProps } from '@blockstack/ui';

interface LinkProps extends BoxProps {
  _hover?: BoxProps;
}

export const Link: React.FC<LinkProps> = ({ _hover = {}, children, textStyle = 'caption.medium', ...rest }) => (
  <Box {...rest}>
    <Text _hover={{ textDecoration: 'underline', cursor: 'pointer', ..._hover }} fontSize="12px" textStyle={textStyle}>
      {children}
    </Text>
  </Box>
);
