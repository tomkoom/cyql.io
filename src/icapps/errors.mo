module Errors {

  public type ProfileErr = {
    #IsAnonymous;
  };

  public type JobErr = {
    #Err;
    #IsAnonymous;
  };
};
