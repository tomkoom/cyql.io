module {
  public type UserId = Principal;
  public type User = {
    id : Text;
    firstSignIn : Int;
    // votedTimes : Nat;
    // totalVotingPowerApplied : Nat
  }
}
