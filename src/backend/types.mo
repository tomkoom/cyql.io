module {

  // users

  public type UserId = Principal;
  public type User = {
    id : Text
  };

  // projects

  public type ProjectId = Nat;
  public type Project = {
    id : Nat
  };

}
