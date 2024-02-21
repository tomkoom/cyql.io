export const idlFactory = ({ IDL }) => {
  const File = IDL.Record({
    data: IDL.Vec(IDL.Vec(IDL.Nat8)),
    ctype: IDL.Text,
  })
  const Asset = IDL.Record({
    thumbnail: IDL.Opt(File),
    name: IDL.Text,
    payload: File,
  })
  const TokenIndex = IDL.Nat32
  const AccountIdentifier__1 = IDL.Text
  const SubAccount__1 = IDL.Vec(IDL.Nat8)
  const Settlement = IDL.Record({
    subaccount: SubAccount__1,
    seller: IDL.Principal,
    buyer: AccountIdentifier__1,
    price: IDL.Nat64,
  })
  const TokenIdentifier = IDL.Text
  const AccountIdentifier = IDL.Text
  const User = IDL.Variant({
    principal: IDL.Principal,
    address: AccountIdentifier,
  })
  const BalanceRequest = IDL.Record({
    token: TokenIdentifier,
    user: User,
  })
  const Balance = IDL.Nat
  const CommonError__1 = IDL.Variant({
    InvalidToken: TokenIdentifier,
    Other: IDL.Text,
  })
  const BalanceResponse = IDL.Variant({
    ok: Balance,
    err: CommonError__1,
  })
  const TokenIdentifier__1 = IDL.Text
  const CommonError = IDL.Variant({
    InvalidToken: TokenIdentifier,
    Other: IDL.Text,
  })
  const Result_6 = IDL.Variant({
    ok: AccountIdentifier__1,
    err: CommonError,
  })
  const Time = IDL.Int
  const Listing = IDL.Record({
    locked: IDL.Opt(Time),
    seller: IDL.Principal,
    price: IDL.Nat64,
  })
  const Result_7 = IDL.Variant({
    ok: IDL.Tuple(AccountIdentifier__1, IDL.Opt(Listing), IDL.Vec(IDL.Nat32)),
    err: CommonError,
  })
  const Extension = IDL.Text
  const StatusRequest = IDL.Record({
    memory_size: IDL.Bool,
    cycles: IDL.Bool,
    heap_memory_size: IDL.Bool,
  })
  const MetricsGranularity = IDL.Variant({
    hourly: IDL.Null,
    daily: IDL.Null,
  })
  const GetMetricsParameters = IDL.Record({
    dateToMillis: IDL.Nat,
    granularity: MetricsGranularity,
    dateFromMillis: IDL.Nat,
  })
  const MetricsRequest = IDL.Record({ parameters: GetMetricsParameters })
  const GetLogMessagesFilter = IDL.Record({
    analyzeCount: IDL.Nat32,
    messageRegex: IDL.Opt(IDL.Text),
    messageContains: IDL.Opt(IDL.Text),
  })
  const Nanos = IDL.Nat64
  const GetLogMessagesParameters = IDL.Record({
    count: IDL.Nat32,
    filter: IDL.Opt(GetLogMessagesFilter),
    fromTimeNanos: IDL.Opt(Nanos),
  })
  const GetLatestLogMessagesParameters = IDL.Record({
    upToTimeNanos: IDL.Opt(Nanos),
    count: IDL.Nat32,
    filter: IDL.Opt(GetLogMessagesFilter),
  })
  const CanisterLogRequest = IDL.Variant({
    getMessagesInfo: IDL.Null,
    getMessages: GetLogMessagesParameters,
    getLatestMessages: GetLatestLogMessagesParameters,
  })
  const GetInformationRequest = IDL.Record({
    status: IDL.Opt(StatusRequest),
    metrics: IDL.Opt(MetricsRequest),
    logs: IDL.Opt(CanisterLogRequest),
    version: IDL.Bool,
  })
  const StatusResponse = IDL.Record({
    memory_size: IDL.Opt(IDL.Nat64),
    cycles: IDL.Opt(IDL.Nat64),
    heap_memory_size: IDL.Opt(IDL.Nat64),
  })
  const UpdateCallsAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterHeapMemoryAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterCyclesAggregatedData = IDL.Vec(IDL.Nat64)
  const CanisterMemoryAggregatedData = IDL.Vec(IDL.Nat64)
  const HourlyMetricsData = IDL.Record({
    updateCalls: UpdateCallsAggregatedData,
    canisterHeapMemorySize: CanisterHeapMemoryAggregatedData,
    canisterCycles: CanisterCyclesAggregatedData,
    canisterMemorySize: CanisterMemoryAggregatedData,
    timeMillis: IDL.Int,
  })
  const NumericEntity = IDL.Record({
    avg: IDL.Nat64,
    max: IDL.Nat64,
    min: IDL.Nat64,
    first: IDL.Nat64,
    last: IDL.Nat64,
  })
  const DailyMetricsData = IDL.Record({
    updateCalls: IDL.Nat64,
    canisterHeapMemorySize: NumericEntity,
    canisterCycles: NumericEntity,
    canisterMemorySize: NumericEntity,
    timeMillis: IDL.Int,
  })
  const CanisterMetricsData = IDL.Variant({
    hourly: IDL.Vec(HourlyMetricsData),
    daily: IDL.Vec(DailyMetricsData),
  })
  const CanisterMetrics = IDL.Record({ data: CanisterMetricsData })
  const MetricsResponse = IDL.Record({ metrics: IDL.Opt(CanisterMetrics) })
  const CanisterLogFeature = IDL.Variant({
    filterMessageByContains: IDL.Null,
    filterMessageByRegex: IDL.Null,
  })
  const CanisterLogMessagesInfo = IDL.Record({
    features: IDL.Vec(IDL.Opt(CanisterLogFeature)),
    lastTimeNanos: IDL.Opt(Nanos),
    count: IDL.Nat32,
    firstTimeNanos: IDL.Opt(Nanos),
  })
  const LogMessagesData = IDL.Record({
    timeNanos: Nanos,
    message: IDL.Text,
  })
  const CanisterLogMessages = IDL.Record({
    data: IDL.Vec(LogMessagesData),
    lastAnalyzedMessageTimeNanos: IDL.Opt(Nanos),
  })
  const CanisterLogResponse = IDL.Variant({
    messagesInfo: CanisterLogMessagesInfo,
    messages: CanisterLogMessages,
  })
  const GetInformationResponse = IDL.Record({
    status: IDL.Opt(StatusResponse),
    metrics: IDL.Opt(MetricsResponse),
    logs: IDL.Opt(CanisterLogResponse),
    version: IDL.Opt(IDL.Nat),
  })
  const Metadata = IDL.Variant({
    fungible: IDL.Record({
      decimals: IDL.Nat8,
      metadata: IDL.Opt(IDL.Vec(IDL.Nat8)),
      name: IDL.Text,
      symbol: IDL.Text,
    }),
    nonfungible: IDL.Record({ metadata: IDL.Opt(IDL.Vec(IDL.Nat8)) }),
  })
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text)
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
  })
  const HttpStreamingCallbackToken = IDL.Record({
    key: IDL.Text,
    sha256: IDL.Opt(IDL.Vec(IDL.Nat8)),
    index: IDL.Nat,
    content_encoding: IDL.Text,
  })
  const HttpStreamingCallbackResponse = IDL.Record({
    token: IDL.Opt(HttpStreamingCallbackToken),
    body: IDL.Vec(IDL.Nat8),
  })
  const HttpStreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: HttpStreamingCallbackToken,
      callback: IDL.Func([HttpStreamingCallbackToken], [HttpStreamingCallbackResponse], ["query"]),
    }),
  })
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(HttpStreamingStrategy),
    status_code: IDL.Nat16,
  })
  const ListRequest = IDL.Record({
    token: TokenIdentifier__1,
    from_subaccount: IDL.Opt(SubAccount__1),
    price: IDL.Opt(IDL.Nat64),
  })
  const Result_3 = IDL.Variant({ ok: IDL.Null, err: CommonError })
  const Result_5 = IDL.Variant({ ok: Metadata, err: CommonError })
  const Result_4 = IDL.Variant({ ok: IDL.Text, err: CommonError })
  const Balance__1 = IDL.Nat
  const Result_2 = IDL.Variant({ ok: Balance__1, err: CommonError })
  const Result_1 = IDL.Variant({
    ok: IDL.Vec(TokenIndex),
    err: CommonError,
  })
  const Result = IDL.Variant({
    ok: IDL.Vec(IDL.Tuple(TokenIndex, IDL.Opt(Listing), IDL.Opt(IDL.Vec(IDL.Nat8)))),
    err: CommonError,
  })
  const Transaction = IDL.Record({
    token: TokenIdentifier__1,
    time: Time,
    seller: IDL.Principal,
    buyer: AccountIdentifier__1,
    price: IDL.Nat64,
  })
  const Memo = IDL.Vec(IDL.Nat8)
  const SubAccount = IDL.Vec(IDL.Nat8)
  const TransferRequest = IDL.Record({
    to: User,
    token: TokenIdentifier,
    notify: IDL.Bool,
    from: User,
    memo: Memo,
    subaccount: IDL.Opt(SubAccount),
    amount: Balance,
  })
  const TransferResponse = IDL.Variant({
    ok: Balance,
    err: IDL.Variant({
      CannotNotify: AccountIdentifier,
      InsufficientBalance: IDL.Null,
      InvalidToken: TokenIdentifier,
      Rejected: IDL.Null,
      Unauthorized: AccountIdentifier,
      Other: IDL.Text,
    }),
  })
  const CollectMetricsRequestType = IDL.Variant({
    force: IDL.Null,
    normal: IDL.Null,
  })
  const UpdateInformationRequest = IDL.Record({
    metrics: IDL.Opt(CollectMetricsRequestType),
  })
  return IDL.Service({
    acceptCycles: IDL.Func([], [], []),
    addAsset: IDL.Func([Asset], [IDL.Nat], []),
    addAssetAtIndex: IDL.Func([Asset, IDL.Nat], [IDL.Nat], []),
    adminAddDisbursement: IDL.Func([TokenIndex, IDL.Nat, IDL.Nat64, AccountIdentifier__1], [], []),
    adminKillHeartbeat: IDL.Func([], [], []),
    adminRemoveListing: IDL.Func([IDL.Nat], [], []),
    adminStartHeartbeat: IDL.Func([], [], []),
    allPayments: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Vec(SubAccount__1)))],
      ["query"]
    ),
    allSettlements: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenIndex, Settlement))], ["query"]),
    availableCycles: IDL.Func([], [IDL.Nat], ["query"]),
    balance: IDL.Func([BalanceRequest], [BalanceResponse], ["query"]),
    bearer: IDL.Func([TokenIdentifier__1], [Result_6], ["query"]),
    clearPayments: IDL.Func([IDL.Principal, IDL.Vec(SubAccount__1)], [], []),
    copyAssets: IDL.Func([IDL.Nat, IDL.Nat], [], []),
    cronDisbursements: IDL.Func([], [], []),
    cronSettlements: IDL.Func([], [], []),
    currentSubaccountOffset: IDL.Func([], [IDL.Nat], []),
    details: IDL.Func([TokenIdentifier__1], [Result_7], ["query"]),
    extensions: IDL.Func([], [IDL.Vec(Extension)], ["query"]),
    getCanistergeekInformation: IDL.Func(
      [GetInformationRequest],
      [GetInformationResponse],
      ["query"]
    ),
    getMinter: IDL.Func([], [IDL.Principal], ["query"]),
    getMyPrincipal: IDL.Func([], [IDL.Text], ["query"]),
    getProjectCreatorAccountId: IDL.Func([], [AccountIdentifier__1], ["query"]),
    getRegistry: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))], ["query"]),
    getRewards: IDL.Func([], [IDL.Vec(IDL.Text)], ["query"]),
    getTokens: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenIndex, Metadata))], ["query"]),
    heartbeat_external: IDL.Func([], [], []),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    http_request_streaming_callback: IDL.Func(
      [HttpStreamingCallbackToken],
      [HttpStreamingCallbackResponse],
      ["query"]
    ),
    initRewards: IDL.Func([IDL.Vec(IDL.Text)], [], []),
    list: IDL.Func([ListRequest], [Result_3], []),
    list_bulk: IDL.Func(
      [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Nat64))],
      [IDL.Vec(IDL.Tuple(TokenIndex, IDL.Nat64))],
      []
    ),
    listings: IDL.Func([], [IDL.Vec(IDL.Tuple(TokenIndex, Listing, Metadata))], ["query"]),
    lock: IDL.Func(
      [TokenIdentifier__1, IDL.Nat64, AccountIdentifier__1, SubAccount__1],
      [Result_6],
      []
    ),
    metadata: IDL.Func([TokenIdentifier__1], [Result_5], ["query"]),
    mintManyNFTs: IDL.Func([IDL.Vec(IDL.Principal)], [IDL.Vec(TokenIndex)], []),
    mintManyNFTsAID: IDL.Func([IDL.Vec(AccountIdentifier__1)], [IDL.Vec(TokenIndex)], []),
    mintManyNFTsWithAsset: IDL.Func([IDL.Vec(IDL.Principal), IDL.Nat32], [IDL.Vec(TokenIndex)], []),
    payments: IDL.Func([], [IDL.Opt(IDL.Vec(SubAccount__1))], ["query"]),
    principalOwnsOne: IDL.Func([IDL.Principal], [IDL.Bool], ["query"]),
    removeRewards: IDL.Func([], [], []),
    runHeartbeat: IDL.Func([], [IDL.Bool], ["query"]),
    setMinter: IDL.Func([IDL.Principal], [], []),
    setProjectOwner: IDL.Func([IDL.Principal], [], []),
    setRewardRedeemed: IDL.Func([TokenIdentifier__1, IDL.Nat, IDL.Bool], [Result_4], []),
    settle: IDL.Func([TokenIdentifier__1], [Result_3], []),
    settlements: IDL.Func(
      [],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1, IDL.Nat64))],
      ["query"]
    ),
    stats: IDL.Func(
      [],
      [IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat64, IDL.Nat, IDL.Nat, IDL.Nat],
      ["query"]
    ),
    streamAsset: IDL.Func([IDL.Nat, IDL.Bool, IDL.Vec(IDL.Nat8)], [], []),
    subaccountAddress: IDL.Func([IDL.Nat], [IDL.Text], []),
    supply: IDL.Func([TokenIdentifier__1], [Result_2], ["query"]),
    tokens: IDL.Func([AccountIdentifier__1], [Result_1], ["query"]),
    tokens_ext: IDL.Func([AccountIdentifier__1], [Result], ["query"]),
    transactions: IDL.Func([], [IDL.Vec(Transaction)], ["query"]),
    transfer: IDL.Func([TransferRequest], [TransferResponse], []),
    transfer_bulk: IDL.Func(
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
      [IDL.Vec(IDL.Tuple(TokenIndex, AccountIdentifier__1))],
      []
    ),
    updateCanistergeekInformation: IDL.Func([UpdateInformationRequest], [], []),
    updateThumb: IDL.Func([IDL.Text, File], [IDL.Opt(IDL.Nat)], []),
  })
}
export const init = ({ IDL }) => {
  return []
}
