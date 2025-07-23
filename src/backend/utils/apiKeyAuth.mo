import T "../types";

module ApiKeyAuth {

  // Simple API key verification
  public func verifyApiKey(apiKey : T.ApiKey, secret : T.ApiKey) : Bool {
    apiKey == secret
  };

}
