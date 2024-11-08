/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  ACCOUNT_HEADER_SIZE,
  transactionBuilder,
  type Context,
  type PublicKey,
  type Signer,
  type TransactionBuilder,
} from '@metaplex-foundation/umi';
import {
  mapSerializer,
  publicKey as publicKeySerializer,
  struct,
  type Serializer,
  u32,
  u64,
} from '@metaplex-foundation/umi/serializers';
import {
  getAccountMetasAndSigners,
  type ResolvedAccount,
  type ResolvedAccountsWithIndices,
} from '../shared';

// Accounts.
export type CreateAccountInstructionAccounts = {
  payer?: Signer;
  newAccount: Signer;
};

// Data.
export type CreateAccountInstructionData = {
  discriminator: number;
  lamports: bigint;
  space: bigint;
  programAddress: PublicKey;
};

export type CreateAccountInstructionDataArgs = {
  lamports: number | bigint;
  space: number | bigint;
  programAddress: PublicKey;
};

export function getCreateAccountInstructionDataSerializer(): Serializer<
  CreateAccountInstructionDataArgs,
  CreateAccountInstructionData
> {
  return mapSerializer<
    CreateAccountInstructionDataArgs,
    any,
    CreateAccountInstructionData
  >(
    struct<CreateAccountInstructionData>(
      [
        ['discriminator', u32()],
        ['lamports', u64()],
        ['space', u64()],
        ['programAddress', publicKeySerializer()],
      ],
      { description: 'CreateAccountInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 0 })
  ) as Serializer<
    CreateAccountInstructionDataArgs,
    CreateAccountInstructionData
  >;
}

// Args.
export type CreateAccountInstructionArgs = CreateAccountInstructionDataArgs;

// Instruction.
export function createAccount(
  context: Pick<Context, 'payer' | 'programs'>,
  input: CreateAccountInstructionAccounts & CreateAccountInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'system',
    '11111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {
    payer: {
      index: 0,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    newAccount: {
      index: 1,
      isWritable: true as boolean,
      value: input.newAccount ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateAccountInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getCreateAccountInstructionDataSerializer().serialize(
    resolvedArgs as CreateAccountInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = Number(input.space) + ACCOUNT_HEADER_SIZE;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
