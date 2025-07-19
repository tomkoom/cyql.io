module Assets {

  // Assets canister interface based on the Candid specification
  public type AssetsCanister = actor {
    store : shared {
      key : Text;
      content : [Nat8];
      sha256 : ?[Nat8];
      content_type : Text;
      content_encoding : Text
    } -> async ()
  };

  // Create an assets canister actor
  public func getAssetsCanister(canisterId : Text) : AssetsCanister {
    actor (canisterId) : AssetsCanister
  };

  // Upload a file to the assets canister
  public func uploadFile(
    assets : AssetsCanister,
    key : Text,
    content : [Nat8],
    contentType : Text,
  ) : async () {
    await assets.store({
      key = key;
      content = content;
      sha256 = null;
      content_type = contentType;
      content_encoding = "identity"
    })
  };

  // Generate a logo key with the /logos/ prefix
  public func generateLogoKey(name : Text) : Text {
    "/logos/" # name
  };

}
