import React, { useState } from 'react';
import { Screen, ScreenBody, ScreenActions } from '@blockstack/connect';
import { ScreenHeader } from '@components/connected-screen-header';
import { Box, Text, Input, Flex, Button } from '@blockstack/ui';
import { AppIcon } from '@components/app-icon';
import { Link } from '@components/link';

import { useDispatch, useSelector } from 'react-redux';
import { doTrack, SIGN_IN_CORRECT, SIGN_IN_CREATE, SIGN_IN_INCORRECT } from '@common/track';
import { doChangeScreen, doSetMagicRecoveryCode } from '@store/onboarding/actions';
import { ScreenName, DEFAULT_PASSWORD } from '@store/onboarding/types';
import { AppState } from '@store';
import { selectAppName } from '@store/onboarding/selectors';
import { doStoreSeed } from '@store/wallet';

interface SignInProps {
  next: () => void;
  back: () => void;
}

export const SignIn: React.FC<SignInProps> = props => {
  const [isLoading, setLoading] = useState(false);
  const [seed, setSeed] = useState('');
  const [seedError, setSeedError] = useState<null | string>(null);
  const dispatch = useDispatch();
  const appName = useSelector((state: AppState) => selectAppName(state));

  return (
    <Screen isLoading={isLoading} spacing={0} textAlign="center">
      <ScreenHeader title="Continue with Data Vault" hideIcon />
      <AppIcon mt={10} />
      <ScreenBody
        title={`Sign into ${appName}`}
        mt={4}
        body={[
          <Box mt={2}>Enter your Data Vault’s Secret Key to continue</Box>,
          <Box textAlign="left" mt={6}>
            {/*Validate: track SIGN_IN_INCORRECT*/}
            <Input
              autoFocus
              minHeight="80px"
              placeholder="12-word Secret Key"
              as="textarea"
              value={seed}
              onChange={(evt: React.FormEvent<HTMLInputElement>) => {
                setSeedError(null);
                setSeed(evt.currentTarget.value);
              }}
            />
            {seedError && (
              <Text textAlign="left" textStyle="caption" color="feedback.error">
                {seedError}
              </Text>
            )}
          </Box>,
        ]}
      />
      <ScreenActions>
        <Flex justify="space-between" align="center" width="100%">
          <Link
            color="blue"
            onClick={() => {
              doTrack(SIGN_IN_CREATE);
              dispatch(doChangeScreen(ScreenName.USERNAME));
            }}
          >
            Create a Data Vault
          </Link>
          <Button
            onClick={async () => {
              setLoading(true);
              try {
                if (seed.trim().split(' ').length <= 1) {
                  dispatch(doSetMagicRecoveryCode(seed.trim()));
                  dispatch(doChangeScreen(ScreenName.RECOVERY_CODE));
                  return;
                }
                await doStoreSeed(seed, DEFAULT_PASSWORD)(dispatch, () => ({}), {});
                doTrack(SIGN_IN_CORRECT);
                props.next();
              } catch (error) {
                setSeedError("The seed phrase you've entered is invalid.");
                doTrack(SIGN_IN_INCORRECT);
              }
              setLoading(false);
            }}
          >
            Continue
          </Button>
        </Flex>
      </ScreenActions>
    </Screen>
  );
};
