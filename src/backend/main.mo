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
  let daoParams = U.daoParamsInitial;

  // maps

  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  // proposals

  stable var projectProposalsEntries : [(T.ProjectProposalId, T.ProjectProposal)] = [];
  let projectProposals = HashMap.fromIter<T.ProjectProposalId, T.ProjectProposal>(projectProposalsEntries.vals(), 10, Nat.equal, Hash.hash);

  // curated projects

  public shared ({ caller }) func addProject(project : T.Project) : async ?T.ProjectId {
    // verify caller
    let projectId = projects.size();
    projects.put(projectId, { project with id = projectId });
    ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    // verify caller
    projects.put(projectId, project);
    ?projectId
  };

  public shared ({ caller }) func deleteProject(projectId : T.ProjectId) : async ?T.ProjectId {
    assert U.isAdmin(caller);
    projects.delete(projectId);
    ?projectId
  };

  public query func listProjects() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    return Iter.toArray<T.Project>(iter)
  };

  // public query func listProjectsPaginated() : async [T.Project] {
  //   let iter : Iter.Iter<T.Project> = projects.vals();
  //   let arr = Iter.toArray(iter);
  //   let reversed = Array.reverse(arr);
  //   return Iter.toArray<T.Project>(iter)
  // };

  public shared ({ caller }) func updateUpvote(projectId : T.ProjectId) : async ?T.ProjectId {
    // add assert upvoter is user
    assert (not U.isAnon(caller));

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return null;
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return null;
      let removed = upvotedByBuf.remove(idx)
    };

    projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return ?projectId
  };

  // users

  public shared ({ caller }) func registerUser() : async ?Text {
    assert (not U.isAnon(caller));
    return await users.registerUser(caller)
  };

  public func usersNum() : async Nat {
    return await users.usersNum()
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // -- dao --

  public shared ({ caller }) func createProposal(payload : T.ProjectData) : async Result.Result<T.ProjectProposalId, Text> {
    assert (not U.isAnon(caller));
    let user = users.getUser(caller) else return #err("User not found.");
    // verify caller
    let proposal = U.generateProposal(caller, payload);

    proposalsPut(proposal.id, proposal);
    return #ok(proposal.id)
  };

  public shared ({ caller }) func removeProposal(proposalId : T.ProjectProposalId) : async ?T.ProjectProposal {
    assert (U.isAdmin(caller));
    return projectProposals.remove(proposalId)
  };

  public query func listProposals() : async [T.ProjectProposal] {
    let iter : Iter.Iter<T.ProjectProposal> = projectProposals.vals();
    return Iter.toArray<T.ProjectProposal>(iter)
  };

  // vote on proposal
  public shared ({ caller }) func vote(args : T.VoteArgs) : async Result.Result<T.ProposalState, Text> {
    let ?proposal = projectProposals.get(args.proposalId) else return #err("Proposal not found.");
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
        let voted = hasVoted(voter, args.proposalId);
        if (voted) return #err("Already voted.");

        switch (args.vote) {
          case (#yes) { votersYes += 1; votesYes += votingPower };
          case (#no) { votersNo += 1; votesNo += votingPower }
        };

        if (votesYes >= daoParams.proposalVoteThreshold) {
          // todo: refund the proposal deposit when there are tokens and the proposal is accepted
          state := #accepted
        };

        if (votesNo >= daoParams.proposalVoteThreshold) {
          state := #rejected
        };

        let updatedProposal = {
          id = proposal.id;
          state;
          createdAt = proposal.createdAt;
          updatedAt = proposal.updatedAt;
          proposer = proposal.proposer;
          payload = proposal.payload;

          // votes
          votersYes;
          votersNo;
          votesYes;
          votesNo;
          voters = Buffer.toArray(votersBuf)
        };

        proposalsPut(args.proposalId, updatedProposal);
        return #ok(state)
      }
    }
  };

  // get voting power based on the amount of the nfts user has
  private func _calculateVotingPower(userAccIdHex : Text) : async Nat {
    var votingPower = 1;
    let registry = await nft.getRegistry();

    for (nft in registry.vals()) {
      let (_ : Nft.TokenIndex, ownerAccIdHex : Nft.AccountIdentifier__1) = nft;
      if (ownerAccIdHex == userAccIdHex) votingPower += 10
    };
    return votingPower
  };

  public shared ({ caller }) func getVotingPower() : async Nat {
    let accountHex = U.principalToAccountHex(caller);
    return await _calculateVotingPower(accountHex)
  };

  // get the current dao params
  public query func getDaoParams() : async T.DaoParams {
    return daoParams
  };

  // query

  // public query func listAcceptedProjectProposals() : async [T.ProjectProposal] {
  //   let iter : Iter.Iter<T.ProjectProposal> = projectProposals.vals();
  //   // filter
  //   return Iter.toArray<T.ProjectProposal>(iter)
  // };

  // utils

  private func proposalsPut(proposalId : T.ProjectProposalId, proposal : T.ProjectProposal) : () {
    return projectProposals.put(proposalId, proposal)
  };

  private func proposalsGet(proposalId : T.ProjectProposalId) : ?T.ProjectProposal {
    return projectProposals.get(proposalId)
  };

  private func hasVoted(voter : T.Voter, proposalId : T.ProjectProposalId) : Bool {
    let ?proposal = proposalsGet(proposalId) else return false;
    let votersBuf = Buffer.fromArray<T.Voter>(proposal.voters);
    func equal(a : T.Voter, b : T.Voter) : Bool { return a.id == b.id };

    return Buffer.contains<T.Voter>(votersBuf, voter, equal)
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries());
    projectProposalsEntries := Iter.toArray(projectProposals.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    projectProposalsEntries := []
  }
}
