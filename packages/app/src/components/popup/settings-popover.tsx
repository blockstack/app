import React, { useCallback } from 'react';
import { Box, Text, BoxProps, Flex } from '@stacks/ui';
import useOnClickOutside from 'use-onclickoutside';
import { useWallet } from '@common/hooks/use-wallet';
import { useDrawers } from '@common/hooks/use-drawers';
import { useAnalytics } from '@common/hooks/use-analytics';
import { ScreenPaths } from '@store/onboarding/types';
import { AccountStep } from '@store/recoil/drawers';
import { Divider } from '@components/divider';

const SettingsItem: React.FC<BoxProps> = ({ onClick, children, ...props }) => (
  <Box
    {...props}
    width="100%"
    p="base-tight"
    color="ink.1000"
    _hover={{ backgroundColor: 'ink.150' }}
    onClick={e => {
      onClick?.(e);
    }}
  >
    <Text textStyle="body.small" display="block">
      {children}
    </Text>
  </Box>
);

export const SettingsPopover: React.FC = () => {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const { doSignOut, currentIdentity, doLockWallet, identities, currentNetworkKey } = useWallet();
  const {
    setShowNetworks,
    setShowAccounts,
    setAccountStep,
    setShowSettings,
    showSettings,
  } = useDrawers();
  const { doChangeScreen } = useAnalytics();

  const showing = showSettings;
  const close = useCallback(() => {
    setShowSettings(false);
  }, [setShowSettings]);

  useOnClickOutside(ref, () => {
    if (showing) {
      close();
    }
  });

  const wrappedCloseCallback = useCallback(
    (callback: () => void) => {
      return () => {
        callback();
        close();
      };
    },
    [close]
  );

  return (
    <Box
      ref={ref}
      position="absolute"
      top="44px"
      right="26px"
      borderRadius="8px"
      width="296px"
      boxShadow="0px 8px 16px rgba(27, 39, 51, 0.08);"
      zIndex={2000}
      background="white"
      display={showing ? 'block' : 'none'}
    >
      {identities && identities.length > 1 ? (
        <SettingsItem
          mt="tight"
          onClick={wrappedCloseCallback(() => {
            setAccountStep(AccountStep.Switch);
            setShowAccounts(true);
          })}
        >
          Switch account
        </SettingsItem>
      ) : null}
      <SettingsItem
        onClick={wrappedCloseCallback(() => {
          setAccountStep(AccountStep.Create);
          setShowAccounts(true);
        })}
      >
        Create an Account
      </SettingsItem>

      {/* <SettingsItem
        onClick={() => {
          const url = chrome.runtime.getURL(ScreenPaths.SETTINGS_KEY);
          window.open(url, '_blank');
        }}
      >
        View Secret Key
      </SettingsItem> */}
      {currentIdentity && !currentIdentity.defaultUsername ? (
        <>
          <Divider />
          <SettingsItem
            onClick={wrappedCloseCallback(() => {
              setAccountStep(AccountStep.Username);
              setShowAccounts(true);
            })}
          >
            Add username
          </SettingsItem>
        </>
      ) : null}
      <Divider />
      <SettingsItem
        mb="tight"
        onClick={wrappedCloseCallback(() => {
          setShowNetworks(true);
        })}
      >
        <Flex width="100%">
          <Box flexGrow={1}>Change Network</Box>
          <Box color="ink.600">{currentNetworkKey}</Box>
        </Flex>
      </SettingsItem>
      <Divider />
      <SettingsItem
        mb="tight"
        onClick={wrappedCloseCallback(() => {
          doSignOut();
          doChangeScreen(ScreenPaths.INSTALLED);
        })}
      >
        Sign Out
      </SettingsItem>
      <SettingsItem
        mb="tight"
        onClick={wrappedCloseCallback(() => {
          doChangeScreen(ScreenPaths.POPUP_HOME);
          doLockWallet();
        })}
      >
        Lock
      </SettingsItem>
    </Box>
  );
};
