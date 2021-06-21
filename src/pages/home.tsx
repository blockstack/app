import React from 'react';
import { Stack } from '@stacks/ui';
import { PopupContainer } from '@components/popup/container';
import { Header } from '@components/header';
import { BalancesAndActivity } from '@components/popup/balances-and-activity';
import { UserAccount } from '@components/home/components/user-area';
import { HomeActions } from '@components/home/components/actions';

const PageTop = () => (
  <>
    <UserAccount />
    <HomeActions />
  </>
);

export const PopupHome = () => (
  <PopupContainer header={<Header />} requestType="auth">
    <Stack data-test="home-page" flexGrow={1} spacing="loose">
      <PageTop />
      <BalancesAndActivity />
    </Stack>
  </PopupContainer>
);
