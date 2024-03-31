module {
  public type UserId = Principal;
  public type User = {
    id : Text;
    registeredAt : Int;
    votedTimes : Nat;
    totalVotingPowerApplied : Nat
  }
}
