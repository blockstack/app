import React, { memo } from 'react';
import { Route } from 'react-router-dom';
import { AccountGate } from '@pages/account-gate';
import { ScreenPaths } from '@common/types';

interface AccountGateRouteProps {
  path: ScreenPaths;
}

export const AccountGateRoute: React.FC<AccountGateRouteProps> = memo(props => {
  const { path, children } = props;
  return <Route path={path} element={<AccountGate>{children}</AccountGate>} />;
});
