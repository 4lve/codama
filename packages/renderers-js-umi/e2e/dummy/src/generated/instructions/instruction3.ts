/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  Context,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u32,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Data.
export type Instruction3InstructionData = { discriminator: number };

export type Instruction3InstructionDataArgs = {};

export function getInstruction3InstructionDataSerializer(): Serializer<
  Instruction3InstructionDataArgs,
  Instruction3InstructionData
> {
  return mapSerializer<
    Instruction3InstructionDataArgs,
    any,
    Instruction3InstructionData
  >(
    struct<Instruction3InstructionData>([['discriminator', u32()]], {
      description: 'Instruction3InstructionData',
    }),
    (value) => ({ ...value, discriminator: 42 })
  ) as Serializer<Instruction3InstructionDataArgs, Instruction3InstructionData>;
}

// Instruction.
export function instruction3(
  context: Pick<Context, 'programs'>
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'dummy',
    'Dummy1111111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {} satisfies ResolvedAccountsWithIndices;

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts as ResolvedAccountsWithIndices
  );

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getInstruction3InstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}