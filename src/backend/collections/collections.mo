import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Buffer "mo:base/Buffer";

import T "./collections_types";
import Category "../categories";

module Collections {

  public type Collection = T.Collection;
  public type ProjectId = T.ProjectId;
  public type Project = T.Project;
  public type CategoryProjects = T.CategoryProjects;

  // Collections management functions
  public func addCollection(
    collections : HashMap.HashMap<Text, Collection>,
    categoriesMap : HashMap.HashMap<Text, Category.Category>,
    categoryId : Text,
    projectIds : [ProjectId],
  ) : Bool {
    // Verify category exists
    switch (categoriesMap.get(categoryId)) {
      case null { false };
      case (?_) {
        let now = Int.toText(Time.now());
        let collection : Collection = {
          categoryId = categoryId;
          projectIds = projectIds;
          isActive = true;
          createdAt = now;
          updatedAt = now
        };

        collections.put(categoryId, collection);
        true
      }
    }
  };

  public func updateCollection(
    collections : HashMap.HashMap<Text, Collection>,
    categoryId : Text,
    projectIds : [ProjectId],
  ) : Bool {
    switch (collections.get(categoryId)) {
      case null { false };
      case (?existing) {
        let updated : Collection = {
          existing with
          projectIds = projectIds;
          updatedAt = Int.toText(Time.now())
        };

        collections.put(categoryId, updated);
        true
      }
    }
  };

  public func removeCollection(
    collections : HashMap.HashMap<Text, Collection>,
    categoryId : Text,
  ) : Bool {
    switch (collections.remove(categoryId)) {
      case null { false };
      case (?_) { true }
    }
  };

  public func toggleCollectionStatus(
    collections : HashMap.HashMap<Text, Collection>,
    categoryId : Text,
  ) : Bool {
    switch (collections.get(categoryId)) {
      case null { false };
      case (?existing) {
        let updated : Collection = {
          existing with
          isActive = not existing.isActive;
          updatedAt = Int.toText(Time.now())
        };

        collections.put(categoryId, updated);
        true
      }
    }
  };

  // Collections query

  public func getCollection(
    collections : HashMap.HashMap<Text, Collection>,
    categoryId : Text,
  ) : ?Collection {
    collections.get(categoryId)
  };

  public func getAllCollections(
    collections : HashMap.HashMap<Text, Collection>
  ) : [Collection] {
    Iter.toArray(collections.vals())
  };

  public func getActiveCollections(
    collections : HashMap.HashMap<Text, Collection>
  ) : [Collection] {
    let activeCollections = Buffer.Buffer<Collection>(0);

    for (collection in collections.vals()) {
      if (collection.isActive) {
        activeCollections.add(collection)
      }
    };

    Buffer.toArray(activeCollections)
  };

  public func getCollectionWithProjects(
    collections : HashMap.HashMap<Text, Collection>,
    categoriesMap : HashMap.HashMap<Text, Category.Category>,
    projects : HashMap.HashMap<Nat, Project>,
    categoryId : Text,
  ) : ?CategoryProjects {
    switch (collections.get(categoryId)) {
      case null { null };
      case (?collection) {
        if (not collection.isActive) { return null };

        let categoryLabel = switch (categoriesMap.get(categoryId)) {
          case null { categoryId };
          case (?cat) { cat.lbl }
        };

        let collectionProjects = Buffer.Buffer<Project>(0);

        for (projectId in collection.projectIds.vals()) {
          switch (projects.get(projectId)) {
            case null { /* skip missing projects */ };
            case (?project) {
              if (not project.archived) {
                collectionProjects.add(project)
              }
            }
          }
        };

        ?{
          categoryId = categoryId;
          categoryLabel = categoryLabel;
          projects = Buffer.toArray(collectionProjects)
        }
      }
    }
  };

}
