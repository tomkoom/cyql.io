// https://dashboard.internetcomputer.org/canister/dtlqp-nqaaa-aaaak-abwna-cai

module {
  public type AccountIdentifier = Text;
  public type AccountIdentifier__1 = Text;
  public type Asset = { thumbnail : ?File; name : Text; payload : File };
  public type Balance = Nat;
  public type BalanceRequest = { token : TokenIdentifier; user : User };
  public type BalanceResponse = { #ok : Balance; #err : CommonError__1 };
  public type Balance__1 = Nat;
  public type CanisterCyclesAggregatedData = [Nat64];
  public type CanisterHeapMemoryAggregatedData = [Nat64];
  public type CanisterLogFeature = {
    #filterMessageByContains;
    #filterMessageByRegex
  };
  public type CanisterLogMessages = {
    data : [LogMessagesData];
    lastAnalyzedMessageTimeNanos : ?Nanos
  };
  public type CanisterLogMessagesInfo = {
    features : [?CanisterLogFeature];
    lastTimeNanos : ?Nanos;
    count : Nat32;
    firstTimeNanos : ?Nanos
  };
  public type CanisterLogRequest = {
    #getMessagesInfo;
    #getMessages : GetLogMessagesParameters;
    #getLatestMessages : GetLatestLogMessagesParameters
  };
  public type CanisterLogResponse = {
    #messagesInfo : CanisterLogMessagesInfo;
    #messages : CanisterLogMessages
  };
  public type CanisterMemoryAggregatedData = [Nat64];
  public type CanisterMetrics = { data : CanisterMetricsData };
  public type CanisterMetricsData = {
    #hourly : [HourlyMetricsData];
    #daily : [DailyMetricsData]
  };
  public type CollectMetricsRequestType = { #force; #normal };
  public type CommonError = { #InvalidToken : TokenIdentifier; #Other : Text };
  public type CommonError__1 = {
    #InvalidToken : TokenIdentifier;
    #Other : Text
  };
  public type DailyMetricsData = {
    updateCalls : Nat64;
    canisterHeapMemorySize : NumericEntity;
    canisterCycles : NumericEntity;
    canisterMemorySize : NumericEntity;
    timeMillis : Int
  };
  public type Extension = Text;
  public type File = { data : [Blob]; ctype : Text };
  public type GetInformationRequest = {
    status : ?StatusRequest;
    metrics : ?MetricsRequest;
    logs : ?CanisterLogRequest;
    version : Bool
  };
  public type GetInformationResponse = {
    status : ?StatusResponse;
    metrics : ?MetricsResponse;
    logs : ?CanisterLogResponse;
    version : ?Nat
  };
  public type GetLatestLogMessagesParameters = {
    upToTimeNanos : ?Nanos;
    count : Nat32;
    filter : ?GetLogMessagesFilter
  };
  public type GetLogMessagesFilter = {
    analyzeCount : Nat32;
    messageRegex : ?Text;
    messageContains : ?Text
  };
  public type GetLogMessagesParameters = {
    count : Nat32;
    filter : ?GetLogMessagesFilter;
    fromTimeNanos : ?Nanos
  };
  public type GetMetricsParameters = {
    dateToMillis : Nat;
    granularity : MetricsGranularity;
    dateFromMillis : Nat
  };
  public type HeaderField = (Text, Text);
  public type HourlyMetricsData = {
    updateCalls : UpdateCallsAggregatedData;
    canisterHeapMemorySize : CanisterHeapMemoryAggregatedData;
    canisterCycles : CanisterCyclesAggregatedData;
    canisterMemorySize : CanisterMemoryAggregatedData;
    timeMillis : Int
  };
  public type HttpRequest = {
    url : Text;
    method : Text;
    body : Blob;
    headers : [HeaderField]
  };
  public type HttpResponse = {
    body : Blob;
    headers : [HeaderField];
    streaming_strategy : ?HttpStreamingStrategy;
    status_code : Nat16
  };
  public type HttpStreamingCallbackResponse = {
    token : ?HttpStreamingCallbackToken;
    body : Blob
  };
  public type HttpStreamingCallbackToken = {
    key : Text;
    sha256 : ?Blob;
    index : Nat;
    content_encoding : Text
  };
  public type HttpStreamingStrategy = {
    #Callback : {
      token : HttpStreamingCallbackToken;
      callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse
    }
  };
  public type ListRequest = {
    token : TokenIdentifier__1;
    from_subaccount : ?SubAccount__1;
    price : ?Nat64
  };
  public type Listing = { locked : ?Time; seller : Principal; price : Nat64 };
  public type LogMessagesData = { timeNanos : Nanos; message : Text };
  public type Memo = Blob;
  public type Metadata = {
    #fungible : {
      decimals : Nat8;
      metadata : ?Blob;
      name : Text;
      symbol : Text
    };
    #nonfungible : { metadata : ?Blob }
  };
  public type MetricsGranularity = { #hourly; #daily };
  public type MetricsRequest = { parameters : GetMetricsParameters };
  public type MetricsResponse = { metrics : ?CanisterMetrics };
  public type Nanos = Nat64;
  public type NumericEntity = {
    avg : Nat64;
    max : Nat64;
    min : Nat64;
    first : Nat64;
    last : Nat64
  };
  public type Result = {
    #ok : [(TokenIndex, ?Listing, ?Blob)];
    #err : CommonError
  };
  public type Result_1 = { #ok : [TokenIndex]; #err : CommonError };
  public type Result_2 = { #ok : Balance__1; #err : CommonError };
  public type Result_3 = { #ok; #err : CommonError };
  public type Result_4 = { #ok : Text; #err : CommonError };
  public type Result_5 = { #ok : Metadata; #err : CommonError };
  public type Result_6 = { #ok : AccountIdentifier__1; #err : CommonError };
  public type Result_7 = {
    #ok : (AccountIdentifier__1, ?Listing, [Nat32]);
    #err : CommonError
  };
  public type Settlement = {
    subaccount : SubAccount__1;
    seller : Principal;
    buyer : AccountIdentifier__1;
    price : Nat64
  };
  public type StatusRequest = {
    memory_size : Bool;
    cycles : Bool;
    heap_memory_size : Bool
  };
  public type StatusResponse = {
    memory_size : ?Nat64;
    cycles : ?Nat64;
    heap_memory_size : ?Nat64
  };
  public type SubAccount = Blob;
  public type SubAccount__1 = Blob;
  public type Time = Int;
  public type TokenIdentifier = Text;
  public type TokenIdentifier__1 = Text;
  public type TokenIndex = Nat32;
  public type Transaction = {
    token : TokenIdentifier__1;
    time : Time;
    seller : Principal;
    buyer : AccountIdentifier__1;
    price : Nat64
  };
  public type TransferRequest = {
    to : User;
    token : TokenIdentifier;
    notify : Bool;
    from : User;
    memo : Memo;
    subaccount : ?SubAccount;
    amount : Balance
  };
  public type TransferResponse = {
    #ok : Balance;
    #err : {
      #CannotNotify : AccountIdentifier;
      #InsufficientBalance;
      #InvalidToken : TokenIdentifier;
      #Rejected;
      #Unauthorized : AccountIdentifier;
      #Other : Text
    }
  };
  public type UpdateCallsAggregatedData = [Nat64];
  public type UpdateInformationRequest = {
    metrics : ?CollectMetricsRequestType
  };
  public type User = { #principal : Principal; #address : AccountIdentifier };
  public type Self = actor {
    acceptCycles : shared () -> async ();
    addAsset : shared Asset -> async Nat;
    addAssetAtIndex : shared (Asset, Nat) -> async Nat;
    adminAddDisbursement : shared (
      TokenIndex,
      Nat,
      Nat64,
      AccountIdentifier__1,
    ) -> async ();
    adminKillHeartbeat : shared () -> async ();
    adminRemoveListing : shared Nat -> async ();
    adminStartHeartbeat : shared () -> async ();
    allPayments : shared query () -> async [(Principal, [SubAccount__1])];
    allSettlements : shared query () -> async [(TokenIndex, Settlement)];
    availableCycles : shared query () -> async Nat;
    balance : shared query BalanceRequest -> async BalanceResponse;
    bearer : shared query TokenIdentifier__1 -> async Result_6;
    clearPayments : shared (Principal, [SubAccount__1]) -> async ();
    copyAssets : shared (Nat, Nat) -> async ();
    cronDisbursements : shared () -> async ();
    cronSettlements : shared () -> async ();
    currentSubaccountOffset : shared () -> async Nat;
    details : shared query TokenIdentifier__1 -> async Result_7;
    extensions : shared query () -> async [Extension];
    getCanistergeekInformation : shared query GetInformationRequest -> async GetInformationResponse;
    getMinter : shared query () -> async Principal;
    getMyPrincipal : shared query () -> async Text;
    getProjectCreatorAccountId : shared query () -> async AccountIdentifier__1;
    getRegistry : shared query () -> async [(TokenIndex, AccountIdentifier__1)];
    getRewards : shared query () -> async [Text];
    getTokens : shared query () -> async [(TokenIndex, Metadata)];
    heartbeat_external : shared () -> async ();
    http_request : shared query HttpRequest -> async HttpResponse;
    http_request_streaming_callback : shared query HttpStreamingCallbackToken -> async HttpStreamingCallbackResponse;
    initRewards : shared [Text] -> async ();
    list : shared ListRequest -> async Result_3;
    list_bulk : shared [(TokenIndex, Nat64)] -> async [(TokenIndex, Nat64)];
    listings : shared query () -> async [(TokenIndex, Listing, Metadata)];
    lock : shared (
      TokenIdentifier__1,
      Nat64,
      AccountIdentifier__1,
      SubAccount__1,
    ) -> async Result_6;
    metadata : shared query TokenIdentifier__1 -> async Result_5;
    mintManyNFTs : shared [Principal] -> async [TokenIndex];
    mintManyNFTsAID : shared [AccountIdentifier__1] -> async [TokenIndex];
    mintManyNFTsWithAsset : shared ([Principal], Nat32) -> async [TokenIndex];
    payments : shared query () -> async ?[SubAccount__1];
    principalOwnsOne : shared query Principal -> async Bool;
    removeRewards : shared () -> async ();
    runHeartbeat : shared query () -> async Bool;
    setMinter : shared Principal -> async ();
    setProjectOwner : shared Principal -> async ();
    setRewardRedeemed : shared (
      TokenIdentifier__1,
      Nat,
      Bool,
    ) -> async Result_4;
    settle : shared TokenIdentifier__1 -> async Result_3;
    settlements : shared query () -> async [(TokenIndex, AccountIdentifier__1, Nat64)];
    stats : shared query () -> async (
      Nat64,
      Nat64,
      Nat64,
      Nat64,
      Nat,
      Nat,
      Nat,
    );
    streamAsset : shared (Nat, Bool, Blob) -> async ();
    subaccountAddress : shared Nat -> async Text;
    supply : shared query TokenIdentifier__1 -> async Result_2;
    tokens : shared query AccountIdentifier__1 -> async Result_1;
    tokens_ext : shared query AccountIdentifier__1 -> async Result;
    transactions : shared query () -> async [Transaction];
    transfer : shared TransferRequest -> async TransferResponse;
    transfer_bulk : shared [(TokenIndex, AccountIdentifier__1)] -> async [(TokenIndex, AccountIdentifier__1)];
    updateCanistergeekInformation : shared UpdateInformationRequest -> async ();
    updateThumb : shared (Text, File) -> async ?Nat
  }
}
