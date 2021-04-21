import React from 'react';
import { DecodedAuthRequest } from './dev/types';
import { wordlists } from 'bip39';
import { FinishedTxPayload } from '@stacks/connect';
import { isValidUrl } from './validate-url';
import { getTab, deleteTabForRequest, StorageKey } from '@extension/storage';
import {
  AuthenticationResponseMessage,
  MESSAGE_SOURCE,
  Methods,
  TransactionResponseMessage,
} from '@extension/message-types';
import { BufferReader, deserializePostCondition, PostCondition } from '@stacks/transactions';
import { KEBAB_REGEX } from '@common/constants';

function kebabCase(str: string) {
  return str.replace(KEBAB_REGEX, match => '-' + match.toLowerCase());
}

export const getEventSourceWindow = (event: MessageEvent) => {
  const isWindow =
    !(event.source instanceof MessagePort) && !(event.source instanceof ServiceWorker);
  if (isWindow) {
    return event.source as Window;
  }
  return null;
};

interface FinalizeAuthParams {
  decodedAuthRequest: DecodedAuthRequest;
  authResponse: string;
  authRequest: string;
}

/**
 * Call this function at the end of onboarding.
 *
 * We fetch the ID of the tab that originated this request from a data store.
 * Then, we send a message back to that tab, which is handled by the content script
 * of the extension.
 *
 */
export const finalizeAuthResponse = ({
  decodedAuthRequest,
  authRequest,
  authResponse,
}: FinalizeAuthParams) => {
  const dangerousUri = decodedAuthRequest.redirect_uri;
  if (!isValidUrl(dangerousUri)) {
    throw new Error('Cannot proceed with malicious url');
  }
  try {
    const tabId = getTab(StorageKey.authenticationRequests, authRequest);
    const responseMessage: AuthenticationResponseMessage = {
      source: MESSAGE_SOURCE,
      payload: {
        authenticationRequest: authRequest,
        authenticationResponse: authResponse,
      },
      method: Methods.authenticationResponse,
    };
    chrome.tabs.sendMessage(tabId, responseMessage);
    deleteTabForRequest(StorageKey.authenticationRequests, authRequest);
    window.close();
  } catch (error) {
    console.debug('Failed to get Tab ID for authentication request:', authRequest);
    throw new Error(
      'Your transaction was broadcasted, but we lost communication with the app you started with.'
    );
  }
};

export const finalizeTxSignature = (requestPayload: string, data: FinishedTxPayload) => {
  console.log(requestPayload, data);
  try {
    const tabId = getTab(StorageKey.transactionRequests, requestPayload);
    const responseMessage: TransactionResponseMessage = {
      source: MESSAGE_SOURCE,
      method: Methods.transactionResponse,
      payload: {
        transactionRequest: requestPayload,
        transactionResponse: data,
      },
    };
    chrome.tabs.sendMessage(tabId, responseMessage);
    deleteTabForRequest(StorageKey.transactionRequests, requestPayload);
    window.close();
  } catch (error) {
    console.debug('Failed to get Tab ID for transaction request:', requestPayload);
    throw new Error(
      'Your transaction was broadcasted, but we lost communication with the app you started with.'
    );
  }
};

export const getRandomWord = () => {
  const list = wordlists.EN;
  return list[Math.floor(Math.random() * list.length)];
};

export function stringToHslColor(str: string, saturation: number, lightness: number): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

export function extractPhraseFromString(value: string) {
  const clean = value.trim();
  const words = clean.match(/\S+/g);
  if (words?.length) {
    return words
      .map(word => (word.match(/[^0-9]+/g) ? word : null))
      .filter(Boolean)
      .join(' ');
  } else {
    return clean;
  }
}

export function extractPhraseFromPasteEvent(event: React.ClipboardEvent) {
  const pasted = event.clipboardData.getData('Text');
  return extractPhraseFromString(pasted);
}

export function validateAndCleanRecoveryInput(value: string) {
  const cleaned = value.trim();
  // Base64 encoded encrypted phrase
  let cleanedEncrypted = cleaned.replace(/\s/gm, '');
  const isPossibleRecoveryKey = /^[a-zA-Z0-9\+\/]+=?$/.test(cleanedEncrypted);

  if (isPossibleRecoveryKey && cleanedEncrypted.slice(-1) !== '=') {
    // Append possibly missing equals sign padding
    cleanedEncrypted = `${cleanedEncrypted}=`;
  }
  if (cleanedEncrypted.length >= 108) {
    return {
      isValid: true,
      value: cleanedEncrypted,
    };
  }
  return { isValid: false, value };
}

export const hasLineReturn = (input: string) => input.includes('\n');

export function makeTxExplorerLink(txid: string, chain: 'mainnet' | 'testnet') {
  return `https://explorer.stacks.co/txid/${txid}?chain=${chain}`;
}

export function truncateString(str: string, maxLength: number) {
  if (str.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + '...';
}

function getLetters(string: string, offset = 1) {
  return string.slice(0, offset);
}

export function getTicker(value: string) {
  let name = kebabCase(value);
  if (name.includes('-')) {
    const words = name.split('-');
    if (words.length >= 3) {
      name = `${getLetters(words[0])}${getLetters(words[1])}${getLetters(words[2])}`;
    } else {
      name = `${getLetters(words[0])}${getLetters(words[1], 2)}`;
    }
  } else if (name.length >= 3) {
    name = `${getLetters(name, 3)}`;
  }
  return name.toUpperCase();
}

export function postConditionFromString(postCondition: string): PostCondition {
  const reader = BufferReader.fromBuffer(Buffer.from(postCondition, 'hex'));
  return deserializePostCondition(reader);
}
