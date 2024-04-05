import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
// import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";

// services
import Users "../users/users_interface";
import Nft "../nft_interface";

// ...
// import UT "../users/users_types";
import T "./project_proposals_types";
import U "../utils";
import C "../_constants";

shared actor class DAO(init : T.DaoStableStorage) = Self {

  // constants

  stable var initialVp = 1;
  stable var nftVpMultiplier = 10;

  // dao params

  stable var systemParams = init.systemParams;

  // canisters

  let users = actor (C.usersCanisterId) : Users.Self;
  let nft = actor (C.nftCanisterId) : Nft.Self;

  // maps

  stable var proposalsEntries : [(T.ProposalId, T.Proposal)] = [];
  let proposals = HashMap.fromIter<T.ProposalId, T.Proposal>(proposalsEntries.vals(), 10, Nat.equal, Hash.hash);

  // -- manage --

  public shared ({ caller }) func createProposal(payload : T.Payload) : async Result.Result<T.ProposalId, Text> {
    assert (not U.isAnon(caller));
    let u = await users.getUser(caller);

    // verify caller
    switch (u) {
      case (null) { return #err("User not found.") };
      case (user) {
        let proposal = U.generateProposal(caller, payload);
        _proposalsPut(proposal.id, proposal);
        return #ok(proposal.id)
      }
    }
  };

  // to rm
  public shared ({ caller }) func removeProposal(proposalId : T.ProposalId) : async ?T.Proposal {
    assert (U.isAdmin(caller));
    return proposals.remove(proposalId)
  };

  // -- query --

  public query func listProposals() : async [T.Proposal] {
    let iter : Iter.Iter<T.Proposal> = proposals.vals();
    return Iter.toArray<T.Proposal>(iter)
  };

  // -- update --

  // vote on proposal
  public shared ({ caller }) func vote(args : T.VoteArgs) : async Result.Result<T.ProposalState, Text> {
    let ?proposal = proposals.get(args.proposalId) else return #err("Proposal not found.");
    let u = await users.getUser(caller);

    switch (u) {
      case (null) { return #err("User not found.") };
      case (user) {
        var state = proposal.state;
        var votersYes = proposal.votersYes;
        var votersNo = proposal.votersNo;
        var votesYes = proposal.votesYes;
        var votesNo = proposal.votesNo;

        // ...
        let voter = { id = Principal.toText(caller); votedAt = Time.now() };
        let votersBuf = Buffer.fromArray<T.Voter>(proposal.voters);
        votersBuf.add(voter);

        // get voting power
        let accountHex = U.principalToAccountHex(caller);
        let votingPower = await _calculateVotingPower(accountHex);

        // verify
        if (state != #open) return #err("Proposal isn't open for voting.");
        let voted = _hasVoted(voter, args.proposalId);
        if (voted) return #err("Already voted.");

        switch (args.vote) {
          case (#yes) { votersYes += 1; votesYes += votingPower };
          case (#no) { votersNo += 1; votesNo += votingPower }
        };

        if (votesYes >= systemParams.proposalVoteThreshold) {
          // todo: refund the proposal deposit when there are tokens and the proposal is accepted
          state := #accepted
        };

        if (votesNo >= systemParams.proposalVoteThreshold) {
          state := #rejected
        };

        let updatedProposal = {
          id = proposal.id;
          state;
          createdAt = proposal.createdAt;
          updatedAt = proposal.updatedAt;
          proposer = proposal.proposer;
          payload = proposal.payload;
          upvotes = proposal.upvotes;

          // votes
          votersYes;
          votersNo;
          votesYes;
          votesNo;
          voters = Buffer.toArray(votersBuf)
        };

        _proposalsPut(args.proposalId, updatedProposal);
        return #ok(state)
      }
    }
  };

  // edit / update
  // ...

  // nft, voting power

  // get voting power based on the amount of the nfts user has
  private func _calculateVotingPower(userAccIdHex : Text) : async Nat {
    let tokens = await nft.tokens(userAccIdHex);

    switch (tokens) {
      case (#ok(tokens)) {
        let nftVp = tokens.size() * nftVpMultiplier;
        let votingPower = initialVp + nftVp;
        return votingPower
      };
      case (#err(msg)) {
        return 0
      }
    }
  };

  public shared ({ caller }) func getVotingPower() : async Nat {
    assert (not U.isAnon(caller));
    // assert is user
    let accountHex = U.principalToAccountHex(caller);
    return await _calculateVotingPower(accountHex)
  };

  // utils

  private func _proposalsPut(proposalId : T.ProposalId, proposal : T.Proposal) : () {
    return proposals.put(proposalId, proposal)
  };

  private func _proposalsGet(proposalId : T.ProposalId) : ?T.Proposal {
    return proposals.get(proposalId)
  };

  private func _hasVoted(voter : T.Voter, proposalId : T.ProposalId) : Bool {
    let ?proposal = _proposalsGet(proposalId) else return false;
    let votersBuf = Buffer.fromArray<T.Voter>(proposal.voters);
    func equal(a : T.Voter, b : T.Voter) : Bool { return a.id == b.id };
    return Buffer.contains<T.Voter>(votersBuf, voter, equal)
  };

  // stable

  system func preupgrade() {
    proposalsEntries := Iter.toArray(proposals.entries())
  };

  system func postupgrade() {
    proposalsEntries := []
  }
}
