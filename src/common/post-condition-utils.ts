import { addressToString, parsePrincipalString, PostCondition } from '@stacks/transactions';
import { postConditionFromString } from '@common/utils';

/**
 * This method will update a post conditions principal
 * value to the current address principal if and only if
 * the `stxAddress` value from the original tx payload
 * matches the address in the original post condition
 *
 * This is used when a user might switch accounts during
 * the signing process. One can assume that if the post
 * condition has the principal set to the same value as the
 * `stxAddress` value, it should be updated when they switch
 * accounts.
 */
export function handlePostConditions(
  postConditions: (PostCondition | string)[],
  payloadAddress: string,
  currentAddress: string
): PostCondition[] {
  const payloadPrincipal = parsePrincipalString(payloadAddress);
  const currentAddressPrincipal = parsePrincipalString(currentAddress);

  console.log('Setting up post conditions for transaction request');
  return postConditions.map((postCondition, index) => {
    const { principal, ...payload } = getPostCondition(postCondition);
    console.log({ principal: addressToString(principal.address) });
    const sameType = payloadPrincipal.address.type === principal.address.type;
    const sameHash = payloadPrincipal.address.hash160 === principal.address.hash160;
    const isOriginatorAddress = sameHash && sameType;
    console.log(`[Post Conditions #${index + 1}]: isOriginatorAddress: ${isOriginatorAddress}`);
    return {
      ...payload,
      principal: isOriginatorAddress ? currentAddressPrincipal : principal,
    };
  });
}

export function getPostCondition(postCondition: string | PostCondition): PostCondition {
  return typeof postCondition === 'string' ? postConditionFromString(postCondition) : postCondition;
}
