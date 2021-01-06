import React, { useState } from 'react';
import { useWallet } from '@common/hooks/use-wallet';
import { Box, Text, Input, Button, Flex } from '@stacks/ui';
import { IdentityNameValidityError, registerSubdomain, validateSubdomain } from '@stacks/keychain';
import { errorTextMap } from '@pages/username';
import { ErrorLabel } from '@components/error-label';
import { buildEnterKeyEvent } from '@components/link';
import { gaiaUrl, Subdomain } from '@common/constants';

interface AddUsernameProps {
  close: () => void;
}
export const AddUsername: React.FC<AddUsernameProps> = ({ close }) => {
  const { wallet, currentIdentity, setWallet } = useWallet();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<IdentityNameValidityError | null>(null);
  const [loading, setLoading] = useState(false);

  if (!wallet || !currentIdentity) {
    return null;
  }
  const onSubmit = async () => {
    setLoading(true);
    const validationError = await validateSubdomain(username, Subdomain);
    setError(validationError);

    if (validationError !== null) {
      // doTrack(USERNAME_VALIDATION_ERROR);
      setLoading(false);
      return;
    }

    try {
      await registerSubdomain({
        username,
        subdomain: Subdomain,
        gaiaHubUrl: gaiaUrl,
        identity: currentIdentity,
      });
      setWallet(wallet);
      setLoading(false);
      close();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Box width="100%" px={6}>
      <Box>
        <Text fontSize={4} fontWeight="600">
          Add username
        </Text>
      </Box>
      <Box py="base">
        <Box>
          <Input
            display="block"
            width="100%"
            autoFocus
            isDisabled={loading}
            value={username}
            onChange={(evt: React.FormEvent<HTMLInputElement>) =>
              setUsername(evt.currentTarget.value)
            }
            onKeyPress={buildEnterKeyEvent(onSubmit)}
            name="username"
          />
        </Box>
        <Box position="relative">
          {error && (
            <ErrorLabel>
              <Text
                textAlign="left"
                display="block"
                textStyle="caption"
                color="feedback.error"
                position="relative"
                top="5px"
              >
                {errorTextMap[error]}
              </Text>
            </ErrorLabel>
          )}
        </Box>
        <Flex width="100%" flexGrow={1} mt="base">
          <Button width="50%" mode="secondary" mr={2} onClick={close}>
            Cancel
          </Button>
          <Button width="50%" mode="primary" ml={2} onClick={onSubmit} isLoading={loading}>
            Add username
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};
