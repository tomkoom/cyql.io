export const idlFactory = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
  const SystemParams = IDL.Record({
    'proposalVoteThreshold' : IDL.Nat,
    'transferFee' : Tokens,
    'proposalSubmissionDeposit' : Tokens,
  });
  const DaoStableStorage = IDL.Record({ 'systemParams' : SystemParams });
  const Payload = IDL.Text;
  const ProposalId = IDL.Nat;
  const Result_1 = IDL.Variant({ 'ok' : ProposalId, 'err' : IDL.Text });
  const Voter = IDL.Record({ 'id' : IDL.Text, 'votedAt' : IDL.Int });
  const ProposalState = IDL.Variant({
    'open' : IDL.Null,
    'rejected' : IDL.Null,
    'accepted' : IDL.Null,
    'failed' : IDL.Text,
  });
  const Proposal = IDL.Record({
    'id' : ProposalId,
    'votersYes' : IDL.Nat,
    'votersNo' : IDL.Nat,
    'votesYes' : IDL.Nat,
    'createdAt' : IDL.Int,
    'voters' : IDL.Vec(Voter),
    'updatedAt' : IDL.Opt(IDL.Int),
    'state' : ProposalState,
    'votesNo' : IDL.Nat,
    'proposer' : IDL.Text,
    'payload' : Payload,
  });
  const Vote = IDL.Variant({ 'no' : IDL.Null, 'yes' : IDL.Null });
  const VoteArgs = IDL.Record({ 'vote' : Vote, 'proposalId' : IDL.Nat });
  const Result = IDL.Variant({ 'ok' : ProposalState, 'err' : IDL.Text });
  const DAO = IDL.Service({
    'createProposal' : IDL.Func([Payload], [Result_1], []),
    'getVotingPower' : IDL.Func([], [IDL.Nat], []),
    'listProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'removeProposal' : IDL.Func([ProposalId], [IDL.Opt(Proposal)], []),
    'vote' : IDL.Func([VoteArgs], [Result], []),
  });
  return DAO;
};
export const init = ({ IDL }) => {
  const Tokens = IDL.Record({ 'amount_e8s' : IDL.Nat });
  const SystemParams = IDL.Record({
    'proposalVoteThreshold' : IDL.Nat,
    'transferFee' : Tokens,
    'proposalSubmissionDeposit' : Tokens,
  });
  const DaoStableStorage = IDL.Record({ 'systemParams' : SystemParams });
  return [DaoStableStorage];
};
