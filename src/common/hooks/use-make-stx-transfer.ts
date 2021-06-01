import { useRecoilCallback, waitForAll } from 'recoil';
import { stacksNetworkStore } from '@store/networks';
import { currentAccountStore } from '@store/wallet';
import { correctNonceState } from '@store/api';
import { makeSTXTokenTransfer, StacksTransaction } from '@stacks/transactions';
import BN from 'bn.js';
import { stxToMicroStx } from '@stacks/ui-utils';
import { useLoading } from '@common/hooks/use-loading';
import { useEffect } from 'react';
import { useMakeAssetTransfer } from '@common/hooks/use-asset-transfer';
import { useSelectedAsset } from '@common/hooks/use-selected-asset';

interface TokenTransferParams {
  amount: number;
  recipient: string;
  memo: string;
}

export function useMakeStxTransfer() {
  return useRecoilCallback(({ snapshot }) => async (params: TokenTransferParams) => {
    const { amount, recipient, memo } = params;
    const { network, account, nonce } = await snapshot.getPromise(
      waitForAll({
        network: stacksNetworkStore,
        account: currentAccountStore,
        nonce: correctNonceState,
      })
    );
    if (!account) return;

    return makeSTXTokenTransfer({
      recipient,
      amount: new BN(stxToMicroStx(amount).toString(), 10),
      memo,
      senderKey: account.stxPrivateKey,
      network,
      nonce: new BN(nonce.toString(), 10),
    });
  });
}

export function useMakeTransferEffect({
  isShowing,
  amount,
  recipient,
  memo,
  transaction,
  setTransaction,
  loadingKey,
}: {
  transaction: StacksTransaction | null;
  isShowing: boolean;
  amount: number;
  recipient: string;
  memo: string;
  setTransaction: (transaction: StacksTransaction) => void;
  loadingKey: string;
}) {
  const { isLoading, setIsLoading, setIsIdle } = useLoading(loadingKey);
  const { selectedAsset } = useSelectedAsset();
  const handleMakeStxTransaction = useMakeStxTransfer();
  const handleMakeFtTransaction = useMakeAssetTransfer();
  const isActive = isShowing && !!amount && !!recipient;
  const notLoaded = selectedAsset && !transaction && !isLoading;

  useEffect(() => {
    const method =
      selectedAsset?.type === 'stx' ? handleMakeStxTransaction : handleMakeFtTransaction;
    if (isActive) {
      if (notLoaded) {
        setIsLoading();
        void method({
          amount,
          recipient,
          memo,
        }).then(tx => {
          if (tx) {
            setTransaction(tx);
          }
          setIsIdle();
        });
      }
    }
  }, [
    memo,
    selectedAsset?.type,
    handleMakeFtTransaction,
    isActive,
    notLoaded,
    setTransaction,
    amount,
    recipient,
    setIsLoading,
    setIsIdle,
    handleMakeStxTransaction,
    transaction,
    isLoading,
  ]);
}
