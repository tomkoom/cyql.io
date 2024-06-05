module {
  public type UserId = Principal;

  public type User = {
    id : Text;
    registeredAt : Int;
    votedTimes : Nat;
    totalVotingPowerApplied : Nat
  };

  public type UserIdNew = Text;
  public type UserNew = {
    id : UserIdNew;
    registeredAt : Int
  }
}
