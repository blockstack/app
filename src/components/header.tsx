import React, { memo } from 'react';
import { Box, BoxProps, color, Flex, FlexProps, IconButton, Stack } from '@stacks/ui';
import { IconAlertTriangle, IconArrowLeft, IconDots } from '@tabler/icons';

import { StacksWalletLogo } from '@components/stacks-wallet-logo';
import { useAnalytics } from '@common/hooks/use-analytics';
import { useDrawers } from '@common/hooks/use-drawers';
import { NetworkModeBadge } from '@components/network-mode-badge';
import { ScreenPaths } from '@store/onboarding/types';
import { Caption, Title } from '@components/typography';

interface HeaderProps extends FlexProps {
  onClose?: () => void;
  hideActions?: boolean;
  title?: string;
}

const MenuButton: React.FC<BoxProps> = memo(props => {
  const { showSettings, setShowSettings } = useDrawers();
  return (
    <IconButton
      size="36px"
      iconSize="20px"
      onMouseUp={showSettings ? undefined : () => setShowSettings(true)}
      pointerEvents={showSettings ? 'none' : 'all'}
      color={color('text-caption')}
      _hover={{
        color: color('text-title'),
      }}
      data-test="menu-button"
      icon={IconDots}
      {...props}
    />
  );
});

const HeaderTitle: React.FC<BoxProps> = props => (
  <Title fontSize="20px" lineHeight="28px" fontWeight={500} {...props} />
);

const WarningBanner: React.FC<FlexProps> = () => {
  return (
    <Stack
      px="base"
      isInline
      alignItems="center"
      justifyContent="center"
      bg={color('bg-4')}
      py="tight"
      borderBottom="1px solid"
      borderColor={color('border')}
    >
      <Box as={IconAlertTriangle} size="16px" color={color('feedback-alert')} />
      <Caption fontSize={0}>Stacks Wallet for Web is in alpha, it has not been audited.</Caption>
    </Stack>
  );
};

export const Header: React.FC<HeaderProps> = memo(props => {
  const { onClose, title, hideActions } = props;
  const { doChangeScreen } = useAnalytics();

  return (
    <>
      <WarningBanner />
      <Flex
        p="loose"
        alignItems={hideActions ? 'center' : 'flex-start'}
        justifyContent="space-between"
        position="relative"
        {...props}
      >
        {!title ? (
          <StacksWalletLogo pt="7px" onClick={() => doChangeScreen(ScreenPaths.HOME)} />
        ) : (
          <Box pt={onClose ? 'loose' : 'unset'}>
            {onClose ? (
              <IconButton
                top="base-tight"
                position="absolute"
                left="base"
                onClick={onClose}
                icon={IconArrowLeft}
              />
            ) : null}
            <HeaderTitle>{title}</HeaderTitle>
          </Box>
        )}
        <Stack pt={hideActions ? '7px' : 0} alignItems="center" isInline>
          <NetworkModeBadge />
          {!hideActions && <MenuButton />}
        </Stack>
      </Flex>
    </>
  );
});
