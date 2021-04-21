import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { decodeToken } from 'jsontokens';
import { useDispatch } from 'react-redux';
import { getRequestOrigin, StorageKey } from '@extension/storage';
import { DecodedAuthRequest } from '@common/dev/types';
import { useWallet } from '@common/hooks/use-wallet';
import { doChangeScreen, saveAuthRequest } from '@store/onboarding/actions';
import { ScreenPaths } from '@store/onboarding/types';
import { useOnboardingState } from '../use-onboarding-state';

export function useSaveAuthRequest() {
  const dispatch = useDispatch();
  const { wallet } = useWallet();
  const { screen } = useOnboardingState();
  const location = useLocation();
  const accounts = wallet?.accounts;
  const saveAuthRequestParam = useCallback(
    (authRequest: string) => {
      const { payload } = decodeToken(authRequest);
      const decodedAuthRequest = (payload as unknown) as DecodedAuthRequest;
      const origin = getRequestOrigin(StorageKey.authenticationRequests, authRequest);
      let appName = decodedAuthRequest.appDetails?.name;
      let appIcon = decodedAuthRequest.appDetails?.icon;

      if (!appIcon) {
        throw new Error('Missing `appIcon` from auth request');
      }
      if (!appName) {
        throw new Error('Missing `appName` from auth request');
      }

      dispatch(
        saveAuthRequest({
          decodedAuthRequest,
          authRequest,
          appName,
          appIcon,
          appURL: new URL(origin),
        })
      );

      const hasIdentities = accounts && accounts.length;
      if ((screen === ScreenPaths.GENERATION || screen === ScreenPaths.SIGN_IN) && hasIdentities) {
        dispatch(doChangeScreen(ScreenPaths.CHOOSE_ACCOUNT));
      }
    },
    [dispatch, screen, accounts]
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const authRequest = urlParams.get('authRequest');
    if (authRequest) {
      saveAuthRequestParam(authRequest);
    }
  }, [location.search, saveAuthRequestParam]);
}
