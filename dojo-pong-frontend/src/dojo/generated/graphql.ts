import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ContractAddress: { input: any; output: any; }
  Cursor: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  felt252: { input: any; output: any; }
  u256: { input: any; output: any; }
};

export type Ball = {
  __typename?: 'Ball';
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u256']['output']>;
  horizontol_direction?: Maybe<Scalars['u256']['output']>;
  vertical_direction?: Maybe<Scalars['u256']['output']>;
  x_position?: Maybe<Scalars['u256']['output']>;
  y_position?: Maybe<Scalars['u256']['output']>;
};

export type BallConnection = {
  __typename?: 'BallConnection';
  edges?: Maybe<Array<Maybe<BallEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BallEdge = {
  __typename?: 'BallEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Ball>;
};

export type BallOrder = {
  direction: OrderDirection;
  field: BallOrderField;
};

export enum BallOrderField {
  GameId = 'GAME_ID',
  HorizontolDirection = 'HORIZONTOL_DIRECTION',
  VerticalDirection = 'VERTICAL_DIRECTION',
  XPosition = 'X_POSITION',
  YPosition = 'Y_POSITION'
}

export type BallWhereInput = {
  game_id?: InputMaybe<Scalars['u256']['input']>;
  game_idEQ?: InputMaybe<Scalars['u256']['input']>;
  game_idGT?: InputMaybe<Scalars['u256']['input']>;
  game_idGTE?: InputMaybe<Scalars['u256']['input']>;
  game_idLT?: InputMaybe<Scalars['u256']['input']>;
  game_idLTE?: InputMaybe<Scalars['u256']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  horizontol_direction?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionEQ?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionGT?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionGTE?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionLT?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionLTE?: InputMaybe<Scalars['u256']['input']>;
  horizontol_directionNEQ?: InputMaybe<Scalars['u256']['input']>;
  vertical_direction?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionEQ?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionGT?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionGTE?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionLT?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionLTE?: InputMaybe<Scalars['u256']['input']>;
  vertical_directionNEQ?: InputMaybe<Scalars['u256']['input']>;
  x_position?: InputMaybe<Scalars['u256']['input']>;
  x_positionEQ?: InputMaybe<Scalars['u256']['input']>;
  x_positionGT?: InputMaybe<Scalars['u256']['input']>;
  x_positionGTE?: InputMaybe<Scalars['u256']['input']>;
  x_positionLT?: InputMaybe<Scalars['u256']['input']>;
  x_positionLTE?: InputMaybe<Scalars['u256']['input']>;
  x_positionNEQ?: InputMaybe<Scalars['u256']['input']>;
  y_position?: InputMaybe<Scalars['u256']['input']>;
  y_positionEQ?: InputMaybe<Scalars['u256']['input']>;
  y_positionGT?: InputMaybe<Scalars['u256']['input']>;
  y_positionGTE?: InputMaybe<Scalars['u256']['input']>;
  y_positionLT?: InputMaybe<Scalars['u256']['input']>;
  y_positionLTE?: InputMaybe<Scalars['u256']['input']>;
  y_positionNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type Bat = {
  __typename?: 'Bat';
  entity?: Maybe<World__Entity>;
  game_id?: Maybe<Scalars['u256']['output']>;
  player?: Maybe<Scalars['ContractAddress']['output']>;
  player_id?: Maybe<Scalars['u256']['output']>;
  y_index?: Maybe<Scalars['u256']['output']>;
};

export type BatConnection = {
  __typename?: 'BatConnection';
  edges?: Maybe<Array<Maybe<BatEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type BatEdge = {
  __typename?: 'BatEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<Bat>;
};

export type BatOrder = {
  direction: OrderDirection;
  field: BatOrderField;
};

export enum BatOrderField {
  GameId = 'GAME_ID',
  Player = 'PLAYER',
  PlayerId = 'PLAYER_ID',
  YIndex = 'Y_INDEX'
}

export type BatWhereInput = {
  game_id?: InputMaybe<Scalars['u256']['input']>;
  game_idEQ?: InputMaybe<Scalars['u256']['input']>;
  game_idGT?: InputMaybe<Scalars['u256']['input']>;
  game_idGTE?: InputMaybe<Scalars['u256']['input']>;
  game_idLT?: InputMaybe<Scalars['u256']['input']>;
  game_idLTE?: InputMaybe<Scalars['u256']['input']>;
  game_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  player?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerGTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLT?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerLTE?: InputMaybe<Scalars['ContractAddress']['input']>;
  playerNEQ?: InputMaybe<Scalars['ContractAddress']['input']>;
  player_id?: InputMaybe<Scalars['u256']['input']>;
  player_idEQ?: InputMaybe<Scalars['u256']['input']>;
  player_idGT?: InputMaybe<Scalars['u256']['input']>;
  player_idGTE?: InputMaybe<Scalars['u256']['input']>;
  player_idLT?: InputMaybe<Scalars['u256']['input']>;
  player_idLTE?: InputMaybe<Scalars['u256']['input']>;
  player_idNEQ?: InputMaybe<Scalars['u256']['input']>;
  y_index?: InputMaybe<Scalars['u256']['input']>;
  y_indexEQ?: InputMaybe<Scalars['u256']['input']>;
  y_indexGT?: InputMaybe<Scalars['u256']['input']>;
  y_indexGTE?: InputMaybe<Scalars['u256']['input']>;
  y_indexLT?: InputMaybe<Scalars['u256']['input']>;
  y_indexLTE?: InputMaybe<Scalars['u256']['input']>;
  y_indexNEQ?: InputMaybe<Scalars['u256']['input']>;
};

export type ModelUnion = Ball | Bat;

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type World__Content = {
  __typename?: 'World__Content';
  coverUri?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  iconUri?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  socials?: Maybe<Array<Maybe<World__Social>>>;
  website?: Maybe<Scalars['String']['output']>;
};

export type World__Entity = {
  __typename?: 'World__Entity';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  models?: Maybe<Array<Maybe<ModelUnion>>>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type World__EntityConnection = {
  __typename?: 'World__EntityConnection';
  edges?: Maybe<Array<Maybe<World__EntityEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EntityEdge = {
  __typename?: 'World__EntityEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Entity>;
};

export type World__Event = {
  __typename?: 'World__Event';
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  data?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  id?: Maybe<Scalars['ID']['output']>;
  keys?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  transactionHash?: Maybe<Scalars['String']['output']>;
};

export type World__EventConnection = {
  __typename?: 'World__EventConnection';
  edges?: Maybe<Array<Maybe<World__EventEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__EventEdge = {
  __typename?: 'World__EventEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Event>;
};

export type World__Metadata = {
  __typename?: 'World__Metadata';
  content?: Maybe<World__Content>;
  coverImg?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  iconImg?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
  worldAddress: Scalars['String']['output'];
};

export type World__MetadataConnection = {
  __typename?: 'World__MetadataConnection';
  edges?: Maybe<Array<Maybe<World__MetadataEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__MetadataEdge = {
  __typename?: 'World__MetadataEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Metadata>;
};

export type World__Model = {
  __typename?: 'World__Model';
  classHash?: Maybe<Scalars['felt252']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__ModelConnection = {
  __typename?: 'World__ModelConnection';
  edges?: Maybe<Array<Maybe<World__ModelEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__ModelEdge = {
  __typename?: 'World__ModelEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Model>;
};

export type World__ModelOrder = {
  direction: OrderDirection;
  field: World__ModelOrderField;
};

export enum World__ModelOrderField {
  ClassHash = 'CLASS_HASH',
  Name = 'NAME'
}

export type World__PageInfo = {
  __typename?: 'World__PageInfo';
  endCursor?: Maybe<Scalars['Cursor']['output']>;
  hasNextPage?: Maybe<Scalars['Boolean']['output']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']['output']>;
  startCursor?: Maybe<Scalars['Cursor']['output']>;
};

export type World__Query = {
  __typename?: 'World__Query';
  ballModels?: Maybe<BallConnection>;
  batModels?: Maybe<BatConnection>;
  entities?: Maybe<World__EntityConnection>;
  entity: World__Entity;
  events?: Maybe<World__EventConnection>;
  metadatas?: Maybe<World__MetadataConnection>;
  model: World__Model;
  models?: Maybe<World__ModelConnection>;
  transaction: World__Transaction;
  transactions?: Maybe<World__TransactionConnection>;
};


export type World__QueryBallModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BallOrder>;
  where?: InputMaybe<BallWhereInput>;
};


export type World__QueryBatModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<BatOrder>;
  where?: InputMaybe<BatWhereInput>;
};


export type World__QueryEntitiesArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryEntityArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryEventsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryMetadatasArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type World__QueryModelArgs = {
  id: Scalars['ID']['input'];
};


export type World__QueryModelsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order?: InputMaybe<World__ModelOrder>;
};


export type World__QueryTransactionArgs = {
  transactionHash: Scalars['ID']['input'];
};


export type World__QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['Cursor']['input']>;
  before?: InputMaybe<Scalars['Cursor']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type World__Social = {
  __typename?: 'World__Social';
  name?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type World__Subscription = {
  __typename?: 'World__Subscription';
  entityUpdated: World__Entity;
  eventEmitted: World__Event;
  modelRegistered: World__Model;
};


export type World__SubscriptionEntityUpdatedArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type World__SubscriptionEventEmittedArgs = {
  keys?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


export type World__SubscriptionModelRegisteredArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};

export type World__Transaction = {
  __typename?: 'World__Transaction';
  calldata?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  maxFee?: Maybe<Scalars['felt252']['output']>;
  nonce?: Maybe<Scalars['felt252']['output']>;
  senderAddress?: Maybe<Scalars['felt252']['output']>;
  signature?: Maybe<Array<Maybe<Scalars['felt252']['output']>>>;
  transactionHash?: Maybe<Scalars['felt252']['output']>;
};

export type World__TransactionConnection = {
  __typename?: 'World__TransactionConnection';
  edges?: Maybe<Array<Maybe<World__TransactionEdge>>>;
  pageInfo: World__PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type World__TransactionEdge = {
  __typename?: 'World__TransactionEdge';
  cursor?: Maybe<Scalars['Cursor']['output']>;
  node?: Maybe<World__Transaction>;
};



export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {

  };
}
export type Sdk = ReturnType<typeof getSdk>;