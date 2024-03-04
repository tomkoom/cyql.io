// https://dashboard.internetcomputer.org/canister/dtlqp-nqaaa-aaaak-abwna-cai

import type { Principal } from "@dfinity/principal"
import type { ActorMethod } from "@dfinity/agent"

export type AccountIdentifier = string
export type AccountIdentifier__1 = string
export interface Asset {
  thumbnail: [] | [File]
  name: string
  payload: File
}
export type Balance = bigint
export interface BalanceRequest {
  token: TokenIdentifier
  user: User
}
export type BalanceResponse = { ok: Balance } | { err: CommonError__1 }
export type Balance__1 = bigint
export type CanisterCyclesAggregatedData = BigUint64Array | bigint[]
export type CanisterHeapMemoryAggregatedData = BigUint64Array | bigint[]
export type CanisterLogFeature = { filterMessageByContains: null } | { filterMessageByRegex: null }
export interface CanisterLogMessages {
  data: Array<LogMessagesData>
  lastAnalyzedMessageTimeNanos: [] | [Nanos]
}
export interface CanisterLogMessagesInfo {
  features: Array<[] | [CanisterLogFeature]>
  lastTimeNanos: [] | [Nanos]
  count: number
  firstTimeNanos: [] | [Nanos]
}
export type CanisterLogRequest =
  | { getMessagesInfo: null }
  | { getMessages: GetLogMessagesParameters }
  | { getLatestMessages: GetLatestLogMessagesParameters }
export type CanisterLogResponse =
  | { messagesInfo: CanisterLogMessagesInfo }
  | { messages: CanisterLogMessages }
export type CanisterMemoryAggregatedData = BigUint64Array | bigint[]
export interface CanisterMetrics {
  data: CanisterMetricsData
}
export type CanisterMetricsData =
  | { hourly: Array<HourlyMetricsData> }
  | { daily: Array<DailyMetricsData> }
export type CollectMetricsRequestType = { force: null } | { normal: null }
export type CommonError = { InvalidToken: TokenIdentifier } | { Other: string }
export type CommonError__1 = { InvalidToken: TokenIdentifier } | { Other: string }
export interface DailyMetricsData {
  updateCalls: bigint
  canisterHeapMemorySize: NumericEntity
  canisterCycles: NumericEntity
  canisterMemorySize: NumericEntity
  timeMillis: bigint
}
export type Extension = string
export interface File {
  data: Array<Uint8Array | number[]>
  ctype: string
}
export interface GetInformationRequest {
  status: [] | [StatusRequest]
  metrics: [] | [MetricsRequest]
  logs: [] | [CanisterLogRequest]
  version: boolean
}
export interface GetInformationResponse {
  status: [] | [StatusResponse]
  metrics: [] | [MetricsResponse]
  logs: [] | [CanisterLogResponse]
  version: [] | [bigint]
}
export interface GetLatestLogMessagesParameters {
  upToTimeNanos: [] | [Nanos]
  count: number
  filter: [] | [GetLogMessagesFilter]
}
export interface GetLogMessagesFilter {
  analyzeCount: number
  messageRegex: [] | [string]
  messageContains: [] | [string]
}
export interface GetLogMessagesParameters {
  count: number
  filter: [] | [GetLogMessagesFilter]
  fromTimeNanos: [] | [Nanos]
}
export interface GetMetricsParameters {
  dateToMillis: bigint
  granularity: MetricsGranularity
  dateFromMillis: bigint
}
export type HeaderField = [string, string]
export interface HourlyMetricsData {
  updateCalls: UpdateCallsAggregatedData
  canisterHeapMemorySize: CanisterHeapMemoryAggregatedData
  canisterCycles: CanisterCyclesAggregatedData
  canisterMemorySize: CanisterMemoryAggregatedData
  timeMillis: bigint
}
export interface HttpRequest {
  url: string
  method: string
  body: Uint8Array | number[]
  headers: Array<HeaderField>
}
export interface HttpResponse {
  body: Uint8Array | number[]
  headers: Array<HeaderField>
  streaming_strategy: [] | [HttpStreamingStrategy]
  status_code: number
}
export interface HttpStreamingCallbackResponse {
  token: [] | [HttpStreamingCallbackToken]
  body: Uint8Array | number[]
}
export interface HttpStreamingCallbackToken {
  key: string
  sha256: [] | [Uint8Array | number[]]
  index: bigint
  content_encoding: string
}
export type HttpStreamingStrategy = {
  Callback: {
    token: HttpStreamingCallbackToken
    callback: [Principal, string]
  }
}
export interface ListRequest {
  token: TokenIdentifier__1
  from_subaccount: [] | [SubAccount__1]
  price: [] | [bigint]
}
export interface Listing {
  locked: [] | [Time]
  seller: Principal
  price: bigint
}
export interface LogMessagesData {
  timeNanos: Nanos
  message: string
}
export type Memo = Uint8Array | number[]
export type Metadata =
  | {
      fungible: {
        decimals: number
        metadata: [] | [Uint8Array | number[]]
        name: string
        symbol: string
      }
    }
  | { nonfungible: { metadata: [] | [Uint8Array | number[]] } }
