import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Spinner, Flex, Text } from '@blockstack/ui';
import { Screen, ScreenBody } from '@blockstack/connect';
import { ScreenHeader } from '@components/connected-screen-header';
import { Title } from '../../typography';

import { doCreateSecretKey } from '@store/onboarding/actions';

interface ExplainerCardProps {
  title: string;
  imageUrl: string;
}

const ExplainerCard = ({ title, imageUrl }: ExplainerCardProps) => (
  <Flex height="300px" flexDirection="column" justifyContent="space-between">
    <Box>
      <Text>{imageUrl ? 'With Stacks:' : ' '}</Text>
    </Box>
    <Flex justifyContent="center" alignItems="center" height="180px" mb={imageUrl ? 8 : 0} flexDirection="column">
      {imageUrl && (
        <Box flex="1" justifyContent="center">
          <Flex mx="auto" width="240px" height="152px" justifyContent="center">
            <img src={imageUrl} />
          </Flex>
        </Box>
      )}
      <Box pb={imageUrl ? 6 : 0}>
        <Title>{title}</Title>
      </Box>
    </Flex>
    <Flex width="100%" flexDirection="column" alignItems="center">
      <Spinner thickness="3px" size="lg" color="blue" />
    </Flex>
  </Flex>
);

interface MockData {
  title: string;
  imageUrl: string;
}

const createTimeoutLoop = (setState: (item: MockData) => void, arr: MockData[], onEnd: () => void) =>
  arr.forEach((item, index) =>
    setTimeout(() => {
      setState(item);
      if (index === arr.length - 1) {
        onEnd();
      }
    }, (index + 1) * 2400)
  );

interface CreateProps {
  next: () => void;
}

export const Create: React.FC<CreateProps> = props => {
  const [state, setState] = useState({
    title: 'Creating your Data Vault',
    imageUrl: '',
  });
  const dispatch = useDispatch();

  const mockData: MockData[] = [
    {
      title: 'Private data storage',
      imageUrl: '/assets/images/icon-delay-private.svg',
    },
    {
      title: 'Always-on encryption',
      imageUrl: '/assets/images/icon-delay-padlock.svg',
    },
    {
      title: 'Access to 100s of apps',
      imageUrl: '/assets/images/icon-delay-apps.svg',
    },
    {
      title: 'This will not display',
      imageUrl: '',
    },
  ];

  useEffect(() => {
    // This timeout is important because if the app is navigated to as a sign in, the
    // create page will be rendered momentarily, and we need to cancel these
    // functions if we're on a different screen
    const timeout = setTimeout(() => {
      createTimeoutLoop(setState, mockData, () => props.next());
      dispatch(doCreateSecretKey());
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  const offCenterOffset = '.44';

  return (
    <Screen textAlign="center">
      <ScreenHeader />
      <ScreenBody
        flex={offCenterOffset}
        justifyContent="center"
        body={[<ExplainerCard title={state.title} imageUrl={state.imageUrl} />]}
      />
    </Screen>
  );
};
