import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Order "mo:base/Order";

import TypesV2 "../types_v2";

module {
  public type ProjectId = TypesV2.ICP_ProjectId;
  public type Project = TypesV2.ICP_Project;
  public type ProjectsMap = HashMap.HashMap<ProjectId, Project>;

  // Create a new projects map
  public func createProjectsMap() : ProjectsMap {
    HashMap.HashMap<ProjectId, Project>(100, Text.equal, Text.hash)
  };

  // Validate required project fields
  private func validateProject(project : Project) : Result.Result<(), Text> {
    if (project.id == "") {
      return #err("Project ID cannot be empty")
    };
    if (project.name == "") {
      return #err("Project name cannot be empty")
    };
    if (project.description == "") {
      return #err("Project description cannot be empty")
    };
    if (project.category.size() == 0) {
      return #err("Project must have at least one category")
    };
    #ok()
  };

  // Add a new project with validation
  public func addProject(projects : ProjectsMap, project : Project) : Result.Result<ProjectId, Text> {
    // Validate project first
    switch (validateProject(project)) {
      case (#err(error)) { return #err(error) };
      case (#ok()) {
        switch (projects.get(project.id)) {
          case (?_existing) {
            #err("Project with ID " # project.id # " already exists")
          };
          case null {
            projects.put(project.id, project);
            #ok(project.id)
          }
        }
      }
    }
  };

  // Update an existing project with validation
  public func updateProject(projects : ProjectsMap, projectId : ProjectId, project : Project) : Result.Result<ProjectId, Text> {
    // Validate project first
    switch (validateProject(project)) {
      case (#err(error)) { return #err(error) };
      case (#ok()) {
        switch (projects.get(projectId)) {
          case (?_existing) {
            projects.put(projectId, project);
            #ok(projectId)
          };
          case null {
            #err("Project with ID " # projectId # " not found")
          }
        }
      }
    }
  };

  // Remove a project
  public func removeProject(projects : ProjectsMap, projectId : ProjectId) : Result.Result<Project, Text> {
    switch (projects.remove(projectId)) {
      case (?removed) { #ok(removed) };
      case null { #err("Project with ID " # projectId # " not found") }
    }
  };

  // Get a project by ID
  public func getProject(projects : ProjectsMap, projectId : ProjectId) : ?Project {
    projects.get(projectId)
  };

  // Get all projects
  public func getAllProjects(projects : ProjectsMap) : [Project] {
    Iter.toArray(projects.vals())
  };

  // Get all project IDs
  public func getAllProjectIds(projects : ProjectsMap) : [ProjectId] {
    Iter.toArray(projects.keys())
  };

  // Get projects by status
  public func getProjectsByStatus(projects : ProjectsMap, isActive : Bool) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(allProjects, func(p : Project) : Bool { p.isActive == isActive })
  };

  // Get active projects only
  public func getActiveProjects(projects : ProjectsMap) : [Project] {
    getProjectsByStatus(projects, true)
  };

  // Get projects by category
  public func getProjectsByCategory(projects : ProjectsMap, categoryId : Text) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        Array.find<Text>(p.category, func(cat : Text) : Bool { cat == categoryId }) != null
      },
    )
  };

  // Search projects by name or description
  public func searchProjects(projects : ProjectsMap, searchQuery : Text) : [Project] {
    let allProjects = getAllProjects(projects);
    let lowerQuery = Text.toLowercase(searchQuery);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        let nameMatch = Text.contains(Text.toLowercase(p.name), #text lowerQuery);
        let descMatch = Text.contains(Text.toLowercase(p.description), #text lowerQuery);
        nameMatch or descMatch
      },
    )
  };

  // Toggle project active status
  public func toggleProjectStatus(projects : ProjectsMap, projectId : ProjectId) : Result.Result<Bool, Text> {
    switch (projects.get(projectId)) {
      case (?project) {
        let updatedProject = { project with isActive = not project.isActive };
        projects.put(projectId, updatedProject);
        #ok(updatedProject.isActive)
      };
      case null {
        #err("Project with ID " # projectId # " not found")
      }
    }
  };

  // Get projects count
  public func getProjectsCount(projects : ProjectsMap) : Nat {
    projects.size()
  };

  // Get active projects count
  public func getActiveProjectsCount(projects : ProjectsMap) : Nat {
    getActiveProjects(projects).size()
  };

  // Batch operations
  public func addMultipleProjects(projects : ProjectsMap, projectsList : [Project]) : [Result.Result<ProjectId, Text>] {
    Array.map<Project, Result.Result<ProjectId, Text>>(
      projectsList,
      func(project : Project) : Result.Result<ProjectId, Text> {
        addProject(projects, project)
      },
    )
  };

  // Check if project exists
  public func projectExists(projects : ProjectsMap, projectId : ProjectId) : Bool {
    switch (projects.get(projectId)) {
      case (?_) { true };
      case null { false }
    }
  };

  // Unified status filtering functions

  // Get projects by listing status
  public func getProjectsByListingStatus(projects : ProjectsMap, status : Text) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.listingStatus == status
      },
    )
  };

  // Get submitted projects (user submissions awaiting review)
  public func getSubmittedProjects(projects : ProjectsMap) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.listingStatus == "submitted" and p.isUserSubmitted
      },
    )
  };

  // Get curated projects (admin-approved for public display)
  public func getCuratedProjects(projects : ProjectsMap) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.isCurated and p.isActive
      },
    )
  };

  // Get projects by specific lister (user)
  public func getProjectsByLister(projects : ProjectsMap, listerUserId : Text) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.listedBy == listerUserId and p.isUserSubmitted
      },
    )
  };

  // Get projects by curation status (true/false)
  public func getProjectsByCurationStatus(projects : ProjectsMap, isCurated : Bool) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.isCurated == isCurated
      },
    )
  };

  // Get projects by submission type (user vs admin)
  public func getProjectsBySubmissionType(projects : ProjectsMap, isUserSubmitted : Bool) : [Project] {
    let allProjects = getAllProjects(projects);
    Array.filter<Project>(
      allProjects,
      func(p : Project) : Bool {
        p.isUserSubmitted == isUserSubmitted
      },
    )
  };

  // Get count of projects by status
  public func getProjectsCountByStatus(projects : ProjectsMap, status : Text) : Nat {
    getProjectsByListingStatus(projects, status).size()
  };

  // Get count of curated projects
  public func getCuratedProjectsCount(projects : ProjectsMap) : Nat {
    getCuratedProjects(projects).size()
  };

  // Get count of submitted projects
  public func getSubmittedProjectsCount(projects : ProjectsMap) : Nat {
    getSubmittedProjects(projects).size()
  };

  // Engagement metrics utilities (since we removed redundant count fields)

  // Get upvote count for a project
  public func getUpvoteCount(project : Project) : Nat {
    project.upvotedBy.size()
  };

  // Get watch count for a project
  public func getWatchCount(project : Project) : Nat {
    project.watchlistedBy.size()
  };

  // Check if user has upvoted a project
  public func hasUserUpvoted(project : Project, userId : Text) : Bool {
    switch (Array.find<Text>(project.upvotedBy, func(id : Text) : Bool { id == userId })) {
      case (?_) { true };
      case null { false }
    }
  };

  // Check if user has watchlisted a project
  public func hasUserWatchlisted(project : Project, userId : Text) : Bool {
    switch (Array.find<Text>(project.watchlistedBy, func(id : Text) : Bool { id == userId })) {
      case (?_) { true };
      case null { false }
    }
  };

  // Get projects with most upvotes (sorted)
  public func getMostUpvotedProjects(projects : ProjectsMap, limit : Nat) : [Project] {
    let allProjects = getAllProjects(projects);
    let sorted = Array.sort<Project>(
      allProjects,
      func(a : Project, b : Project) : Order.Order {
        let aCount = getUpvoteCount(a);
        let bCount = getUpvoteCount(b);
        if (aCount > bCount) { #less } // Descending order
        else if (aCount < bCount) { #greater } else { #equal }
      },
    );

    if (limit >= sorted.size()) {
      sorted
    } else {
      let sliced = Array.slice(sorted, 0, limit);
      Iter.toArray(sliced)
    }
  }
}