export type MetricsGranularity = { hourly: null } | { daily: null }
export interface MetricsRequest {
  parameters: GetMetricsParameters
}
export interface MetricsResponse {
  metrics: [] | [CanisterMetrics]
}
export type Nanos = bigint
export interface NumericEntity {
  avg: bigint
  max: bigint
  min: bigint
  first: bigint
  last: bigint
}
export type Result =
  | {
      ok: Array<[TokenIndex, [] | [Listing], [] | [Uint8Array | number[]]]>
    }
  | { err: CommonError }
export type Result_1 = { ok: Uint32Array | number[] } | { err: CommonError }
export type Result_2 = { ok: Balance__1 } | { err: CommonError }
export type Result_3 = { ok: null } | { err: CommonError }
export type Result_4 = { ok: string } | { err: CommonError }
export type Result_5 = { ok: Metadata } | { err: CommonError }
export type Result_6 = { ok: AccountIdentifier__1 } | { err: CommonError }
export type Result_7 =
  | {
      ok: [AccountIdentifier__1, [] | [Listing], Uint32Array | number[]]
    }
  | { err: CommonError }
export interface Settlement {
  subaccount: SubAccount__1
  seller: Principal
  buyer: AccountIdentifier__1
  price: bigint
}
export interface StatusRequest {
  memory_size: boolean
  cycles: boolean
  heap_memory_size: boolean
}
export interface StatusResponse {
  memory_size: [] | [bigint]
  cycles: [] | [bigint]
  heap_memory_size: [] | [bigint]
}
export type SubAccount = Uint8Array | number[]
export type SubAccount__1 = Uint8Array | number[]
export type Time = bigint
export type TokenIdentifier = string
export type TokenIdentifier__1 = string
export type TokenIndex = number
export interface Transaction {
  token: TokenIdentifier__1
  time: Time
  seller: Principal
  buyer: AccountIdentifier__1
  price: bigint
}
export interface TransferRequest {
  to: User
  token: TokenIdentifier
  notify: boolean
  from: User
  memo: Memo
  subaccount: [] | [SubAccount]
  amount: Balance
}
export type TransferResponse =
  | { ok: Balance }
  | {
      err:
        | { CannotNotify: AccountIdentifier }
        | { InsufficientBalance: null }
        | { InvalidToken: TokenIdentifier }
        | { Rejected: null }
        | { Unauthorized: AccountIdentifier }
        | { Other: string }
    }
