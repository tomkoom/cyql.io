import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Buffer "mo:base/Buffer";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Array "mo:base/Array";

// ...
import T "./main_types";
import T_Archive "./types";
import Constants "./_constants";
import Utils "./utils";
import Handle "./utils/handleProjects";

shared actor class _CURATED_PROJECTS() = Self {

  let adminPrincipal = Principal.fromText(Constants.adminId);
  let frontendAdmin1Principal = Principal.fromText(Constants.frontendAdminId1);
  let frontendAdmin2Principal = Principal.fromText(Constants.frontendAdminId2);
  stable var secret : T.Secret = "";

  // maps

  // curated projects v1
  stable var projectsEntries : [(T_Archive.ProjectId, T_Archive.Project)] = [];
  let projects = HashMap.fromIter<T_Archive.ProjectId, T_Archive.Project>(projectsEntries.vals(), 10, Nat.equal, Hash.hash);

  // curated projects v2
  stable var curatedProjectsV2Entries : [(T.ProjectId, T.Project)] = [];
  let curatedProjectsV2 = HashMap.fromIter<T.ProjectId, T.Project>(curatedProjectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // curated projects sorted
  stable var curatedProjectsEntries : [(T.ProjectId, T.Project)] = [];
  let curatedProjects = HashMap.fromIter<T.ProjectId, T.Project>(curatedProjectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // ...
  // curated projects v2

  public shared ({ caller }) func addProjectV2(project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    let projectId = Int.abs(Time.now());
    curatedProjectsV2.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProjectV2(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    curatedProjectsV2.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func removeProjectV2(projectId : T.ProjectId) : async ?T.Project {
    assert Utils.isAdmin(caller);
    let removed = curatedProjectsV2.remove(projectId);
    return removed
  };

  public shared ({ caller }) func getProjectV2(projectId : T.ProjectId) : async ?T.Project {
    assert Utils.isAdmin(caller);
    return curatedProjectsV2.get(projectId)
  };

  // query

  public query func listProjectsV2(feSecret : T.Secret) : async [T.Project] {
    assert (secret == feSecret);
    let iter : Iter.Iter<T.Project> = curatedProjectsV2.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public query func getActiveProjectsNum(feSecret : T.Secret) : async Nat {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    return activeProjects.size()
  };

  public query func getProjectById(feSecret : T.Secret, id : T.ProjectId) : async ?T.Project {
    assert (secret == feSecret);
    return curatedProjectsV2.get(id)
  };

  // ...

  public shared ({ caller }) func updateUpvoteV2(feSecret : T.Secret, projectId : T.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != feSecret) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = curatedProjectsV2.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _removed = upvotedByBuf.remove(idx)
    };

    curatedProjectsV2.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return Nat.toText(projectId)
  };

  // filter, sort, paginate

  public query func getProjects(args : T.GetProjectsArgs) : async ?T.GetProjectsResult {
    assert (secret == args.secret);
    let { q; category; openSource; onChain; sort; selectedPage; itemsPerPage } = args;

    // get projects
    let activeProjects = _getActiveProjects();

    // filter, sort, paginate
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let filteredByOpenSource = Handle.filterByOpenSource(filteredByCategory, openSource);
    let filteredByOnchain = Handle.filterByOnchain(filteredByOpenSource, onChain);
    let sorted = Handle.sort(filteredByOnchain, sort);
    let ?paginated = Handle.paginate(sorted, selectedPage, itemsPerPage) else return null;

    let res : T.GetProjectsResult = {
      paginated with
      q;
      category;
      openSource;
      onChain;
      sort
    };
    return ?res
  };

  // homepage

  public query func getNewProjects(feSecret : T.Secret, length : Nat) : async [T.Project] {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    let sorted = Handle.sort(activeProjects, #newest_first);
    let sliced = Array.slice(sorted, 0, length);
    return Iter.toArray<T.Project>(sliced)
  };

  public query func getHighlightedProjects(feSecret : T.Secret, category : Text, length : Nat) : async [T.Project] {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let sorted = Handle.sort(filteredByCategory, #newest_first);
    let sliced = Array.slice(sorted, 0, length);
    return Iter.toArray<T.Project>(sliced)
  };

  // admin

  public shared query ({ caller }) func showSecret() : async Text {
    assert (caller == adminPrincipal);
    return secret
  };

  public shared ({ caller }) func updateSecret(newSecret : T.Secret) : async Text {
    assert (caller == adminPrincipal);
    secret := newSecret;
    return "ok"
  };

  // utils

  private func _getActiveProjects() : [T.Project] {
    let iter : Iter.Iter<T.Project> = curatedProjectsV2.vals();
    let allProjects = Iter.toArray<T.Project>(iter);
    let activeProjects = Array.filter<T.Project>(allProjects, func(p) { p.archived == false });
    return activeProjects
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries());
    curatedProjectsV2Entries := Iter.toArray(curatedProjectsV2.entries());
    // sorted
    curatedProjectsEntries := Iter.toArray(curatedProjects.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    curatedProjectsV2Entries := [];
    // sorted
    curatedProjectsEntries := []
  }
}
