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
import Bool "mo:base/Bool";
import Order "mo:base/Order";

import Types "./types";
import TypesV2 "./types_v2";
import Constants "./constants";
import Category "./categories";
import Utils "./utils";
import Handle "./utils/handleProjects";
import Assets "./assets/assets";
import Collections "./collections/collections";
import ProjectsV2 "./projects_v2/projects_v2";
import AdminAuth "./utils/adminAuth";
import ApiKeyAuth "./utils/apiKeyAuth";

shared persistent actor class _CURATED_PROJECTS() = Self {
  transient let assets_canister_id = "uodzj-4aaaa-aaaag-auexa-cai";

  private var secret : Types.ApiKey = "";
  // private var apiKeys : [Types.ApiKey] = [];
  transient let admin1 = Principal.fromText(Constants.admin1);
  transient let nodeAdmin1 = Principal.fromText(Constants.nodeAdmin1);
  transient let clientAdmin1 = Principal.fromText(Constants.clientAdmin1);
  transient let clientAdmin2 = Principal.fromText(Constants.clientAdmin2);

  // Reference to categories
  transient let categories = Category.categories;

  // Custom hash function for Nat values
  private func natHash(n : Nat) : Hash.Hash {
    Text.hash(Nat.toText(n)) // Use text-based hashing for large numbers
  };

  // maps

  // categories map for efficient lookups
  var categoriesEntries : [(Text, Category.Category)] = [];
  transient let categoriesMap = HashMap.fromIter<Text, Category.Category>(
    categoriesEntries.vals(),
    50, // Initial capacity
    Text.equal,
    Text.hash,
  );

  // Initialize categories map if empty
  if (categoriesMap.size() == 0) {
    for (category in Category.categories.vals()) {
      categoriesMap.put(category.id, category)
    }
  };

  // projects
  var projectsEntries : [(Types.ProjectId, Types.Project)] = [];
  transient let projects = HashMap.fromIter<Types.ProjectId, Types.Project>(projectsEntries.vals(), 100, Nat.equal, natHash);

  // collections
  var collectionsEntries : [(Text, Collections.Collection)] = [];
  transient let collections = HashMap.fromIter<Text, Collections.Collection>(
    collectionsEntries.vals(),
    50,
    Text.equal,
    Text.hash,
  );

  // projects v2 - unified collection for both user-submitted and curated projects
  // Use listingStatus and isCurated fields to distinguish project states
  var projectsV2Entries : [(TypesV2.ICP_ProjectId, TypesV2.ICP_Project)] = [];
  transient let projectsV2 = HashMap.fromIter<TypesV2.ICP_ProjectId, TypesV2.ICP_Project>(
    projectsV2Entries.vals(),
    1_000,
    Text.equal,
    Text.hash,
  );

  // Category management functions
  public shared ({ caller }) func addCategory(category : Category.Category) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));

    switch (categoriesMap.get(category.id)) {
      case (?_existing) {
        // Category already exists
        return false
      };
      case null {
        categoriesMap.put(category.id, category);
        return true
      }
    }
  };

  public shared ({ caller }) func updateCategory(id : Text, category : Category.Category) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));

    switch (categoriesMap.get(id)) {
      case (?_existing) {
        categoriesMap.put(id, category);
        return true
      };
      case null { return false }
    }
  };

  public shared ({ caller }) func removeCategory(id : Text) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));

    switch (categoriesMap.remove(id)) {
      case (?_existing) { return true };
      case null { return false }
    }
  };

  public query func getCategory(id : Text) : async ?Category.Category {
    categoriesMap.get(id)
  };

  public query func getAllCategories() : async [Category.Category] {
    Iter.toArray(categoriesMap.vals())
  };

  // Collections management

  public shared ({ caller }) func addCollection(categoryId : Text, projectIds : [Types.ProjectId]) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));
    Collections.addCollection(collections, categoriesMap, categoryId, projectIds)
  };

  public shared ({ caller }) func updateCollection(categoryId : Text, projectIds : [Types.ProjectId]) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));
    Collections.updateCollection(collections, categoryId, projectIds)
  };

  public shared ({ caller }) func removeCollection(categoryId : Text) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));
    Collections.removeCollection(collections, categoryId)
  };

  public shared ({ caller }) func removeProjectFromCollection(categoryId : Text, projectId : Types.ProjectId) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));
    Collections.removeProjectFromCollection(collections, categoryId, projectId)
  };

  public shared ({ caller }) func toggleCollectionStatus(categoryId : Text) : async Bool {
    assert (AdminAuth.verifyAnyAdmin(caller));
    Collections.toggleCollectionStatus(collections, categoryId)
  };

  // Collections query

  public query func getCollection(apiKey : Types.ApiKey, categoryId : Text) : async ?Collections.Collection {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    Collections.getCollection(collections, categoryId)
  };

  public query func getAllCollections(apiKey : Types.ApiKey) : async [Collections.Collection] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    Collections.getAllCollections(collections)
  };

  public query func getActiveCollections(apiKey : Types.ApiKey) : async [Collections.Collection] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    Collections.getActiveCollections(collections)
  };

  public query func getCollectionWithProjects(apiKey : Types.ApiKey, categoryId : Text) : async ?Collections.CategoryProjects {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    Collections.getCollectionWithProjects(collections, categoriesMap, projects, categoryId)
  };

  // Projects V2 management

  public shared ({ caller }) func addProjectV2(project : TypesV2.ICP_Project) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));
    switch (ProjectsV2.addProject(projectsV2, project)) {
      case (#ok(projectId)) { "Success: Project added with ID " # projectId };
      case (#err(error)) { "Error: " # error }
    }
  };

  public shared ({ caller }) func updateProjectV2(projectId : TypesV2.ICP_ProjectId, project : TypesV2.ICP_Project) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));
    switch (ProjectsV2.updateProject(projectsV2, projectId, project)) {
      case (#ok(id)) { "Success: Project updated with ID " # id };
      case (#err(error)) { "Error: " # error }
    }
  };

  public shared ({ caller }) func removeProjectV2(projectId : TypesV2.ICP_ProjectId) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));
    switch (ProjectsV2.removeProject(projectsV2, projectId)) {
      case (#ok(_removed)) { "Success: Project removed" };
      case (#err(error)) { "Error: " # error }
    }
  };

  public shared ({ caller }) func toggleProjectV2Status(projectId : TypesV2.ICP_ProjectId) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));
    switch (ProjectsV2.toggleProjectStatus(projectsV2, projectId)) {
      case (#ok(isActive)) {
        "Success: Project status changed to " # (if (isActive) "active" else "inactive")
      };
      case (#err(_error)) { "Error: " # _error }
    }
  };

  // Projects V2 queries

  public query func getProjectV2(apiKey : Types.ApiKey, projectId : TypesV2.ICP_ProjectId) : async ?TypesV2.ICP_Project {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getProject(projectsV2, projectId)
  };

  public query func getAllProjectsV2(apiKey : Types.ApiKey) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getAllProjects(projectsV2)
  };

  public query func getActiveProjectsV2(apiKey : Types.ApiKey) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getActiveProjects(projectsV2)
  };

  public query func getProjectsV2ByCategory(apiKey : Types.ApiKey, categoryId : Text) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getProjectsByCategory(projectsV2, categoryId)
  };

  public query func searchProjectsV2(apiKey : Types.ApiKey, searchQuery : Text) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.searchProjects(projectsV2, searchQuery)
  };

  public query func getProjectsV2Count(apiKey : Types.ApiKey) : async Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getProjectsCount(projectsV2)
  };

  public query func getActiveProjectsV2Count(apiKey : Types.ApiKey) : async Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getActiveProjectsCount(projectsV2)
  };

  public query func projectV2Exists(apiKey : Types.ApiKey, projectId : TypesV2.ICP_ProjectId) : async Bool {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.projectExists(projectsV2, projectId)
  };

  // Unified Projects V2 management with status filtering

  public shared ({ caller }) func submitProjectV2(project : TypesV2.ICP_Project) : async Text {
    assert (not Principal.isAnonymous(caller));

    // Set project as user-submitted with pending status
    let submittedProject = {
      project with
      listingStatus = "submitted";
      isCurated = false;
      isUserSubmitted = true;
      listedBy = Principal.toText(caller);
      submittedAt = Int.toText(Time.now())
    };

    switch (ProjectsV2.addProject(projectsV2, submittedProject)) {
      case (#ok(projectId)) { "Success: Project submitted for review with ID " # projectId };
      case (#err(error)) { "Error: " # error }
    }
  };

  public shared ({ caller }) func approveProjectV2(projectId : TypesV2.ICP_ProjectId, _reviewNotes : Text) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));

    switch (ProjectsV2.getProject(projectsV2, projectId)) {
      case (?project) {
        let approvedProject = {
          project with
          listingStatus = "approved";
          isCurated = true;
          reviewedBy = Principal.toText(caller);
          reviewedAt = Int.toText(Time.now());
          approvedAt = Int.toText(Time.now())
        };

        switch (ProjectsV2.updateProject(projectsV2, projectId, approvedProject)) {
          case (#ok(id)) { "Success: Project approved and curated with ID " # id };
          case (#err(error)) { "Error: " # error }
        }
      };
      case null { "Error: Project not found" }
    }
  };

  public shared ({ caller }) func rejectProjectV2(projectId : TypesV2.ICP_ProjectId, reason : Text) : async Text {
    assert (AdminAuth.verifyAnyAdmin(caller));

    switch (ProjectsV2.getProject(projectsV2, projectId)) {
      case (?project) {
        let rejectedProject = {
          project with
          listingStatus = "rejected";
          isCurated = false;
          isActive = false;
          reviewedBy = Principal.toText(caller);
          reviewedAt = Int.toText(Time.now());
          rejectionReason = reason
        };

        switch (ProjectsV2.updateProject(projectsV2, projectId, rejectedProject)) {
          case (#ok(id)) { "Success: Project rejected with ID " # id # ". Reason: " # reason };
          case (#err(error)) { "Error: " # error }
        }
      };
      case null { "Error: Project not found" }
    }
  };

  // Unified query functions with status filtering

  public query func getSubmittedProjectsV2(apiKey : Types.ApiKey) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getSubmittedProjects(projectsV2)
  };

  public query func getCuratedProjectsV2(apiKey : Types.ApiKey) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getCuratedProjects(projectsV2)
  };

  public shared query ({ caller }) func getUserSubmittedProjectsV2(apiKey : Types.ApiKey) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    assert (not Principal.isAnonymous(caller));

    let userId = Principal.toText(caller);
    ProjectsV2.getProjectsByLister(projectsV2, userId)
  };

  public query func getProjectsByStatusV2(apiKey : Types.ApiKey, status : Text) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getProjectsByListingStatus(projectsV2, status)
  };

  // Optimized count functions

  public query func getCuratedProjectsV2Count(apiKey : Types.ApiKey) : async Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getCuratedProjectsCount(projectsV2)
  };

  public query func getSubmittedProjectsV2Count(apiKey : Types.ApiKey) : async Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getSubmittedProjectsCount(projectsV2)
  };

  public query func getProjectsV2CountByStatus(apiKey : Types.ApiKey, status : Text) : async Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getProjectsCountByStatus(projectsV2, status)
  };

  // Engagement utility functions

  public query func getMostUpvotedProjectsV2(apiKey : Types.ApiKey, limit : Nat) : async [TypesV2.ICP_Project] {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    ProjectsV2.getMostUpvotedProjects(projectsV2, limit)
  };

  public query func getProjectUpvoteCount(apiKey : Types.ApiKey, projectId : TypesV2.ICP_ProjectId) : async ?Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    switch (ProjectsV2.getProject(projectsV2, projectId)) {
      case (?project) { ?ProjectsV2.getUpvoteCount(project) };
      case null { null }
    }
  };

  public query func getProjectWatchCount(apiKey : Types.ApiKey, projectId : TypesV2.ICP_ProjectId) : async ?Nat {
    assert (ApiKeyAuth.verifyApiKey(apiKey, secret));
    switch (ProjectsV2.getProject(projectsV2, projectId)) {
      case (?project) { ?ProjectsV2.getWatchCount(project) };
      case null { null }
    }
  };

  // update

  public shared ({ caller }) func addProjectNode(project : Types.Project) : async ?Types.ProjectId {
    assert (caller == nodeAdmin1);
    projects.put(project.id, project);
    return ?project.id
  };

  public shared ({ caller }) func addProject(project : Types.Project) : async ?Types.ProjectId {
    assert (caller == nodeAdmin1 or caller == clientAdmin1 or caller == clientAdmin2);

    // Generate new ID if project.id is 0 or if the ID doesn't exist in the project record
    let projectId = switch (project.id) {
      case (0) { Int.abs(Time.now()) };
      case (id) {
        // Check if this ID already exists
        switch (projects.get(id)) {
          case (?_) { Int.abs(Time.now()) }; // ID exists, generate new one
          case (null) { id }; // ID is valid and unique, use it
        }
      }
    };

    projects.put(projectId, { project with id = projectId });
    return ?projectId
  };

  public shared ({ caller }) func editProject(projectId : Types.ProjectId, project : Types.Project) : async ?Types.ProjectId {
    assert (caller == nodeAdmin1 or caller == clientAdmin1 or caller == clientAdmin2);

    // Check if the project exists before updating
    switch (projects.get(projectId)) {
      case (?_existing) {
        projects.put(projectId, project);
        return ?projectId
      };
      case (null) {
        return null // Project not found
      }
    }
  };

  public shared ({ caller }) func removeProject(projectId : Types.ProjectId) : async ?Types.Project {
    assert (caller == nodeAdmin1 or caller == clientAdmin1 or caller == clientAdmin2);
    let removed = projects.remove(projectId);
    return removed
  };

  public shared ({ caller }) func removeProjectWithLogo(projectId : Types.ProjectId) : async ?Types.Project {
    assert (caller == clientAdmin1 or caller == clientAdmin2);

    // Get the project first to extract logo information
    let ?project = projects.get(projectId) else return null;

    // If project has a logo URL pointing to our assets canister, delete it
    if (project.logoUrl != "" and Text.contains(project.logoUrl, #text assets_canister_id)) {
      try {
        // Extract the key from the logoUrl
        // URL format: https://uodzj-4aaaa-aaaag-auexa-cai.icp0.io/logos/123456.png
        // We need to extract: /logos/123456.png

        // Split by domain and take the path part
        let parts = Text.split(project.logoUrl, #text ".icp0.io");
        let partsArray = Iter.toArray(parts);

        // Get the path part (after the domain)
        if (partsArray.size() >= 2) {
          let pathPart = partsArray[1];

          // The pathPart should be "/logos/123456.png"
          if (Text.startsWith(pathPart, #text "/logos/")) {
            await Assets.deleteFile(assets, pathPart)
          }
        }
      } catch (_error) {
        // Log error but continue with project removal
        // In production, you might want to handle this differently
      }
    };

    // Remove the project from the database
    let removed = projects.remove(projectId);
    return removed
  };

  public shared ({ caller }) func removeDuplicatesUsingBackup(apiKey : Types.ApiKey, backupProjects : [Types.Project]) : async { removed : Nat; kept : Nat } {
    assert (caller == admin1 or caller == clientAdmin1 or caller == clientAdmin2);
    assert (secret == apiKey);

    // Create a map of project names from backup data (source of truth)
    let backupNames = HashMap.HashMap<Text, Types.ProjectId>(backupProjects.size(), Text.equal, Text.hash);
    for (project in backupProjects.vals()) {
      backupNames.put(project.name, project.id)
    };

    // Find projects in current database that should be removed
    var removedCount = 0;
    var keptCount = 0;
    let projectsToRemove = Buffer.Buffer<Types.ProjectId>(0);

    for ((currentId, currentProject) in projects.entries()) {
      switch (backupNames.get(currentProject.name)) {
        case (?backupId) {
          // Project name exists in backup
          if (currentId != backupId) {
            // This is a duplicate with wrong ID - remove it
            projectsToRemove.add(currentId)
          } else {
            // This is the correct project from backup - keep it
            keptCount += 1
          }
        };
        case null {
          // Project name not in backup - this might be a newer project or duplicate
          // For safety, we'll keep projects not in backup
          keptCount += 1
        }
      }
    };

    // Remove the duplicates
    for (idToRemove in projectsToRemove.vals()) {
      ignore projects.remove(idToRemove);
      removedCount += 1
    };

    { removed = removedCount; kept = keptCount }
  };

  public shared ({ caller }) func updateUpvote(apiKey : Types.ApiKey, projectId : Types.ProjectId) : async Text {

    // verify
    assert (not Principal.isAnonymous(caller));
    if (secret != apiKey) {
      return "Wrong secret."
    };

    let userId = Principal.toText(caller);
    let ?p = projects.get(projectId) else return "Project not found.";
    let upvotedByBuf = Buffer.fromArray<Text>(p.upvotedBy);
    let isAlreadyUpvoted = Buffer.contains<Text>(upvotedByBuf, userId, Text.equal);

    if (not isAlreadyUpvoted) {
      upvotedByBuf.add(userId);
      projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
      return "Upvoted."
    } else {
      let ?idx = Buffer.indexOf<Text>(userId, upvotedByBuf, Text.equal) else return "User idx not found.";
      let _ = upvotedByBuf.remove(idx);
      projects.put(projectId, { p with upvotedBy = Buffer.toArray(upvotedByBuf) });
      return "Upvote removed."
    }
  };

  // query

  public query func getActiveProjectsNum(apiKey : Types.ApiKey) : async Nat {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    return activeProjects.size()
  };

  public query func getProjectById(apiKey : Types.ApiKey, id : Types.ProjectId) : async ?Types.Project {
    assert (secret == apiKey);
    return projects.get(id)
  };

  public query func getProjectsByIds(apiKey : Types.ApiKey, ids : [Types.ProjectId]) : async [Types.Project] {
    assert (secret == apiKey);
    let result = Buffer.Buffer<Types.Project>(0);

    for (id in ids.vals()) {
      switch (projects.get(id)) {
        case (?project) {
          if (not project.archived) {
            result.add(project)
          }
        };
        case null { /* skip missing projects */ }
      }
    };

    Buffer.toArray(result)
  };

  public query func getAllProjects(apiKey : Types.ApiKey) : async [Types.Project] {
    assert (secret == apiKey);
    let iter : Iter.Iter<Types.Project> = projects.vals();
    let allProjects = Iter.toArray<Types.Project>(iter);
    return Handle.sort(allProjects, #newest_first)
  };

  public query func getCategories(apiKey : Types.ApiKey) : async [Category.Category] {
    assert (secret == apiKey);
    return categories
  };

  public query func getCategoriesWithSize(apiKey : Types.ApiKey) : async [Category.CategoryWithSize] {
    assert (secret == apiKey);

    let activeProjects = _getActiveProjects();
    let buff = Buffer.Buffer<Category.CategoryWithSize>(categories.size());

    for (category in categories.vals()) {
      if (category.id == "all") {
        buff.add({ category; size = activeProjects.size() })

      } else {
        let filter = func(p : Types.Project) : Bool {
          let exists = Array.find<Category.CategoryLabel>(p.category, func(x) { x == category.lbl });

          switch (exists) {
            case (null) return false;
            case (?_some) return true
          }
        };

        let filtered = Array.filter(activeProjects, filter);
        buff.add({ category; size = filtered.size() })
      }
    };
    return Buffer.toArray(buff)
  };

  public shared query ({ caller }) func getUserUpvotedProjects(apiKey : Types.ApiKey) : async [Types.Project] {
    assert (secret == apiKey);
    let sortedByNewest = Handle.sort(_getActiveProjects(), #newest_first);
    let userId = Principal.toText(caller);

    let filter = func(x : Types.Project) : Bool {
      let idx = Array.indexOf<Text>(userId, x.upvotedBy, func(a : Text, b : Text) : Bool { a == b });
      switch (idx) {
        case (null) return false;
        case (?_some) return true
      }
    };

    return Array.filter(sortedByNewest, filter)
  };

  // filter, sort, paginate

  public query func getProjects(args : Types.GetProjectsArgs) : async ?Types.GetProjectsResult {
    assert (secret == args.secret);
    let { q; category; openSource; onChain; sort; selectedPage; itemsPerPage } = args;

    // get projects
    let activeProjects = _getActiveProjects();
    var result : [Types.Project] = [];

    // search query
    if (q != "") {
      result := Handle.filteredBySearchQ(activeProjects, q)
    } else {
      result := activeProjects
    };

    // filter, sort, paginate
    let filteredByCategory = Handle.filterByCategory(result, category);
    let filteredByOpenSource = Handle.filterByOpenSource(filteredByCategory, openSource);
    let filteredByOnchain = Handle.filterByOnchain(filteredByOpenSource, onChain);
    let sorted = Handle.sort(filteredByOnchain, sort);
    let ?paginated = Handle.paginate(sorted, selectedPage, itemsPerPage) else return null;

    let res : Types.GetProjectsResult = {
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

  // Helper function to safely take items from array
  private func safeTake<A>(arr : [A], n : Nat) : [A] {
    let len = arr.size();
    if (n >= len) {
      arr
    } else {
      let sliced = Array.slice(arr, 0, n);
      Iter.toArray<A>(sliced)
    }
  };

  public query func getHomepageData(
    apiKey : Types.ApiKey,
    categories : [Text],
    itemsPerCategory : Nat,
    newProjectsCount : Nat,
    mostUpvotedCount : Nat,
  ) : async Types.HomepageData {
    assert (secret == apiKey);

    let activeProjects = _getActiveProjects();

    // Get new projects
    let sortedByNewest = Handle.sort(activeProjects, #newest_first);
    let newProjects = safeTake(sortedByNewest, newProjectsCount);

    // Get most upvoted projects
    let sortedByMostUpvoted = Handle.sort(activeProjects, #most_upvoted);
    let mostUpvoted = safeTake(sortedByMostUpvoted, mostUpvotedCount);

    // Get highlighted projects by category
    let highlighted = Array.map<Text, Types.CategoryProjects>(
      categories,
      func(categoryLabel : Text) : Types.CategoryProjects {
        // Use the category label directly for filtering since that's what projects store
        let filteredByCategory = Handle.filterByCategory(activeProjects, categoryLabel);
        let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
        let projects = safeTake(sortedByNewest, itemsPerCategory);

        // Find the category ID from the categories array for the response
        let categoryId = switch (Array.find<Category.Category>(Category.categories, func(cat) = cat.lbl == categoryLabel)) {
          case (?cat) cat.id;
          case null Text.toLowercase(categoryLabel); // fallback to lowercase label if ID not found
        };

        {
          categoryId = categoryId;
          categoryLabel = categoryLabel;
          projects = projects
        }
      },
    );

    {
      new = newProjects;
      mostUpvoted = mostUpvoted;
      highlighted = highlighted
    }
  };

  public query func getNewProjects(apiKey : Types.ApiKey, length : Nat) : async [Types.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let sortedByNewest = Handle.sort(activeProjects, #newest_first);
    return safeTake(sortedByNewest, length)
  };

  public query func getHighlightedProjects(apiKey : Types.ApiKey, category : Category.CategoryLabel, length : Nat) : async [Types.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let filteredByCategory = Handle.filterByCategory(activeProjects, category);
    let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
    return safeTake(sortedByNewest, length)
  };

  public query func getMultipleHighlightedProjects(apiKey : Types.ApiKey, categories : [Category.CategoryLabel], length : Nat) : async [Types.CategoryProjects] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();

    let highlighted = Array.map<Category.CategoryLabel, Types.CategoryProjects>(
      categories,
      func(categoryLabel : Category.CategoryLabel) : Types.CategoryProjects {
        let filteredByCategory = Handle.filterByCategory(activeProjects, categoryLabel);
        let sortedByNewest = Handle.sort(filteredByCategory, #newest_first);
        let projects = safeTake(sortedByNewest, length);

        // Find the category ID from the categories array for the response
        let categoryId = switch (Array.find<Category.Category>(Category.categories, func(cat) = cat.lbl == categoryLabel)) {
          case (?cat) cat.id;
          case null Text.toLowercase(categoryLabel); // fallback to lowercase label if ID not found
        };

        {
          categoryId = categoryId;
          categoryLabel = categoryLabel;
          projects = projects
        }
      },
    );

    return highlighted
  };

  public query func getMostUpvotedProjects(apiKey : Types.ApiKey, length : Nat) : async [Types.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let sortedByMostUpvoted = Handle.sort(activeProjects, #most_upvoted);
    return safeTake(sortedByMostUpvoted, length)
  };

  // project

  public query func getRelatedProjects(apiKey : Types.ApiKey, projectId : Types.ProjectId, length : Nat) : async [Types.Project] {
    assert (secret == apiKey);
    let activeProjects = _getActiveProjects();
    let ?project = projects.get(projectId) else return [];
    let categories = project.category;
    let buf = Buffer.Buffer<Types.Project>(10);

    for (c in categories.vals()) {
      let filtered = Handle.filterByCategory(activeProjects, c);
      buf.append(Buffer.fromArray<Types.Project>(filtered))
    };

    let compare = func(a : Types.Project, b : Types.Project) : Order.Order {
      if (a.id > b.id) return #greater;
      if (a.id < b.id) return #less;
      return #equal
    };

    Buffer.removeDuplicates<Types.Project>(buf, compare);
    return Buffer.toArray<Types.Project>(buf)
  };

  // admin

  public query func getProjectsBySearchQ(apiKey : Types.ApiKey, searchQ : Text) : async [Types.Project] {
    assert (secret == apiKey);
    let allProjects = Iter.toArray<Types.Project>(projects.vals());
    let sortedByNewest = Handle.sort(allProjects, #newest_first);
    let q = Text.toLowercase(searchQ);
    return Array.filter<Types.Project>(sortedByNewest, func(x) { Text.contains(Text.toLowercase(x.name), #text q) })
  };

  public shared query ({ caller }) func showApiKey() : async Text {
    assert (caller == admin1);
    return secret
  };

  public shared ({ caller }) func updateApiKey(newApiKey : Types.ApiKey) : async Text {
    assert (caller == admin1);
    secret := newApiKey;
    return "ok"
  };

  public shared query ({ caller }) func getAllProjectsNumAdmin() : async Nat {
    assert Utils.isAdmin(caller);
    return projects.size()
  };

  // logo uploader

  // Get the assets canister instance
  transient let assets = Assets.getAssetsCanister(assets_canister_id);

  /// Public method to upload logo to the assets canister
  public shared ({ caller }) func upload_logo(name : Text, content : [Nat8], content_type : Text) : async Text {
    // Only allow authenticated admin users to upload
    assert (not Principal.isAnonymous(caller));
    assert (caller == admin1 or caller == nodeAdmin1 or caller == clientAdmin1 or caller == clientAdmin2);

    let key = Assets.generateLogoKey(name);
    await Assets.uploadFile(assets, key, content, content_type);
    return key
  };

  /// Public method to upload any file to any route in the assets canister
  public shared ({ caller }) func upload_file(route : Text, filename : Text, content : [Nat8], content_type : Text) : async Text {
    // Only allow authenticated admin users to upload
    assert (not Principal.isAnonymous(caller));
    assert (caller == nodeAdmin1);

    // Generate the key based on the route and filename
    let key = if (route == "/" or route == "") {
      "/" # filename // Root route
    } else if (Text.startsWith(route, #text "/")) {
      route # "/" # filename // Route already has leading slash
    } else {
      "/" # route # "/" # filename // Add leading slash to route
    };

    await Assets.uploadFile(assets, key, content, content_type);
    return key
  };

  // utils

  private func _getActiveProjects() : [Types.Project] {
    let iter : Iter.Iter<Types.Project> = projects.vals();
    let allProjects = Iter.toArray<Types.Project>(iter);
    let activeProjects = Array.filter<Types.Project>(allProjects, func(p) { p.archived == false });
    return activeProjects
  };

  // test

  public shared query ({ caller }) func whoami() : async Text {
    return Principal.toText(caller)
  };

  // stable

  system func preupgrade() {
    projectsEntries := Iter.toArray(projects.entries());
    categoriesEntries := Iter.toArray(categoriesMap.entries());
    collectionsEntries := Iter.toArray(collections.entries());
    // v2
    projectsV2Entries := Iter.toArray(projectsV2.entries())
  };

  system func postupgrade() {
    projectsEntries := [];
    categoriesEntries := [];
    collectionsEntries := [];
    // v2
    projectsV2Entries := []
  }
}
