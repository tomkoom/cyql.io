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
  stable var projectsV1Entries : [(T_Archive.ProjectId, T_Archive.Project)] = [];
  let projectsV1 = HashMap.fromIter<T_Archive.ProjectId, T_Archive.Project>(projectsV1Entries.vals(), 10, Nat.equal, Hash.hash);

  // curated projects v2
  stable var projectsV2Entries : [(T.ProjectId, T.Project)] = [];
  let projectsV2 = HashMap.fromIter<T.ProjectId, T.Project>(projectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // archive
  stable var curatedProjectsEntries_archive : [(T.ProjectId, T.Project)] = [];
  let curatedProjects_archive = HashMap.fromIter<T.ProjectId, T.Project>(projectsV2Entries.vals(), 100, Nat.equal, Hash.hash);

  // ...

  public shared ({ caller }) func addProject(project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    let projectId = Int.abs(Time.now());
    projectsV2.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProject(projectId : T.ProjectId, project : T.Project) : async ?T.ProjectId {
    assert (caller == frontendAdmin1Principal or caller == frontendAdmin2Principal);
    projectsV2.put(projectId, project);
    return ?projectId
  };

  public shared ({ caller }) func removeProject(projectId : T.ProjectId) : async ?T.Project {
    assert Utils.isAdmin(caller);
    let removed = projectsV2.remove(projectId);
    return removed
  };

  // query

  public query func listProjects(feSecret : T.Secret) : async [T.Project] {
    assert (secret == feSecret);
    let iter : Iter.Iter<T.Project> = projectsV2.vals();
    return Iter.toArray<T.Project>(iter)
  };

  public query func getActiveProjectsNum(feSecret : T.Secret) : async Nat {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    return activeProjects.size()
  };

  public query func getProjectById(feSecret : T.Secret, id : T.ProjectId) : async ?T.Project {
    assert (secret == feSecret);
    return projectsV2.get(id)
  };

  // ...

  public shared ({ caller }) func updateUpvote(feSecret : T.Secret, projectId : T.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != feSecret) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = projectsV2.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId)
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _removed = upvotedByBuf.remove(idx)
    };

    projectsV2.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
    return Nat.toText(projectId)
  };

  // filter, sort, paginate

  public query func getProjects(args : T.GetProjectsArgs) : async ?T.GetProjectsResult {
    assert (secret == args.secret);
    let { q; category; openSource; onChain; sort; selectedPage; itemsPerPage } = args;

    // get projectsV1
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

  public query func getNewProjects(feSecret : T.Secret, length : T.Length) : async [T.Project] {
    assert (secret == feSecret);
    let activeProjects = _getActiveProjects();
    let sorted = Handle.sort(activeProjects, #newest_first);
    let sliced = Array.slice(sorted, 0, length);
    return Iter.toArray<T.Project>(sliced)
  };

  public query func getHighlightedProjects(feSecret : T.Secret, category : T.Category, length : T.Length) : async [T.Project] {
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
    let iter : Iter.Iter<T.Project> = projectsV2.vals();
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
    projectsV1Entries := Iter.toArray(projectsV1.entries());
    projectsV2Entries := Iter.toArray(projectsV2.entries());
    // ...
    curatedProjectsEntries_archive := Iter.toArray(curatedProjects_archive.entries())
  };

  system func postupgrade() {
    projectsV1Entries := [];
    projectsV2Entries := [];
    // ...
    curatedProjectsEntries_archive := []
  }
}
