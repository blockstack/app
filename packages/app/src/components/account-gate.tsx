import React, { useState } from 'react';
import { Text, Button, Box, useClipboard } from '@stacks/ui';
import { PopupContainer } from '@components/popup/container';
import { useWallet } from '@common/hooks/use-wallet';
import { Card } from '@components/card';
import { SeedTextarea } from '@components/seed-textarea';
import { Toast } from '@components/toast';
import { SetPasswordPage } from '@pages/set-password';
import { useAnalytics } from '@common/hooks/use-analytics';
import { ScreenPaths } from '@store/onboarding/types';
import { Unlock } from '@components/unlock';
import { Route } from 'react-router-dom';

enum Step {
  INITIAL = 0,
  VIEW_KEY = 1,
  SET_PASSWORD = 2,
}

export const SignedOut = () => {
  const { doChangeScreen } = useAnalytics();
  return (
    <PopupContainer hideActions={true}>
      <Box width="100%" mt="extra-loose" textAlign="center">
        <Text textStyle="display.large" display="block">
          You're logged out!
        </Text>
        <Button
          my="extra-loose"
          onClick={() => {
            if (typeof chrome !== 'undefined' && chrome.runtime.getURL) {
              window.open(chrome.runtime.getURL(`index.html#${ScreenPaths.INSTALLED}`));
            } else {
              doChangeScreen(ScreenPaths.INSTALLED);
            }
          }}
        >
          Get started
        </Button>
      </Box>
    </PopupContainer>
  );
};

interface AccountGateProps {
  element: React.ReactNode;
}
export const AccountGate: React.FC<AccountGateProps> = ({ element }) => {
  const [step, setStep] = useState<Step>(Step.INITIAL);
  const { hasSetPassword, isSignedIn, secretKey, encryptedSecretKey } = useWallet();
  const { onCopy, hasCopied } = useClipboard(secretKey || '');

  if (isSignedIn && hasSetPassword) return <>{element}</>;

  if (isSignedIn && !hasSetPassword) {
    if (step === Step.INITIAL) {
      return (
        <PopupContainer hideActions title="Save your Secret Key">
          <Box my="loose">
            <Text fontSize={2}>
              Before adding tokens to your account, save your Secret Key. You’ll need your Secret
              Key to access your account, its data and assets on a new device.
            </Text>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <Button width="100%" onClick={() => setStep(Step.VIEW_KEY)}>
              Save Secret Key
            </Button>
          </Box>
        </PopupContainer>
      );
    } else if (step === Step.VIEW_KEY) {
      return (
        <PopupContainer hideActions title="Your Secret Key">
          <Toast show={hasCopied} />
          <Box mt="loose">
            <Text fontSize={2}>
              Here’s your Secret Key: 12 words that prove it’s you when you want to use {name} on a
              new device. Once lost it’s lost forever, so save it somewhere you won’t forget.
            </Text>
          </Box>
          <Box my="loose">
            <Card title="Your Secret Key">
              <SeedTextarea
                readOnly
                spellCheck="false"
                autoCapitalize="false"
                value={secretKey}
                className="hidden-secret-key"
                data-test="textarea-seed-phrase"
                data-loaded={String(!!secretKey)}
              />
            </Card>
          </Box>
          <Box flexGrow={1} />
          <Box>
            <Button mb="base" width="100%" mode="secondary" onClick={onCopy}>
              Copy to clipboard
            </Button>
            <Button width="100%" onClick={() => setStep(Step.SET_PASSWORD)}>
              I've saved it
            </Button>
          </Box>
        </PopupContainer>
      );
    } else if (step === Step.SET_PASSWORD) {
      return <SetPasswordPage />;
    }
  }

  if (!isSignedIn && encryptedSecretKey) {
    return <Unlock />;
  }

  return <SignedOut />;
};

interface AccountGateRouteProps {
  path: ScreenPaths;
  element: React.ReactNode;
}
export const AccountGateRoute: React.FC<AccountGateRouteProps> = ({ path, element }) => {
  return <Route path={path} element={<AccountGate element={element} />} />;
};
