import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Result "mo:base/Result";

// services
import Users "users_interface";
import Nft "nft_interface";

// ...
import T "types";
import U "utils";
import C "_constants";

actor {

  // canisters

  let users = actor (C.usersCanisterId) : Users.Self;
  let nft = actor (C.nftCanisterId) : Nft.Self;

  // maps

  stable var proposalsEntries : [(T.ProjectProposalId, T.ProjectProposal)] = [];
  let proposals = HashMap.fromIter<T.ProjectProposalId, T.ProjectProposal>(proposalsEntries.vals(), 10, Nat.equal, Hash.hash);

  // manage

  public shared ({ caller }) func createProposal(payload : T.ProjectData) : async Result.Result<T.ProjectProposalId, Text> {
    assert (not U.isAnon(caller));
    let u = await users.getUser(caller);

    // verify caller
    switch (u) {
      case (null) { return #err("User not found.") };
      case (user) {
        let proposal = U.generateProposal(caller, payload);
        proposalsPut(proposal.id, proposal);
        return #ok(proposal.id)
      }
    }
  };

  // to rm
  public shared ({ caller }) func removeProposal(proposalId : T.ProjectProposalId) : async ?T.ProjectProposal {
    assert (U.isAdmin(caller));
    return proposals.remove(proposalId)
  };

  // utils

  private func proposalsPut(proposalId : T.ProjectProposalId, proposal : T.ProjectProposal) : () {
    return proposals.put(proposalId, proposal)
  };

  private func proposalsGet(proposalId : T.ProjectProposalId) : ?T.ProjectProposal {
    return proposals.get(proposalId)
  };

  private func hasVoted(voter : T.Voter, proposalId : T.ProjectProposalId) : Bool {
    let ?proposal = proposalsGet(proposalId) else return false;
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
