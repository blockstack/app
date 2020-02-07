import React from 'react';
import { Screen, ScreenBody, Title } from '@blockstack/connect';
import { Box } from '@blockstack/ui';
import { Wallet, Identity } from '@blockstack/keychain';
import { ScreenHeader } from '@components/connected-screen-header';
import { Accounts } from '@components/accounts';
import { AppIcon } from '@components/app-icon';
import { useSelector } from 'react-redux';
import { AppState } from '@store';
import { selectAppName } from '@store/onboarding/selectors';
import { Drawer } from '@components/drawer';
<<<<<<< HEAD
import { selectIdentities, selectCurrentWallet } from '@store/wallet/selectors';
import { selectDecodedAuthRequest } from '@store/onboarding/selectors';
import { store } from '@store';
import { ConfigApp } from '@blockstack/keychain/dist/wallet';
=======
import { selectIdentities } from '@store/wallet/selectors';
>>>>>>> feat: Add homepage

interface ChooseAccountProps {
  next: (identityIndex: number) => void;
  back?: () => void;
}

export const ChooseAccount: React.FC<ChooseAccountProps> = ({ next }) => {
  const { appName, identities, wallet } = useSelector((state: AppState) => ({
    appName: selectAppName(state),
<<<<<<< HEAD
    identities: selectIdentities(state) as Identity[],
    wallet: selectCurrentWallet(state) as Wallet,
=======
    identities: selectIdentities(state),
>>>>>>> feat: Add homepage
  }));
  const [reusedApps, setReusedApps] = React.useState<ConfigApp[]>([]);
  const [identityIndex, setIdentityIndex] = React.useState<number | undefined>();

  const didSelectAccount = ({ identityIndex }: { identityIndex: number }) => {
    const state = store.getState();
    const authRequest = selectDecodedAuthRequest(state);
    setIdentityIndex(identityIndex);
    if (!authRequest) {
      console.error('No authRequest found when selecting account');
      return;
    }
    if (
      wallet.walletConfig &&
      !wallet.walletConfig.hideWarningForReusingIdentity &&
      authRequest.scopes.includes('publish_data')
    ) {
      const url = new URL(authRequest?.redirect_uri);
      const apps = wallet.walletConfig.identities[identityIndex]?.apps;
      if (apps) {
        const newReusedApps: ConfigApp[] = [];
        Object.keys(apps).forEach(origin => {
          const app = apps[origin];
          if (origin !== url.origin && app.scopes.includes('publish_data')) {
            newReusedApps.push(app);
          }
        });
        setReusedApps(newReusedApps);
        if (Object.keys(newReusedApps).length > 0) {
          return;
        }
      }
    }
    next(identityIndex);
  };

  return (
    <Box position="relative">
      <Drawer
        close={() => {
          setIdentityIndex(undefined);
          setReusedApps([]);
        }}
        showing={reusedApps.length > 0}
        apps={reusedApps}
        confirm={async (hideWarning: boolean) => {
          if (hideWarning) {
            const gaiaUrl = 'https://hub.blockstack.org';
            const gaiaConfig = await wallet.createGaiaConfig(gaiaUrl);
            await wallet.updateConfigForReuseWarning({ gaiaConfig });
          }
          next(identityIndex as number);
        }}
      />
      <Screen textAlign="center">
        <ScreenHeader hideIcon title="Continue with Data Vault" />
        <AppIcon mt={10} size="72px" />
        <ScreenBody
          title="Choose an account"
          body={[`to use with ${appName}`, <Accounts identities={identities} next={(identityIndex: number) => didSelectAccount({ identityIndex })} showAddAccount />]}
        />
      </Screen>
    </Box>
  );
};
