// https://dashboard.internetcomputer.org/canister/fy4cw-pqaaa-aaaag-ahkvq-cai

module {
  public type User = { id : Text };
  public type UserId = Principal;
  public type Self = actor {
    listUsers : shared () -> async [User];
    registerUser : shared UserId -> async ?Text;
    usersNum : shared () -> async Nat;
    whoami : shared query () -> async Text
  }
}
