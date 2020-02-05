import React from 'react';
import { useSelector } from 'react-redux';
import { Screen, ScreenBody, ScreenActions, Title } from '@blockstack/connect';
import { ScreenHeader } from '@components/connected-screen-header';

import { Button, Text } from '@blockstack/ui';

import { Collapse } from '@components/collapse';
import { AppState } from '@store';

import { selectAppName } from '@store/onboarding/selectors';
import { faqs } from '@components/onboarding/data';

import { doTrack, SECRET_KEY_INSTR_CONFIRMED } from '@common/track';

interface SaveKeyProps {
  next: () => void;
}

export const SaveKey: React.FC<SaveKeyProps> = ({ next }) => {
  const appName = useSelector((state: AppState) => selectAppName(state));
  return (
    <Screen>
      <ScreenHeader />
      <ScreenBody
        mt={6}
        body={[
          <Title>Save your Secret Key</Title>,
          <Text display="block" mt={2}>
            Paste your Secret Key wherever you keep critical, private, information such as passwords.
          </Text>,
          <Text display="block" mt={5}>
            {' '}
            Once lost, it’s lost forever. So save it somewhere you won’t forget.
          </Text>,
        ]}
      />
      <ScreenActions>
        <Button
          width="100%"
          mt={6}
          onClick={() => {
            doTrack(SECRET_KEY_INSTR_CONFIRMED);
            next();
          }}
          data-test="button-has-saved-seed-phrase"
        >
          {"I've saved it"}
        </Button>
      </ScreenActions>
      <Collapse mt={8} data={faqs(appName as string)} />
    </Screen>
  );
};