export type UpdateCallsAggregatedData = BigUint64Array | bigint[]
export interface UpdateInformationRequest {
  metrics: [] | [CollectMetricsRequestType]
}
export type User = { principal: Principal } | { address: AccountIdentifier }
export interface _SERVICE {
  acceptCycles: ActorMethod<[], undefined>
  addAsset: ActorMethod<[Asset], bigint>
  addAssetAtIndex: ActorMethod<[Asset, bigint], bigint>
  adminAddDisbursement: ActorMethod<[TokenIndex, bigint, bigint, AccountIdentifier__1], undefined>
  adminKillHeartbeat: ActorMethod<[], undefined>
  adminRemoveListing: ActorMethod<[bigint], undefined>
  adminStartHeartbeat: ActorMethod<[], undefined>
  allPayments: ActorMethod<[], Array<[Principal, Array<SubAccount__1>]>>
  allSettlements: ActorMethod<[], Array<[TokenIndex, Settlement]>>
  availableCycles: ActorMethod<[], bigint>
  balance: ActorMethod<[BalanceRequest], BalanceResponse>
  bearer: ActorMethod<[TokenIdentifier__1], Result_6>
  clearPayments: ActorMethod<[Principal, Array<SubAccount__1>], undefined>
  copyAssets: ActorMethod<[bigint, bigint], undefined>
  cronDisbursements: ActorMethod<[], undefined>
  cronSettlements: ActorMethod<[], undefined>
  currentSubaccountOffset: ActorMethod<[], bigint>
  details: ActorMethod<[TokenIdentifier__1], Result_7>
  extensions: ActorMethod<[], Array<Extension>>
  getCanistergeekInformation: ActorMethod<[GetInformationRequest], GetInformationResponse>
  getMinter: ActorMethod<[], Principal>
  getMyPrincipal: ActorMethod<[], string>
  getProjectCreatorAccountId: ActorMethod<[], AccountIdentifier__1>
  getRegistry: ActorMethod<[], Array<[TokenIndex, AccountIdentifier__1]>>
  getRewards: ActorMethod<[], Array<string>>
  getTokens: ActorMethod<[], Array<[TokenIndex, Metadata]>>
  heartbeat_external: ActorMethod<[], undefined>
  http_request: ActorMethod<[HttpRequest], HttpResponse>
  http_request_streaming_callback: ActorMethod<
    [HttpStreamingCallbackToken],
    HttpStreamingCallbackResponse
  >
  initRewards: ActorMethod<[Array<string>], undefined>
  list: ActorMethod<[ListRequest], Result_3>
  list_bulk: ActorMethod<[Array<[TokenIndex, bigint]>], Array<[TokenIndex, bigint]>>
  listings: ActorMethod<[], Array<[TokenIndex, Listing, Metadata]>>
  lock: ActorMethod<[TokenIdentifier__1, bigint, AccountIdentifier__1, SubAccount__1], Result_6>
  metadata: ActorMethod<[TokenIdentifier__1], Result_5>
  mintManyNFTs: ActorMethod<[Array<Principal>], Uint32Array | number[]>
  mintManyNFTsAID: ActorMethod<[Array<AccountIdentifier__1>], Uint32Array | number[]>
  mintManyNFTsWithAsset: ActorMethod<[Array<Principal>, number], Uint32Array | number[]>
  payments: ActorMethod<[], [] | [Array<SubAccount__1>]>
  principalOwnsOne: ActorMethod<[Principal], boolean>
  removeRewards: ActorMethod<[], undefined>
  runHeartbeat: ActorMethod<[], boolean>
  setMinter: ActorMethod<[Principal], undefined>
  setProjectOwner: ActorMethod<[Principal], undefined>
  setRewardRedeemed: ActorMethod<[TokenIdentifier__1, bigint, boolean], Result_4>
  settle: ActorMethod<[TokenIdentifier__1], Result_3>
  settlements: ActorMethod<[], Array<[TokenIndex, AccountIdentifier__1, bigint]>>
  stats: ActorMethod<[], [bigint, bigint, bigint, bigint, bigint, bigint, bigint]>
  streamAsset: ActorMethod<[bigint, boolean, Uint8Array | number[]], undefined>
  subaccountAddress: ActorMethod<[bigint], string>
  supply: ActorMethod<[TokenIdentifier__1], Result_2>
  tokens: ActorMethod<[AccountIdentifier__1], Result_1>
  tokens_ext: ActorMethod<[AccountIdentifier__1], Result>
  transactions: ActorMethod<[], Array<Transaction>>
  transfer: ActorMethod<[TransferRequest], TransferResponse>
  transfer_bulk: ActorMethod<
    [Array<[TokenIndex, AccountIdentifier__1]>],
    Array<[TokenIndex, AccountIdentifier__1]>
  >
  updateCanistergeekInformation: ActorMethod<[UpdateInformationRequest], undefined>
  updateThumb: ActorMethod<[string, File], [] | [bigint]>
}
