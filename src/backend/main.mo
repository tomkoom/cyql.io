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
import List "mo:base/List";

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
    let projectId = projects.size();
    projects.put(projectId, { project with id = projectId });
    ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    projects.put(projectId, project);
    ?projectId
  };

  public query func listProjects() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public query func listProjectsPaginated() : async [T.Project] {
    let iter : Iter.Iter<T.Project> = projects.vals();
    let arr = Iter.toArray(iter);
    let reversed = Array.reverse(arr);
    return Iter.toArray<T.Project>(iter)
  };

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

  // dao

  public shared ({ caller }) func proposeProject(payload : T.ProjectData) : async ?T.ProjectProposalId {
    assert (not U.isAnon(caller));
    let user = users.getUser(caller) else return null;

    let id = projectProposals.size();
    let timestamp = Time.now();

    let proposal = {
      id;
      createdAt = timestamp;
      updatedAt = null;
      proposer = Principal.toText(caller);
      state = #open;

      // votes
      votersYes = 0;
      votersNo = 0;
      votesYes = 0;
      votesNo = 0;
      // votesYesTokens = { e8s = 0 };
      // votesNoTokens = { e8s = 0 };
      voters = [];

      // data
      payload
    };

    proposalsPut(id, proposal);
    return ?id
  };

  // vote on proposal
  public shared ({ caller }) func vote(args : T.VoteArgs) : async ?T.ProposalState {
    let ?proposal = projectProposals.get(args.proposalId) else return null;
    let ?u = await users.getUser(caller) else return null;

    // votes
    var state = proposal.state;
    var votersYes = proposal.votersYes;
    var votersNo = proposal.votersNo;
    var votesYes = proposal.votesYes;
    var votesNo = proposal.votesNo;

    // verify
    if (state != #open) return null;
    // check if haven't voted

    let voter = { id = Principal.toText(caller); votedAt = Time.now() };
    let votersBuf = Buffer.fromArray<T.Voter>(proposal.voters);
    votersBuf.add(voter);
    let votingPower = await calculateVotingPower(caller);

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
    return ?state
  };

  // get voting power based on the amount of the nfts user has
  private func calculateVotingPower(userPrincipal : Principal) : async Nat {
    let initialVp = 1;
    let principalOwnsOne = await nft.principalOwnsOne(userPrincipal);
    if (principalOwnsOne) {
      return 50 + initialVp
    } else { return initialVp }
  };

  // get the current dao params
  public query func getDaoParams() : async T.DaoParams {
    return daoParams
  };

  // query

  public query func listProjectProposals() : async [T.ProjectProposal] {
    let iter : Iter.Iter<T.ProjectProposal> = projectProposals.vals();
    return Iter.toArray<T.ProjectProposal>(iter)
  };

  // public query func listAcceptedProjectProposals() : async [T.ProjectProposal] {
  //   let iter : Iter.Iter<T.ProjectProposal> = projectProposals.vals();
  //   // filter
  //   return Iter.toArray<T.ProjectProposal>(iter)
  // };

  // utils

  private func proposalsPut(proposalId : T.ProjectProposalId, proposal : T.ProjectProposal) : () {
    return projectProposals.put(proposalId, proposal)
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
