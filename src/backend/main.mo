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

// canisters
import Users "users_interface";

// ...
import T "types";
import U "utils";
import C "_constants";

actor {
  // canisters
  let usersCanister = actor (C.usersCanisterId) : Users.Self;

  stable var projectsEntries : [(T.ProjectId, T.Project)] = [];
  let projects = HashMap.fromIter<T.ProjectId, T.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  // text data
  stable var projects2Entries : [(T.ProjectId, T.Project2)] = [];
  let projects2 = HashMap.fromIter<T.ProjectId, T.Project2>(projects2Entries.vals(), 10, Nat.equal, Hash.hash);

  // project proposals
  stable var projectProposalsEntries : [(T.ProjectProposalId, T.ProjectProposal)] = [];
  let projectProposals = HashMap.fromIter<T.ProjectProposalId, T.ProjectProposal>(projectProposalsEntries.vals(), 10, Nat.equal, Hash.hash);

  // projects2

  public shared ({ caller }) func addProject2(project : T.Project) : async ?T.ProjectId {
    let projectId = projects2.size();
    projects.put(projectId, { project with id = projectId });
    ?projectId
  };

  // projects

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

  // project actions

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
    let userId = caller;
    return await usersCanister.registerUser(userId)
  };

  public func usersNum() : async Nat {
    return await usersCanister.usersNum()
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // dao

  public shared ({ caller }) func proposeProject(projectData : T.ProjectData) : async ?T.ProjectProposalId {
    assert (not U.isAnon(caller));
    // verify proposer

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
      votesYesTokens = { e8s = 0 };
      votesNoTokens = { e8s = 0 };

      // data
      projectData
    };

    projectProposals.put(id, proposal);
    ?id
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries());
    projects2Entries := Iter.toArray(projects2.entries());
    projectProposalsEntries := Iter.toArray(projectProposals.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    projects2Entries := [];
    projectProposalsEntries := []
  }
}
