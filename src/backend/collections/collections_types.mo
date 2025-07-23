import T "../types";

module {
  public type ProjectId = T.ProjectId;
  public type Project = T.Project;
  public type CategoryProjects = T.CategoryProjects;

  public type Collection = {
    categoryId : Text;
    projectIds : [ProjectId];
    isActive : Bool;
    createdAt : Text;
    updatedAt : Text
  }
}
