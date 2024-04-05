import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";

// services
import Users "./users/users_interface";

// ...
import T "types";
import U "utils";
import C "_constants";

actor {

  // canisters

  let users = actor (C.usersCanisterId) : Users.Self;

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
