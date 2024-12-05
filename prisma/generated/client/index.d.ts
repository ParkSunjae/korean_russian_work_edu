
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Dictionary
 * 
 */
export type Dictionary = $Result.DefaultSelection<Prisma.$DictionaryPayload>
/**
 * Model Statistics
 * 
 */
export type Statistics = $Result.DefaultSelection<Prisma.$StatisticsPayload>
/**
 * Model MenuStats
 * 
 */
export type MenuStats = $Result.DefaultSelection<Prisma.$MenuStatsPayload>
/**
 * Model WordStats
 * 
 */
export type WordStats = $Result.DefaultSelection<Prisma.$WordStatsPayload>
/**
 * Model Notice
 * 
 */
export type Notice = $Result.DefaultSelection<Prisma.$NoticePayload>
/**
 * Model GameRecord
 * 
 */
export type GameRecord = $Result.DefaultSelection<Prisma.$GameRecordPayload>
/**
 * Model Example
 * 
 */
export type Example = $Result.DefaultSelection<Prisma.$ExamplePayload>
/**
 * Model Suggestion
 * 
 */
export type Suggestion = $Result.DefaultSelection<Prisma.$SuggestionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Dictionaries
 * const dictionaries = await prisma.dictionary.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Dictionaries
   * const dictionaries = await prisma.dictionary.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.dictionary`: Exposes CRUD operations for the **Dictionary** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dictionaries
    * const dictionaries = await prisma.dictionary.findMany()
    * ```
    */
  get dictionary(): Prisma.DictionaryDelegate<ExtArgs>;

  /**
   * `prisma.statistics`: Exposes CRUD operations for the **Statistics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Statistics
    * const statistics = await prisma.statistics.findMany()
    * ```
    */
  get statistics(): Prisma.StatisticsDelegate<ExtArgs>;

  /**
   * `prisma.menuStats`: Exposes CRUD operations for the **MenuStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MenuStats
    * const menuStats = await prisma.menuStats.findMany()
    * ```
    */
  get menuStats(): Prisma.MenuStatsDelegate<ExtArgs>;

  /**
   * `prisma.wordStats`: Exposes CRUD operations for the **WordStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WordStats
    * const wordStats = await prisma.wordStats.findMany()
    * ```
    */
  get wordStats(): Prisma.WordStatsDelegate<ExtArgs>;

  /**
   * `prisma.notice`: Exposes CRUD operations for the **Notice** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notices
    * const notices = await prisma.notice.findMany()
    * ```
    */
  get notice(): Prisma.NoticeDelegate<ExtArgs>;

  /**
   * `prisma.gameRecord`: Exposes CRUD operations for the **GameRecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more GameRecords
    * const gameRecords = await prisma.gameRecord.findMany()
    * ```
    */
  get gameRecord(): Prisma.GameRecordDelegate<ExtArgs>;

  /**
   * `prisma.example`: Exposes CRUD operations for the **Example** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Examples
    * const examples = await prisma.example.findMany()
    * ```
    */
  get example(): Prisma.ExampleDelegate<ExtArgs>;

  /**
   * `prisma.suggestion`: Exposes CRUD operations for the **Suggestion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Suggestions
    * const suggestions = await prisma.suggestion.findMany()
    * ```
    */
  get suggestion(): Prisma.SuggestionDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.0.1
   * Query Engine version: 5dbef10bdbfb579e07d35cc85fb1518d357cb99e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Dictionary: 'Dictionary',
    Statistics: 'Statistics',
    MenuStats: 'MenuStats',
    WordStats: 'WordStats',
    Notice: 'Notice',
    GameRecord: 'GameRecord',
    Example: 'Example',
    Suggestion: 'Suggestion'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "dictionary" | "statistics" | "menuStats" | "wordStats" | "notice" | "gameRecord" | "example" | "suggestion"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Dictionary: {
        payload: Prisma.$DictionaryPayload<ExtArgs>
        fields: Prisma.DictionaryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DictionaryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DictionaryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          findFirst: {
            args: Prisma.DictionaryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DictionaryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          findMany: {
            args: Prisma.DictionaryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>[]
          }
          create: {
            args: Prisma.DictionaryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          createMany: {
            args: Prisma.DictionaryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DictionaryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>[]
          }
          delete: {
            args: Prisma.DictionaryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          update: {
            args: Prisma.DictionaryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          deleteMany: {
            args: Prisma.DictionaryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DictionaryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DictionaryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DictionaryPayload>
          }
          aggregate: {
            args: Prisma.DictionaryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDictionary>
          }
          groupBy: {
            args: Prisma.DictionaryGroupByArgs<ExtArgs>
            result: $Utils.Optional<DictionaryGroupByOutputType>[]
          }
          count: {
            args: Prisma.DictionaryCountArgs<ExtArgs>
            result: $Utils.Optional<DictionaryCountAggregateOutputType> | number
          }
        }
      }
      Statistics: {
        payload: Prisma.$StatisticsPayload<ExtArgs>
        fields: Prisma.StatisticsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StatisticsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StatisticsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          findFirst: {
            args: Prisma.StatisticsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StatisticsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          findMany: {
            args: Prisma.StatisticsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>[]
          }
          create: {
            args: Prisma.StatisticsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          createMany: {
            args: Prisma.StatisticsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StatisticsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>[]
          }
          delete: {
            args: Prisma.StatisticsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          update: {
            args: Prisma.StatisticsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          deleteMany: {
            args: Prisma.StatisticsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StatisticsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.StatisticsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StatisticsPayload>
          }
          aggregate: {
            args: Prisma.StatisticsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStatistics>
          }
          groupBy: {
            args: Prisma.StatisticsGroupByArgs<ExtArgs>
            result: $Utils.Optional<StatisticsGroupByOutputType>[]
          }
          count: {
            args: Prisma.StatisticsCountArgs<ExtArgs>
            result: $Utils.Optional<StatisticsCountAggregateOutputType> | number
          }
        }
      }
      MenuStats: {
        payload: Prisma.$MenuStatsPayload<ExtArgs>
        fields: Prisma.MenuStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MenuStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MenuStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          findFirst: {
            args: Prisma.MenuStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MenuStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          findMany: {
            args: Prisma.MenuStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>[]
          }
          create: {
            args: Prisma.MenuStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          createMany: {
            args: Prisma.MenuStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MenuStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>[]
          }
          delete: {
            args: Prisma.MenuStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          update: {
            args: Prisma.MenuStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          deleteMany: {
            args: Prisma.MenuStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MenuStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MenuStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MenuStatsPayload>
          }
          aggregate: {
            args: Prisma.MenuStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMenuStats>
          }
          groupBy: {
            args: Prisma.MenuStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<MenuStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.MenuStatsCountArgs<ExtArgs>
            result: $Utils.Optional<MenuStatsCountAggregateOutputType> | number
          }
        }
      }
      WordStats: {
        payload: Prisma.$WordStatsPayload<ExtArgs>
        fields: Prisma.WordStatsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WordStatsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WordStatsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          findFirst: {
            args: Prisma.WordStatsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WordStatsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          findMany: {
            args: Prisma.WordStatsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>[]
          }
          create: {
            args: Prisma.WordStatsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          createMany: {
            args: Prisma.WordStatsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WordStatsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>[]
          }
          delete: {
            args: Prisma.WordStatsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          update: {
            args: Prisma.WordStatsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          deleteMany: {
            args: Prisma.WordStatsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WordStatsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WordStatsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WordStatsPayload>
          }
          aggregate: {
            args: Prisma.WordStatsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWordStats>
          }
          groupBy: {
            args: Prisma.WordStatsGroupByArgs<ExtArgs>
            result: $Utils.Optional<WordStatsGroupByOutputType>[]
          }
          count: {
            args: Prisma.WordStatsCountArgs<ExtArgs>
            result: $Utils.Optional<WordStatsCountAggregateOutputType> | number
          }
        }
      }
      Notice: {
        payload: Prisma.$NoticePayload<ExtArgs>
        fields: Prisma.NoticeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NoticeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NoticeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findFirst: {
            args: Prisma.NoticeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NoticeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          findMany: {
            args: Prisma.NoticeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          create: {
            args: Prisma.NoticeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          createMany: {
            args: Prisma.NoticeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NoticeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>[]
          }
          delete: {
            args: Prisma.NoticeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          update: {
            args: Prisma.NoticeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          deleteMany: {
            args: Prisma.NoticeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NoticeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NoticeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NoticePayload>
          }
          aggregate: {
            args: Prisma.NoticeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotice>
          }
          groupBy: {
            args: Prisma.NoticeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NoticeGroupByOutputType>[]
          }
          count: {
            args: Prisma.NoticeCountArgs<ExtArgs>
            result: $Utils.Optional<NoticeCountAggregateOutputType> | number
          }
        }
      }
      GameRecord: {
        payload: Prisma.$GameRecordPayload<ExtArgs>
        fields: Prisma.GameRecordFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameRecordFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameRecordFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findFirst: {
            args: Prisma.GameRecordFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameRecordFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          findMany: {
            args: Prisma.GameRecordFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          create: {
            args: Prisma.GameRecordCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          createMany: {
            args: Prisma.GameRecordCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameRecordCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>[]
          }
          delete: {
            args: Prisma.GameRecordDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          update: {
            args: Prisma.GameRecordUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          deleteMany: {
            args: Prisma.GameRecordDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameRecordUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.GameRecordUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GameRecordPayload>
          }
          aggregate: {
            args: Prisma.GameRecordAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGameRecord>
          }
          groupBy: {
            args: Prisma.GameRecordGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameRecordGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameRecordCountArgs<ExtArgs>
            result: $Utils.Optional<GameRecordCountAggregateOutputType> | number
          }
        }
      }
      Example: {
        payload: Prisma.$ExamplePayload<ExtArgs>
        fields: Prisma.ExampleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExampleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExampleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          findFirst: {
            args: Prisma.ExampleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExampleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          findMany: {
            args: Prisma.ExampleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>[]
          }
          create: {
            args: Prisma.ExampleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          createMany: {
            args: Prisma.ExampleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExampleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>[]
          }
          delete: {
            args: Prisma.ExampleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          update: {
            args: Prisma.ExampleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          deleteMany: {
            args: Prisma.ExampleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExampleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ExampleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExamplePayload>
          }
          aggregate: {
            args: Prisma.ExampleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExample>
          }
          groupBy: {
            args: Prisma.ExampleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExampleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExampleCountArgs<ExtArgs>
            result: $Utils.Optional<ExampleCountAggregateOutputType> | number
          }
        }
      }
      Suggestion: {
        payload: Prisma.$SuggestionPayload<ExtArgs>
        fields: Prisma.SuggestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SuggestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SuggestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findFirst: {
            args: Prisma.SuggestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SuggestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          findMany: {
            args: Prisma.SuggestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          create: {
            args: Prisma.SuggestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          createMany: {
            args: Prisma.SuggestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SuggestionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>[]
          }
          delete: {
            args: Prisma.SuggestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          update: {
            args: Prisma.SuggestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          deleteMany: {
            args: Prisma.SuggestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SuggestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SuggestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SuggestionPayload>
          }
          aggregate: {
            args: Prisma.SuggestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSuggestion>
          }
          groupBy: {
            args: Prisma.SuggestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SuggestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SuggestionCountArgs<ExtArgs>
            result: $Utils.Optional<SuggestionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type DictionaryCountOutputType
   */

  export type DictionaryCountOutputType = {
    examples: number
  }

  export type DictionaryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examples?: boolean | DictionaryCountOutputTypeCountExamplesArgs
  }

  // Custom InputTypes
  /**
   * DictionaryCountOutputType without action
   */
  export type DictionaryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DictionaryCountOutputType
     */
    select?: DictionaryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DictionaryCountOutputType without action
   */
  export type DictionaryCountOutputTypeCountExamplesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExampleWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Dictionary
   */

  export type AggregateDictionary = {
    _count: DictionaryCountAggregateOutputType | null
    _min: DictionaryMinAggregateOutputType | null
    _max: DictionaryMaxAggregateOutputType | null
  }

  export type DictionaryMinAggregateOutputType = {
    id: string | null
    korean: string | null
    english: string | null
    russian: string | null
    pronunciation: string | null
    definition: string | null
    definition_ru: string | null
    category: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DictionaryMaxAggregateOutputType = {
    id: string | null
    korean: string | null
    english: string | null
    russian: string | null
    pronunciation: string | null
    definition: string | null
    definition_ru: string | null
    category: string | null
    difficulty: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DictionaryCountAggregateOutputType = {
    id: number
    korean: number
    english: number
    russian: number
    pronunciation: number
    definition: number
    definition_ru: number
    category: number
    difficulty: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DictionaryMinAggregateInputType = {
    id?: true
    korean?: true
    english?: true
    russian?: true
    pronunciation?: true
    definition?: true
    definition_ru?: true
    category?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DictionaryMaxAggregateInputType = {
    id?: true
    korean?: true
    english?: true
    russian?: true
    pronunciation?: true
    definition?: true
    definition_ru?: true
    category?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DictionaryCountAggregateInputType = {
    id?: true
    korean?: true
    english?: true
    russian?: true
    pronunciation?: true
    definition?: true
    definition_ru?: true
    category?: true
    difficulty?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DictionaryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dictionary to aggregate.
     */
    where?: DictionaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dictionaries to fetch.
     */
    orderBy?: DictionaryOrderByWithRelationInput | DictionaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DictionaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dictionaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dictionaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Dictionaries
    **/
    _count?: true | DictionaryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DictionaryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DictionaryMaxAggregateInputType
  }

  export type GetDictionaryAggregateType<T extends DictionaryAggregateArgs> = {
        [P in keyof T & keyof AggregateDictionary]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDictionary[P]>
      : GetScalarType<T[P], AggregateDictionary[P]>
  }




  export type DictionaryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DictionaryWhereInput
    orderBy?: DictionaryOrderByWithAggregationInput | DictionaryOrderByWithAggregationInput[]
    by: DictionaryScalarFieldEnum[] | DictionaryScalarFieldEnum
    having?: DictionaryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DictionaryCountAggregateInputType | true
    _min?: DictionaryMinAggregateInputType
    _max?: DictionaryMaxAggregateInputType
  }

  export type DictionaryGroupByOutputType = {
    id: string
    korean: string
    english: string | null
    russian: string
    pronunciation: string
    definition: string | null
    definition_ru: string | null
    category: string
    difficulty: string
    createdAt: Date
    updatedAt: Date
    _count: DictionaryCountAggregateOutputType | null
    _min: DictionaryMinAggregateOutputType | null
    _max: DictionaryMaxAggregateOutputType | null
  }

  type GetDictionaryGroupByPayload<T extends DictionaryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DictionaryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DictionaryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DictionaryGroupByOutputType[P]>
            : GetScalarType<T[P], DictionaryGroupByOutputType[P]>
        }
      >
    >


  export type DictionarySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    korean?: boolean
    english?: boolean
    russian?: boolean
    pronunciation?: boolean
    definition?: boolean
    definition_ru?: boolean
    category?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    examples?: boolean | Dictionary$examplesArgs<ExtArgs>
    stats?: boolean | Dictionary$statsArgs<ExtArgs>
    _count?: boolean | DictionaryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["dictionary"]>

  export type DictionarySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    korean?: boolean
    english?: boolean
    russian?: boolean
    pronunciation?: boolean
    definition?: boolean
    definition_ru?: boolean
    category?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dictionary"]>

  export type DictionarySelectScalar = {
    id?: boolean
    korean?: boolean
    english?: boolean
    russian?: boolean
    pronunciation?: boolean
    definition?: boolean
    definition_ru?: boolean
    category?: boolean
    difficulty?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DictionaryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    examples?: boolean | Dictionary$examplesArgs<ExtArgs>
    stats?: boolean | Dictionary$statsArgs<ExtArgs>
    _count?: boolean | DictionaryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DictionaryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $DictionaryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Dictionary"
    objects: {
      examples: Prisma.$ExamplePayload<ExtArgs>[]
      stats: Prisma.$WordStatsPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      korean: string
      english: string | null
      russian: string
      pronunciation: string
      definition: string | null
      definition_ru: string | null
      category: string
      difficulty: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dictionary"]>
    composites: {}
  }

  type DictionaryGetPayload<S extends boolean | null | undefined | DictionaryDefaultArgs> = $Result.GetResult<Prisma.$DictionaryPayload, S>

  type DictionaryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DictionaryFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DictionaryCountAggregateInputType | true
    }

  export interface DictionaryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Dictionary'], meta: { name: 'Dictionary' } }
    /**
     * Find zero or one Dictionary that matches the filter.
     * @param {DictionaryFindUniqueArgs} args - Arguments to find a Dictionary
     * @example
     * // Get one Dictionary
     * const dictionary = await prisma.dictionary.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DictionaryFindUniqueArgs>(args: SelectSubset<T, DictionaryFindUniqueArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Dictionary that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DictionaryFindUniqueOrThrowArgs} args - Arguments to find a Dictionary
     * @example
     * // Get one Dictionary
     * const dictionary = await prisma.dictionary.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DictionaryFindUniqueOrThrowArgs>(args: SelectSubset<T, DictionaryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Dictionary that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryFindFirstArgs} args - Arguments to find a Dictionary
     * @example
     * // Get one Dictionary
     * const dictionary = await prisma.dictionary.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DictionaryFindFirstArgs>(args?: SelectSubset<T, DictionaryFindFirstArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Dictionary that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryFindFirstOrThrowArgs} args - Arguments to find a Dictionary
     * @example
     * // Get one Dictionary
     * const dictionary = await prisma.dictionary.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DictionaryFindFirstOrThrowArgs>(args?: SelectSubset<T, DictionaryFindFirstOrThrowArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Dictionaries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dictionaries
     * const dictionaries = await prisma.dictionary.findMany()
     * 
     * // Get first 10 Dictionaries
     * const dictionaries = await prisma.dictionary.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dictionaryWithIdOnly = await prisma.dictionary.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DictionaryFindManyArgs>(args?: SelectSubset<T, DictionaryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Dictionary.
     * @param {DictionaryCreateArgs} args - Arguments to create a Dictionary.
     * @example
     * // Create one Dictionary
     * const Dictionary = await prisma.dictionary.create({
     *   data: {
     *     // ... data to create a Dictionary
     *   }
     * })
     * 
     */
    create<T extends DictionaryCreateArgs>(args: SelectSubset<T, DictionaryCreateArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Dictionaries.
     * @param {DictionaryCreateManyArgs} args - Arguments to create many Dictionaries.
     * @example
     * // Create many Dictionaries
     * const dictionary = await prisma.dictionary.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DictionaryCreateManyArgs>(args?: SelectSubset<T, DictionaryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Dictionaries and returns the data saved in the database.
     * @param {DictionaryCreateManyAndReturnArgs} args - Arguments to create many Dictionaries.
     * @example
     * // Create many Dictionaries
     * const dictionary = await prisma.dictionary.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Dictionaries and only return the `id`
     * const dictionaryWithIdOnly = await prisma.dictionary.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DictionaryCreateManyAndReturnArgs>(args?: SelectSubset<T, DictionaryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Dictionary.
     * @param {DictionaryDeleteArgs} args - Arguments to delete one Dictionary.
     * @example
     * // Delete one Dictionary
     * const Dictionary = await prisma.dictionary.delete({
     *   where: {
     *     // ... filter to delete one Dictionary
     *   }
     * })
     * 
     */
    delete<T extends DictionaryDeleteArgs>(args: SelectSubset<T, DictionaryDeleteArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Dictionary.
     * @param {DictionaryUpdateArgs} args - Arguments to update one Dictionary.
     * @example
     * // Update one Dictionary
     * const dictionary = await prisma.dictionary.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DictionaryUpdateArgs>(args: SelectSubset<T, DictionaryUpdateArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Dictionaries.
     * @param {DictionaryDeleteManyArgs} args - Arguments to filter Dictionaries to delete.
     * @example
     * // Delete a few Dictionaries
     * const { count } = await prisma.dictionary.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DictionaryDeleteManyArgs>(args?: SelectSubset<T, DictionaryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dictionaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dictionaries
     * const dictionary = await prisma.dictionary.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DictionaryUpdateManyArgs>(args: SelectSubset<T, DictionaryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Dictionary.
     * @param {DictionaryUpsertArgs} args - Arguments to update or create a Dictionary.
     * @example
     * // Update or create a Dictionary
     * const dictionary = await prisma.dictionary.upsert({
     *   create: {
     *     // ... data to create a Dictionary
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dictionary we want to update
     *   }
     * })
     */
    upsert<T extends DictionaryUpsertArgs>(args: SelectSubset<T, DictionaryUpsertArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Dictionaries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryCountArgs} args - Arguments to filter Dictionaries to count.
     * @example
     * // Count the number of Dictionaries
     * const count = await prisma.dictionary.count({
     *   where: {
     *     // ... the filter for the Dictionaries we want to count
     *   }
     * })
    **/
    count<T extends DictionaryCountArgs>(
      args?: Subset<T, DictionaryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DictionaryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dictionary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DictionaryAggregateArgs>(args: Subset<T, DictionaryAggregateArgs>): Prisma.PrismaPromise<GetDictionaryAggregateType<T>>

    /**
     * Group by Dictionary.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DictionaryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DictionaryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DictionaryGroupByArgs['orderBy'] }
        : { orderBy?: DictionaryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DictionaryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDictionaryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Dictionary model
   */
  readonly fields: DictionaryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Dictionary.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DictionaryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    examples<T extends Dictionary$examplesArgs<ExtArgs> = {}>(args?: Subset<T, Dictionary$examplesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findMany"> | Null>
    stats<T extends Dictionary$statsArgs<ExtArgs> = {}>(args?: Subset<T, Dictionary$statsArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Dictionary model
   */ 
  interface DictionaryFieldRefs {
    readonly id: FieldRef<"Dictionary", 'String'>
    readonly korean: FieldRef<"Dictionary", 'String'>
    readonly english: FieldRef<"Dictionary", 'String'>
    readonly russian: FieldRef<"Dictionary", 'String'>
    readonly pronunciation: FieldRef<"Dictionary", 'String'>
    readonly definition: FieldRef<"Dictionary", 'String'>
    readonly definition_ru: FieldRef<"Dictionary", 'String'>
    readonly category: FieldRef<"Dictionary", 'String'>
    readonly difficulty: FieldRef<"Dictionary", 'String'>
    readonly createdAt: FieldRef<"Dictionary", 'DateTime'>
    readonly updatedAt: FieldRef<"Dictionary", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Dictionary findUnique
   */
  export type DictionaryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter, which Dictionary to fetch.
     */
    where: DictionaryWhereUniqueInput
  }

  /**
   * Dictionary findUniqueOrThrow
   */
  export type DictionaryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter, which Dictionary to fetch.
     */
    where: DictionaryWhereUniqueInput
  }

  /**
   * Dictionary findFirst
   */
  export type DictionaryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter, which Dictionary to fetch.
     */
    where?: DictionaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dictionaries to fetch.
     */
    orderBy?: DictionaryOrderByWithRelationInput | DictionaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dictionaries.
     */
    cursor?: DictionaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dictionaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dictionaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dictionaries.
     */
    distinct?: DictionaryScalarFieldEnum | DictionaryScalarFieldEnum[]
  }

  /**
   * Dictionary findFirstOrThrow
   */
  export type DictionaryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter, which Dictionary to fetch.
     */
    where?: DictionaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dictionaries to fetch.
     */
    orderBy?: DictionaryOrderByWithRelationInput | DictionaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Dictionaries.
     */
    cursor?: DictionaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dictionaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dictionaries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Dictionaries.
     */
    distinct?: DictionaryScalarFieldEnum | DictionaryScalarFieldEnum[]
  }

  /**
   * Dictionary findMany
   */
  export type DictionaryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter, which Dictionaries to fetch.
     */
    where?: DictionaryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Dictionaries to fetch.
     */
    orderBy?: DictionaryOrderByWithRelationInput | DictionaryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Dictionaries.
     */
    cursor?: DictionaryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Dictionaries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Dictionaries.
     */
    skip?: number
    distinct?: DictionaryScalarFieldEnum | DictionaryScalarFieldEnum[]
  }

  /**
   * Dictionary create
   */
  export type DictionaryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * The data needed to create a Dictionary.
     */
    data: XOR<DictionaryCreateInput, DictionaryUncheckedCreateInput>
  }

  /**
   * Dictionary createMany
   */
  export type DictionaryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Dictionaries.
     */
    data: DictionaryCreateManyInput | DictionaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dictionary createManyAndReturn
   */
  export type DictionaryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Dictionaries.
     */
    data: DictionaryCreateManyInput | DictionaryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Dictionary update
   */
  export type DictionaryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * The data needed to update a Dictionary.
     */
    data: XOR<DictionaryUpdateInput, DictionaryUncheckedUpdateInput>
    /**
     * Choose, which Dictionary to update.
     */
    where: DictionaryWhereUniqueInput
  }

  /**
   * Dictionary updateMany
   */
  export type DictionaryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Dictionaries.
     */
    data: XOR<DictionaryUpdateManyMutationInput, DictionaryUncheckedUpdateManyInput>
    /**
     * Filter which Dictionaries to update
     */
    where?: DictionaryWhereInput
  }

  /**
   * Dictionary upsert
   */
  export type DictionaryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * The filter to search for the Dictionary to update in case it exists.
     */
    where: DictionaryWhereUniqueInput
    /**
     * In case the Dictionary found by the `where` argument doesn't exist, create a new Dictionary with this data.
     */
    create: XOR<DictionaryCreateInput, DictionaryUncheckedCreateInput>
    /**
     * In case the Dictionary was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DictionaryUpdateInput, DictionaryUncheckedUpdateInput>
  }

  /**
   * Dictionary delete
   */
  export type DictionaryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
    /**
     * Filter which Dictionary to delete.
     */
    where: DictionaryWhereUniqueInput
  }

  /**
   * Dictionary deleteMany
   */
  export type DictionaryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Dictionaries to delete
     */
    where?: DictionaryWhereInput
  }

  /**
   * Dictionary.examples
   */
  export type Dictionary$examplesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    where?: ExampleWhereInput
    orderBy?: ExampleOrderByWithRelationInput | ExampleOrderByWithRelationInput[]
    cursor?: ExampleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ExampleScalarFieldEnum | ExampleScalarFieldEnum[]
  }

  /**
   * Dictionary.stats
   */
  export type Dictionary$statsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    where?: WordStatsWhereInput
  }

  /**
   * Dictionary without action
   */
  export type DictionaryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Dictionary
     */
    select?: DictionarySelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DictionaryInclude<ExtArgs> | null
  }


  /**
   * Model Statistics
   */

  export type AggregateStatistics = {
    _count: StatisticsCountAggregateOutputType | null
    _avg: StatisticsAvgAggregateOutputType | null
    _sum: StatisticsSumAggregateOutputType | null
    _min: StatisticsMinAggregateOutputType | null
    _max: StatisticsMaxAggregateOutputType | null
  }

  export type StatisticsAvgAggregateOutputType = {
    totalVisits: number | null
  }

  export type StatisticsSumAggregateOutputType = {
    totalVisits: number | null
  }

  export type StatisticsMinAggregateOutputType = {
    id: string | null
    totalVisits: number | null
    lastUpdated: Date | null
  }

  export type StatisticsMaxAggregateOutputType = {
    id: string | null
    totalVisits: number | null
    lastUpdated: Date | null
  }

  export type StatisticsCountAggregateOutputType = {
    id: number
    totalVisits: number
    lastUpdated: number
    _all: number
  }


  export type StatisticsAvgAggregateInputType = {
    totalVisits?: true
  }

  export type StatisticsSumAggregateInputType = {
    totalVisits?: true
  }

  export type StatisticsMinAggregateInputType = {
    id?: true
    totalVisits?: true
    lastUpdated?: true
  }

  export type StatisticsMaxAggregateInputType = {
    id?: true
    totalVisits?: true
    lastUpdated?: true
  }

  export type StatisticsCountAggregateInputType = {
    id?: true
    totalVisits?: true
    lastUpdated?: true
    _all?: true
  }

  export type StatisticsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statistics to aggregate.
     */
    where?: StatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statistics to fetch.
     */
    orderBy?: StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Statistics
    **/
    _count?: true | StatisticsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StatisticsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StatisticsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StatisticsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StatisticsMaxAggregateInputType
  }

  export type GetStatisticsAggregateType<T extends StatisticsAggregateArgs> = {
        [P in keyof T & keyof AggregateStatistics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStatistics[P]>
      : GetScalarType<T[P], AggregateStatistics[P]>
  }




  export type StatisticsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StatisticsWhereInput
    orderBy?: StatisticsOrderByWithAggregationInput | StatisticsOrderByWithAggregationInput[]
    by: StatisticsScalarFieldEnum[] | StatisticsScalarFieldEnum
    having?: StatisticsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StatisticsCountAggregateInputType | true
    _avg?: StatisticsAvgAggregateInputType
    _sum?: StatisticsSumAggregateInputType
    _min?: StatisticsMinAggregateInputType
    _max?: StatisticsMaxAggregateInputType
  }

  export type StatisticsGroupByOutputType = {
    id: string
    totalVisits: number
    lastUpdated: Date
    _count: StatisticsCountAggregateOutputType | null
    _avg: StatisticsAvgAggregateOutputType | null
    _sum: StatisticsSumAggregateOutputType | null
    _min: StatisticsMinAggregateOutputType | null
    _max: StatisticsMaxAggregateOutputType | null
  }

  type GetStatisticsGroupByPayload<T extends StatisticsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StatisticsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StatisticsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StatisticsGroupByOutputType[P]>
            : GetScalarType<T[P], StatisticsGroupByOutputType[P]>
        }
      >
    >


  export type StatisticsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalVisits?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["statistics"]>

  export type StatisticsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    totalVisits?: boolean
    lastUpdated?: boolean
  }, ExtArgs["result"]["statistics"]>

  export type StatisticsSelectScalar = {
    id?: boolean
    totalVisits?: boolean
    lastUpdated?: boolean
  }


  export type $StatisticsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Statistics"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      totalVisits: number
      lastUpdated: Date
    }, ExtArgs["result"]["statistics"]>
    composites: {}
  }

  type StatisticsGetPayload<S extends boolean | null | undefined | StatisticsDefaultArgs> = $Result.GetResult<Prisma.$StatisticsPayload, S>

  type StatisticsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<StatisticsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: StatisticsCountAggregateInputType | true
    }

  export interface StatisticsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Statistics'], meta: { name: 'Statistics' } }
    /**
     * Find zero or one Statistics that matches the filter.
     * @param {StatisticsFindUniqueArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StatisticsFindUniqueArgs>(args: SelectSubset<T, StatisticsFindUniqueArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Statistics that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {StatisticsFindUniqueOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StatisticsFindUniqueOrThrowArgs>(args: SelectSubset<T, StatisticsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StatisticsFindFirstArgs>(args?: SelectSubset<T, StatisticsFindFirstArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Statistics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindFirstOrThrowArgs} args - Arguments to find a Statistics
     * @example
     * // Get one Statistics
     * const statistics = await prisma.statistics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StatisticsFindFirstOrThrowArgs>(args?: SelectSubset<T, StatisticsFindFirstOrThrowArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Statistics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Statistics
     * const statistics = await prisma.statistics.findMany()
     * 
     * // Get first 10 Statistics
     * const statistics = await prisma.statistics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const statisticsWithIdOnly = await prisma.statistics.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StatisticsFindManyArgs>(args?: SelectSubset<T, StatisticsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Statistics.
     * @param {StatisticsCreateArgs} args - Arguments to create a Statistics.
     * @example
     * // Create one Statistics
     * const Statistics = await prisma.statistics.create({
     *   data: {
     *     // ... data to create a Statistics
     *   }
     * })
     * 
     */
    create<T extends StatisticsCreateArgs>(args: SelectSubset<T, StatisticsCreateArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Statistics.
     * @param {StatisticsCreateManyArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StatisticsCreateManyArgs>(args?: SelectSubset<T, StatisticsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Statistics and returns the data saved in the database.
     * @param {StatisticsCreateManyAndReturnArgs} args - Arguments to create many Statistics.
     * @example
     * // Create many Statistics
     * const statistics = await prisma.statistics.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Statistics and only return the `id`
     * const statisticsWithIdOnly = await prisma.statistics.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StatisticsCreateManyAndReturnArgs>(args?: SelectSubset<T, StatisticsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Statistics.
     * @param {StatisticsDeleteArgs} args - Arguments to delete one Statistics.
     * @example
     * // Delete one Statistics
     * const Statistics = await prisma.statistics.delete({
     *   where: {
     *     // ... filter to delete one Statistics
     *   }
     * })
     * 
     */
    delete<T extends StatisticsDeleteArgs>(args: SelectSubset<T, StatisticsDeleteArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Statistics.
     * @param {StatisticsUpdateArgs} args - Arguments to update one Statistics.
     * @example
     * // Update one Statistics
     * const statistics = await prisma.statistics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StatisticsUpdateArgs>(args: SelectSubset<T, StatisticsUpdateArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Statistics.
     * @param {StatisticsDeleteManyArgs} args - Arguments to filter Statistics to delete.
     * @example
     * // Delete a few Statistics
     * const { count } = await prisma.statistics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StatisticsDeleteManyArgs>(args?: SelectSubset<T, StatisticsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Statistics
     * const statistics = await prisma.statistics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StatisticsUpdateManyArgs>(args: SelectSubset<T, StatisticsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Statistics.
     * @param {StatisticsUpsertArgs} args - Arguments to update or create a Statistics.
     * @example
     * // Update or create a Statistics
     * const statistics = await prisma.statistics.upsert({
     *   create: {
     *     // ... data to create a Statistics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Statistics we want to update
     *   }
     * })
     */
    upsert<T extends StatisticsUpsertArgs>(args: SelectSubset<T, StatisticsUpsertArgs<ExtArgs>>): Prisma__StatisticsClient<$Result.GetResult<Prisma.$StatisticsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsCountArgs} args - Arguments to filter Statistics to count.
     * @example
     * // Count the number of Statistics
     * const count = await prisma.statistics.count({
     *   where: {
     *     // ... the filter for the Statistics we want to count
     *   }
     * })
    **/
    count<T extends StatisticsCountArgs>(
      args?: Subset<T, StatisticsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StatisticsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StatisticsAggregateArgs>(args: Subset<T, StatisticsAggregateArgs>): Prisma.PrismaPromise<GetStatisticsAggregateType<T>>

    /**
     * Group by Statistics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StatisticsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StatisticsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StatisticsGroupByArgs['orderBy'] }
        : { orderBy?: StatisticsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StatisticsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStatisticsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Statistics model
   */
  readonly fields: StatisticsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Statistics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StatisticsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Statistics model
   */ 
  interface StatisticsFieldRefs {
    readonly id: FieldRef<"Statistics", 'String'>
    readonly totalVisits: FieldRef<"Statistics", 'Int'>
    readonly lastUpdated: FieldRef<"Statistics", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Statistics findUnique
   */
  export type StatisticsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter, which Statistics to fetch.
     */
    where: StatisticsWhereUniqueInput
  }

  /**
   * Statistics findUniqueOrThrow
   */
  export type StatisticsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter, which Statistics to fetch.
     */
    where: StatisticsWhereUniqueInput
  }

  /**
   * Statistics findFirst
   */
  export type StatisticsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statistics to fetch.
     */
    orderBy?: StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statistics.
     */
    cursor?: StatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statistics.
     */
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[]
  }

  /**
   * Statistics findFirstOrThrow
   */
  export type StatisticsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statistics to fetch.
     */
    orderBy?: StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Statistics.
     */
    cursor?: StatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statistics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Statistics.
     */
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[]
  }

  /**
   * Statistics findMany
   */
  export type StatisticsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter, which Statistics to fetch.
     */
    where?: StatisticsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Statistics to fetch.
     */
    orderBy?: StatisticsOrderByWithRelationInput | StatisticsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Statistics.
     */
    cursor?: StatisticsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Statistics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Statistics.
     */
    skip?: number
    distinct?: StatisticsScalarFieldEnum | StatisticsScalarFieldEnum[]
  }

  /**
   * Statistics create
   */
  export type StatisticsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * The data needed to create a Statistics.
     */
    data: XOR<StatisticsCreateInput, StatisticsUncheckedCreateInput>
  }

  /**
   * Statistics createMany
   */
  export type StatisticsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Statistics.
     */
    data: StatisticsCreateManyInput | StatisticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Statistics createManyAndReturn
   */
  export type StatisticsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Statistics.
     */
    data: StatisticsCreateManyInput | StatisticsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Statistics update
   */
  export type StatisticsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * The data needed to update a Statistics.
     */
    data: XOR<StatisticsUpdateInput, StatisticsUncheckedUpdateInput>
    /**
     * Choose, which Statistics to update.
     */
    where: StatisticsWhereUniqueInput
  }

  /**
   * Statistics updateMany
   */
  export type StatisticsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Statistics.
     */
    data: XOR<StatisticsUpdateManyMutationInput, StatisticsUncheckedUpdateManyInput>
    /**
     * Filter which Statistics to update
     */
    where?: StatisticsWhereInput
  }

  /**
   * Statistics upsert
   */
  export type StatisticsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * The filter to search for the Statistics to update in case it exists.
     */
    where: StatisticsWhereUniqueInput
    /**
     * In case the Statistics found by the `where` argument doesn't exist, create a new Statistics with this data.
     */
    create: XOR<StatisticsCreateInput, StatisticsUncheckedCreateInput>
    /**
     * In case the Statistics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StatisticsUpdateInput, StatisticsUncheckedUpdateInput>
  }

  /**
   * Statistics delete
   */
  export type StatisticsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
    /**
     * Filter which Statistics to delete.
     */
    where: StatisticsWhereUniqueInput
  }

  /**
   * Statistics deleteMany
   */
  export type StatisticsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Statistics to delete
     */
    where?: StatisticsWhereInput
  }

  /**
   * Statistics without action
   */
  export type StatisticsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Statistics
     */
    select?: StatisticsSelect<ExtArgs> | null
  }


  /**
   * Model MenuStats
   */

  export type AggregateMenuStats = {
    _count: MenuStatsCountAggregateOutputType | null
    _avg: MenuStatsAvgAggregateOutputType | null
    _sum: MenuStatsSumAggregateOutputType | null
    _min: MenuStatsMinAggregateOutputType | null
    _max: MenuStatsMaxAggregateOutputType | null
  }

  export type MenuStatsAvgAggregateOutputType = {
    count: number | null
  }

  export type MenuStatsSumAggregateOutputType = {
    count: number | null
  }

  export type MenuStatsMinAggregateOutputType = {
    id: string | null
    menuId: string | null
    name: string | null
    nameRu: string | null
    count: number | null
    lastClicked: Date | null
  }

  export type MenuStatsMaxAggregateOutputType = {
    id: string | null
    menuId: string | null
    name: string | null
    nameRu: string | null
    count: number | null
    lastClicked: Date | null
  }

  export type MenuStatsCountAggregateOutputType = {
    id: number
    menuId: number
    name: number
    nameRu: number
    count: number
    lastClicked: number
    _all: number
  }


  export type MenuStatsAvgAggregateInputType = {
    count?: true
  }

  export type MenuStatsSumAggregateInputType = {
    count?: true
  }

  export type MenuStatsMinAggregateInputType = {
    id?: true
    menuId?: true
    name?: true
    nameRu?: true
    count?: true
    lastClicked?: true
  }

  export type MenuStatsMaxAggregateInputType = {
    id?: true
    menuId?: true
    name?: true
    nameRu?: true
    count?: true
    lastClicked?: true
  }

  export type MenuStatsCountAggregateInputType = {
    id?: true
    menuId?: true
    name?: true
    nameRu?: true
    count?: true
    lastClicked?: true
    _all?: true
  }

  export type MenuStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuStats to aggregate.
     */
    where?: MenuStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuStats to fetch.
     */
    orderBy?: MenuStatsOrderByWithRelationInput | MenuStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MenuStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MenuStats
    **/
    _count?: true | MenuStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MenuStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MenuStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MenuStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MenuStatsMaxAggregateInputType
  }

  export type GetMenuStatsAggregateType<T extends MenuStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateMenuStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMenuStats[P]>
      : GetScalarType<T[P], AggregateMenuStats[P]>
  }




  export type MenuStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MenuStatsWhereInput
    orderBy?: MenuStatsOrderByWithAggregationInput | MenuStatsOrderByWithAggregationInput[]
    by: MenuStatsScalarFieldEnum[] | MenuStatsScalarFieldEnum
    having?: MenuStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MenuStatsCountAggregateInputType | true
    _avg?: MenuStatsAvgAggregateInputType
    _sum?: MenuStatsSumAggregateInputType
    _min?: MenuStatsMinAggregateInputType
    _max?: MenuStatsMaxAggregateInputType
  }

  export type MenuStatsGroupByOutputType = {
    id: string
    menuId: string
    name: string
    nameRu: string
    count: number
    lastClicked: Date
    _count: MenuStatsCountAggregateOutputType | null
    _avg: MenuStatsAvgAggregateOutputType | null
    _sum: MenuStatsSumAggregateOutputType | null
    _min: MenuStatsMinAggregateOutputType | null
    _max: MenuStatsMaxAggregateOutputType | null
  }

  type GetMenuStatsGroupByPayload<T extends MenuStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MenuStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MenuStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MenuStatsGroupByOutputType[P]>
            : GetScalarType<T[P], MenuStatsGroupByOutputType[P]>
        }
      >
    >


  export type MenuStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menuId?: boolean
    name?: boolean
    nameRu?: boolean
    count?: boolean
    lastClicked?: boolean
  }, ExtArgs["result"]["menuStats"]>

  export type MenuStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    menuId?: boolean
    name?: boolean
    nameRu?: boolean
    count?: boolean
    lastClicked?: boolean
  }, ExtArgs["result"]["menuStats"]>

  export type MenuStatsSelectScalar = {
    id?: boolean
    menuId?: boolean
    name?: boolean
    nameRu?: boolean
    count?: boolean
    lastClicked?: boolean
  }


  export type $MenuStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MenuStats"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      menuId: string
      name: string
      nameRu: string
      count: number
      lastClicked: Date
    }, ExtArgs["result"]["menuStats"]>
    composites: {}
  }

  type MenuStatsGetPayload<S extends boolean | null | undefined | MenuStatsDefaultArgs> = $Result.GetResult<Prisma.$MenuStatsPayload, S>

  type MenuStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MenuStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MenuStatsCountAggregateInputType | true
    }

  export interface MenuStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MenuStats'], meta: { name: 'MenuStats' } }
    /**
     * Find zero or one MenuStats that matches the filter.
     * @param {MenuStatsFindUniqueArgs} args - Arguments to find a MenuStats
     * @example
     * // Get one MenuStats
     * const menuStats = await prisma.menuStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MenuStatsFindUniqueArgs>(args: SelectSubset<T, MenuStatsFindUniqueArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one MenuStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {MenuStatsFindUniqueOrThrowArgs} args - Arguments to find a MenuStats
     * @example
     * // Get one MenuStats
     * const menuStats = await prisma.menuStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MenuStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, MenuStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first MenuStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsFindFirstArgs} args - Arguments to find a MenuStats
     * @example
     * // Get one MenuStats
     * const menuStats = await prisma.menuStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MenuStatsFindFirstArgs>(args?: SelectSubset<T, MenuStatsFindFirstArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first MenuStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsFindFirstOrThrowArgs} args - Arguments to find a MenuStats
     * @example
     * // Get one MenuStats
     * const menuStats = await prisma.menuStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MenuStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, MenuStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more MenuStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MenuStats
     * const menuStats = await prisma.menuStats.findMany()
     * 
     * // Get first 10 MenuStats
     * const menuStats = await prisma.menuStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const menuStatsWithIdOnly = await prisma.menuStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MenuStatsFindManyArgs>(args?: SelectSubset<T, MenuStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a MenuStats.
     * @param {MenuStatsCreateArgs} args - Arguments to create a MenuStats.
     * @example
     * // Create one MenuStats
     * const MenuStats = await prisma.menuStats.create({
     *   data: {
     *     // ... data to create a MenuStats
     *   }
     * })
     * 
     */
    create<T extends MenuStatsCreateArgs>(args: SelectSubset<T, MenuStatsCreateArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many MenuStats.
     * @param {MenuStatsCreateManyArgs} args - Arguments to create many MenuStats.
     * @example
     * // Create many MenuStats
     * const menuStats = await prisma.menuStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MenuStatsCreateManyArgs>(args?: SelectSubset<T, MenuStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MenuStats and returns the data saved in the database.
     * @param {MenuStatsCreateManyAndReturnArgs} args - Arguments to create many MenuStats.
     * @example
     * // Create many MenuStats
     * const menuStats = await prisma.menuStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MenuStats and only return the `id`
     * const menuStatsWithIdOnly = await prisma.menuStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MenuStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, MenuStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a MenuStats.
     * @param {MenuStatsDeleteArgs} args - Arguments to delete one MenuStats.
     * @example
     * // Delete one MenuStats
     * const MenuStats = await prisma.menuStats.delete({
     *   where: {
     *     // ... filter to delete one MenuStats
     *   }
     * })
     * 
     */
    delete<T extends MenuStatsDeleteArgs>(args: SelectSubset<T, MenuStatsDeleteArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one MenuStats.
     * @param {MenuStatsUpdateArgs} args - Arguments to update one MenuStats.
     * @example
     * // Update one MenuStats
     * const menuStats = await prisma.menuStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MenuStatsUpdateArgs>(args: SelectSubset<T, MenuStatsUpdateArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more MenuStats.
     * @param {MenuStatsDeleteManyArgs} args - Arguments to filter MenuStats to delete.
     * @example
     * // Delete a few MenuStats
     * const { count } = await prisma.menuStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MenuStatsDeleteManyArgs>(args?: SelectSubset<T, MenuStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MenuStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MenuStats
     * const menuStats = await prisma.menuStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MenuStatsUpdateManyArgs>(args: SelectSubset<T, MenuStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MenuStats.
     * @param {MenuStatsUpsertArgs} args - Arguments to update or create a MenuStats.
     * @example
     * // Update or create a MenuStats
     * const menuStats = await prisma.menuStats.upsert({
     *   create: {
     *     // ... data to create a MenuStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MenuStats we want to update
     *   }
     * })
     */
    upsert<T extends MenuStatsUpsertArgs>(args: SelectSubset<T, MenuStatsUpsertArgs<ExtArgs>>): Prisma__MenuStatsClient<$Result.GetResult<Prisma.$MenuStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of MenuStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsCountArgs} args - Arguments to filter MenuStats to count.
     * @example
     * // Count the number of MenuStats
     * const count = await prisma.menuStats.count({
     *   where: {
     *     // ... the filter for the MenuStats we want to count
     *   }
     * })
    **/
    count<T extends MenuStatsCountArgs>(
      args?: Subset<T, MenuStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MenuStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MenuStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MenuStatsAggregateArgs>(args: Subset<T, MenuStatsAggregateArgs>): Prisma.PrismaPromise<GetMenuStatsAggregateType<T>>

    /**
     * Group by MenuStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MenuStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MenuStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MenuStatsGroupByArgs['orderBy'] }
        : { orderBy?: MenuStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MenuStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMenuStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MenuStats model
   */
  readonly fields: MenuStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MenuStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MenuStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MenuStats model
   */ 
  interface MenuStatsFieldRefs {
    readonly id: FieldRef<"MenuStats", 'String'>
    readonly menuId: FieldRef<"MenuStats", 'String'>
    readonly name: FieldRef<"MenuStats", 'String'>
    readonly nameRu: FieldRef<"MenuStats", 'String'>
    readonly count: FieldRef<"MenuStats", 'Int'>
    readonly lastClicked: FieldRef<"MenuStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MenuStats findUnique
   */
  export type MenuStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter, which MenuStats to fetch.
     */
    where: MenuStatsWhereUniqueInput
  }

  /**
   * MenuStats findUniqueOrThrow
   */
  export type MenuStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter, which MenuStats to fetch.
     */
    where: MenuStatsWhereUniqueInput
  }

  /**
   * MenuStats findFirst
   */
  export type MenuStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter, which MenuStats to fetch.
     */
    where?: MenuStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuStats to fetch.
     */
    orderBy?: MenuStatsOrderByWithRelationInput | MenuStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuStats.
     */
    cursor?: MenuStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuStats.
     */
    distinct?: MenuStatsScalarFieldEnum | MenuStatsScalarFieldEnum[]
  }

  /**
   * MenuStats findFirstOrThrow
   */
  export type MenuStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter, which MenuStats to fetch.
     */
    where?: MenuStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuStats to fetch.
     */
    orderBy?: MenuStatsOrderByWithRelationInput | MenuStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MenuStats.
     */
    cursor?: MenuStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MenuStats.
     */
    distinct?: MenuStatsScalarFieldEnum | MenuStatsScalarFieldEnum[]
  }

  /**
   * MenuStats findMany
   */
  export type MenuStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter, which MenuStats to fetch.
     */
    where?: MenuStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MenuStats to fetch.
     */
    orderBy?: MenuStatsOrderByWithRelationInput | MenuStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MenuStats.
     */
    cursor?: MenuStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MenuStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MenuStats.
     */
    skip?: number
    distinct?: MenuStatsScalarFieldEnum | MenuStatsScalarFieldEnum[]
  }

  /**
   * MenuStats create
   */
  export type MenuStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * The data needed to create a MenuStats.
     */
    data: XOR<MenuStatsCreateInput, MenuStatsUncheckedCreateInput>
  }

  /**
   * MenuStats createMany
   */
  export type MenuStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MenuStats.
     */
    data: MenuStatsCreateManyInput | MenuStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuStats createManyAndReturn
   */
  export type MenuStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many MenuStats.
     */
    data: MenuStatsCreateManyInput | MenuStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MenuStats update
   */
  export type MenuStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * The data needed to update a MenuStats.
     */
    data: XOR<MenuStatsUpdateInput, MenuStatsUncheckedUpdateInput>
    /**
     * Choose, which MenuStats to update.
     */
    where: MenuStatsWhereUniqueInput
  }

  /**
   * MenuStats updateMany
   */
  export type MenuStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MenuStats.
     */
    data: XOR<MenuStatsUpdateManyMutationInput, MenuStatsUncheckedUpdateManyInput>
    /**
     * Filter which MenuStats to update
     */
    where?: MenuStatsWhereInput
  }

  /**
   * MenuStats upsert
   */
  export type MenuStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * The filter to search for the MenuStats to update in case it exists.
     */
    where: MenuStatsWhereUniqueInput
    /**
     * In case the MenuStats found by the `where` argument doesn't exist, create a new MenuStats with this data.
     */
    create: XOR<MenuStatsCreateInput, MenuStatsUncheckedCreateInput>
    /**
     * In case the MenuStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MenuStatsUpdateInput, MenuStatsUncheckedUpdateInput>
  }

  /**
   * MenuStats delete
   */
  export type MenuStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
    /**
     * Filter which MenuStats to delete.
     */
    where: MenuStatsWhereUniqueInput
  }

  /**
   * MenuStats deleteMany
   */
  export type MenuStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MenuStats to delete
     */
    where?: MenuStatsWhereInput
  }

  /**
   * MenuStats without action
   */
  export type MenuStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MenuStats
     */
    select?: MenuStatsSelect<ExtArgs> | null
  }


  /**
   * Model WordStats
   */

  export type AggregateWordStats = {
    _count: WordStatsCountAggregateOutputType | null
    _avg: WordStatsAvgAggregateOutputType | null
    _sum: WordStatsSumAggregateOutputType | null
    _min: WordStatsMinAggregateOutputType | null
    _max: WordStatsMaxAggregateOutputType | null
  }

  export type WordStatsAvgAggregateOutputType = {
    count: number | null
  }

  export type WordStatsSumAggregateOutputType = {
    count: number | null
  }

  export type WordStatsMinAggregateOutputType = {
    id: string | null
    korean: string | null
    russian: string | null
    pronunciation: string | null
    count: number | null
    lastUsed: Date | null
  }

  export type WordStatsMaxAggregateOutputType = {
    id: string | null
    korean: string | null
    russian: string | null
    pronunciation: string | null
    count: number | null
    lastUsed: Date | null
  }

  export type WordStatsCountAggregateOutputType = {
    id: number
    korean: number
    russian: number
    pronunciation: number
    count: number
    lastUsed: number
    _all: number
  }


  export type WordStatsAvgAggregateInputType = {
    count?: true
  }

  export type WordStatsSumAggregateInputType = {
    count?: true
  }

  export type WordStatsMinAggregateInputType = {
    id?: true
    korean?: true
    russian?: true
    pronunciation?: true
    count?: true
    lastUsed?: true
  }

  export type WordStatsMaxAggregateInputType = {
    id?: true
    korean?: true
    russian?: true
    pronunciation?: true
    count?: true
    lastUsed?: true
  }

  export type WordStatsCountAggregateInputType = {
    id?: true
    korean?: true
    russian?: true
    pronunciation?: true
    count?: true
    lastUsed?: true
    _all?: true
  }

  export type WordStatsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordStats to aggregate.
     */
    where?: WordStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordStats to fetch.
     */
    orderBy?: WordStatsOrderByWithRelationInput | WordStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WordStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WordStats
    **/
    _count?: true | WordStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WordStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WordStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WordStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WordStatsMaxAggregateInputType
  }

  export type GetWordStatsAggregateType<T extends WordStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateWordStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWordStats[P]>
      : GetScalarType<T[P], AggregateWordStats[P]>
  }




  export type WordStatsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WordStatsWhereInput
    orderBy?: WordStatsOrderByWithAggregationInput | WordStatsOrderByWithAggregationInput[]
    by: WordStatsScalarFieldEnum[] | WordStatsScalarFieldEnum
    having?: WordStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WordStatsCountAggregateInputType | true
    _avg?: WordStatsAvgAggregateInputType
    _sum?: WordStatsSumAggregateInputType
    _min?: WordStatsMinAggregateInputType
    _max?: WordStatsMaxAggregateInputType
  }

  export type WordStatsGroupByOutputType = {
    id: string
    korean: string
    russian: string
    pronunciation: string
    count: number
    lastUsed: Date
    _count: WordStatsCountAggregateOutputType | null
    _avg: WordStatsAvgAggregateOutputType | null
    _sum: WordStatsSumAggregateOutputType | null
    _min: WordStatsMinAggregateOutputType | null
    _max: WordStatsMaxAggregateOutputType | null
  }

  type GetWordStatsGroupByPayload<T extends WordStatsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WordStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WordStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WordStatsGroupByOutputType[P]>
            : GetScalarType<T[P], WordStatsGroupByOutputType[P]>
        }
      >
    >


  export type WordStatsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    korean?: boolean
    russian?: boolean
    pronunciation?: boolean
    count?: boolean
    lastUsed?: boolean
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordStats"]>

  export type WordStatsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    korean?: boolean
    russian?: boolean
    pronunciation?: boolean
    count?: boolean
    lastUsed?: boolean
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["wordStats"]>

  export type WordStatsSelectScalar = {
    id?: boolean
    korean?: boolean
    russian?: boolean
    pronunciation?: boolean
    count?: boolean
    lastUsed?: boolean
  }

  export type WordStatsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }
  export type WordStatsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }

  export type $WordStatsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WordStats"
    objects: {
      dictionary: Prisma.$DictionaryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      korean: string
      russian: string
      pronunciation: string
      count: number
      lastUsed: Date
    }, ExtArgs["result"]["wordStats"]>
    composites: {}
  }

  type WordStatsGetPayload<S extends boolean | null | undefined | WordStatsDefaultArgs> = $Result.GetResult<Prisma.$WordStatsPayload, S>

  type WordStatsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WordStatsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WordStatsCountAggregateInputType | true
    }

  export interface WordStatsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WordStats'], meta: { name: 'WordStats' } }
    /**
     * Find zero or one WordStats that matches the filter.
     * @param {WordStatsFindUniqueArgs} args - Arguments to find a WordStats
     * @example
     * // Get one WordStats
     * const wordStats = await prisma.wordStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WordStatsFindUniqueArgs>(args: SelectSubset<T, WordStatsFindUniqueArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WordStats that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WordStatsFindUniqueOrThrowArgs} args - Arguments to find a WordStats
     * @example
     * // Get one WordStats
     * const wordStats = await prisma.wordStats.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WordStatsFindUniqueOrThrowArgs>(args: SelectSubset<T, WordStatsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WordStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsFindFirstArgs} args - Arguments to find a WordStats
     * @example
     * // Get one WordStats
     * const wordStats = await prisma.wordStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WordStatsFindFirstArgs>(args?: SelectSubset<T, WordStatsFindFirstArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WordStats that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsFindFirstOrThrowArgs} args - Arguments to find a WordStats
     * @example
     * // Get one WordStats
     * const wordStats = await prisma.wordStats.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WordStatsFindFirstOrThrowArgs>(args?: SelectSubset<T, WordStatsFindFirstOrThrowArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WordStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WordStats
     * const wordStats = await prisma.wordStats.findMany()
     * 
     * // Get first 10 WordStats
     * const wordStats = await prisma.wordStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const wordStatsWithIdOnly = await prisma.wordStats.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WordStatsFindManyArgs>(args?: SelectSubset<T, WordStatsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WordStats.
     * @param {WordStatsCreateArgs} args - Arguments to create a WordStats.
     * @example
     * // Create one WordStats
     * const WordStats = await prisma.wordStats.create({
     *   data: {
     *     // ... data to create a WordStats
     *   }
     * })
     * 
     */
    create<T extends WordStatsCreateArgs>(args: SelectSubset<T, WordStatsCreateArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WordStats.
     * @param {WordStatsCreateManyArgs} args - Arguments to create many WordStats.
     * @example
     * // Create many WordStats
     * const wordStats = await prisma.wordStats.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WordStatsCreateManyArgs>(args?: SelectSubset<T, WordStatsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WordStats and returns the data saved in the database.
     * @param {WordStatsCreateManyAndReturnArgs} args - Arguments to create many WordStats.
     * @example
     * // Create many WordStats
     * const wordStats = await prisma.wordStats.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WordStats and only return the `id`
     * const wordStatsWithIdOnly = await prisma.wordStats.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WordStatsCreateManyAndReturnArgs>(args?: SelectSubset<T, WordStatsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WordStats.
     * @param {WordStatsDeleteArgs} args - Arguments to delete one WordStats.
     * @example
     * // Delete one WordStats
     * const WordStats = await prisma.wordStats.delete({
     *   where: {
     *     // ... filter to delete one WordStats
     *   }
     * })
     * 
     */
    delete<T extends WordStatsDeleteArgs>(args: SelectSubset<T, WordStatsDeleteArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WordStats.
     * @param {WordStatsUpdateArgs} args - Arguments to update one WordStats.
     * @example
     * // Update one WordStats
     * const wordStats = await prisma.wordStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WordStatsUpdateArgs>(args: SelectSubset<T, WordStatsUpdateArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WordStats.
     * @param {WordStatsDeleteManyArgs} args - Arguments to filter WordStats to delete.
     * @example
     * // Delete a few WordStats
     * const { count } = await prisma.wordStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WordStatsDeleteManyArgs>(args?: SelectSubset<T, WordStatsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WordStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WordStats
     * const wordStats = await prisma.wordStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WordStatsUpdateManyArgs>(args: SelectSubset<T, WordStatsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WordStats.
     * @param {WordStatsUpsertArgs} args - Arguments to update or create a WordStats.
     * @example
     * // Update or create a WordStats
     * const wordStats = await prisma.wordStats.upsert({
     *   create: {
     *     // ... data to create a WordStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WordStats we want to update
     *   }
     * })
     */
    upsert<T extends WordStatsUpsertArgs>(args: SelectSubset<T, WordStatsUpsertArgs<ExtArgs>>): Prisma__WordStatsClient<$Result.GetResult<Prisma.$WordStatsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WordStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsCountArgs} args - Arguments to filter WordStats to count.
     * @example
     * // Count the number of WordStats
     * const count = await prisma.wordStats.count({
     *   where: {
     *     // ... the filter for the WordStats we want to count
     *   }
     * })
    **/
    count<T extends WordStatsCountArgs>(
      args?: Subset<T, WordStatsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WordStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WordStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WordStatsAggregateArgs>(args: Subset<T, WordStatsAggregateArgs>): Prisma.PrismaPromise<GetWordStatsAggregateType<T>>

    /**
     * Group by WordStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WordStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WordStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WordStatsGroupByArgs['orderBy'] }
        : { orderBy?: WordStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WordStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWordStatsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WordStats model
   */
  readonly fields: WordStatsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WordStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WordStatsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dictionary<T extends DictionaryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DictionaryDefaultArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WordStats model
   */ 
  interface WordStatsFieldRefs {
    readonly id: FieldRef<"WordStats", 'String'>
    readonly korean: FieldRef<"WordStats", 'String'>
    readonly russian: FieldRef<"WordStats", 'String'>
    readonly pronunciation: FieldRef<"WordStats", 'String'>
    readonly count: FieldRef<"WordStats", 'Int'>
    readonly lastUsed: FieldRef<"WordStats", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WordStats findUnique
   */
  export type WordStatsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter, which WordStats to fetch.
     */
    where: WordStatsWhereUniqueInput
  }

  /**
   * WordStats findUniqueOrThrow
   */
  export type WordStatsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter, which WordStats to fetch.
     */
    where: WordStatsWhereUniqueInput
  }

  /**
   * WordStats findFirst
   */
  export type WordStatsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter, which WordStats to fetch.
     */
    where?: WordStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordStats to fetch.
     */
    orderBy?: WordStatsOrderByWithRelationInput | WordStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordStats.
     */
    cursor?: WordStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordStats.
     */
    distinct?: WordStatsScalarFieldEnum | WordStatsScalarFieldEnum[]
  }

  /**
   * WordStats findFirstOrThrow
   */
  export type WordStatsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter, which WordStats to fetch.
     */
    where?: WordStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordStats to fetch.
     */
    orderBy?: WordStatsOrderByWithRelationInput | WordStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WordStats.
     */
    cursor?: WordStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordStats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WordStats.
     */
    distinct?: WordStatsScalarFieldEnum | WordStatsScalarFieldEnum[]
  }

  /**
   * WordStats findMany
   */
  export type WordStatsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter, which WordStats to fetch.
     */
    where?: WordStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WordStats to fetch.
     */
    orderBy?: WordStatsOrderByWithRelationInput | WordStatsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WordStats.
     */
    cursor?: WordStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WordStats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WordStats.
     */
    skip?: number
    distinct?: WordStatsScalarFieldEnum | WordStatsScalarFieldEnum[]
  }

  /**
   * WordStats create
   */
  export type WordStatsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * The data needed to create a WordStats.
     */
    data: XOR<WordStatsCreateInput, WordStatsUncheckedCreateInput>
  }

  /**
   * WordStats createMany
   */
  export type WordStatsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WordStats.
     */
    data: WordStatsCreateManyInput | WordStatsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WordStats createManyAndReturn
   */
  export type WordStatsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WordStats.
     */
    data: WordStatsCreateManyInput | WordStatsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WordStats update
   */
  export type WordStatsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * The data needed to update a WordStats.
     */
    data: XOR<WordStatsUpdateInput, WordStatsUncheckedUpdateInput>
    /**
     * Choose, which WordStats to update.
     */
    where: WordStatsWhereUniqueInput
  }

  /**
   * WordStats updateMany
   */
  export type WordStatsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WordStats.
     */
    data: XOR<WordStatsUpdateManyMutationInput, WordStatsUncheckedUpdateManyInput>
    /**
     * Filter which WordStats to update
     */
    where?: WordStatsWhereInput
  }

  /**
   * WordStats upsert
   */
  export type WordStatsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * The filter to search for the WordStats to update in case it exists.
     */
    where: WordStatsWhereUniqueInput
    /**
     * In case the WordStats found by the `where` argument doesn't exist, create a new WordStats with this data.
     */
    create: XOR<WordStatsCreateInput, WordStatsUncheckedCreateInput>
    /**
     * In case the WordStats was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WordStatsUpdateInput, WordStatsUncheckedUpdateInput>
  }

  /**
   * WordStats delete
   */
  export type WordStatsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
    /**
     * Filter which WordStats to delete.
     */
    where: WordStatsWhereUniqueInput
  }

  /**
   * WordStats deleteMany
   */
  export type WordStatsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WordStats to delete
     */
    where?: WordStatsWhereInput
  }

  /**
   * WordStats without action
   */
  export type WordStatsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WordStats
     */
    select?: WordStatsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WordStatsInclude<ExtArgs> | null
  }


  /**
   * Model Notice
   */

  export type AggregateNotice = {
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  export type NoticeMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoticeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NoticeCountAggregateOutputType = {
    id: number
    title: number
    content: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NoticeMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoticeMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NoticeCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NoticeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notice to aggregate.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Notices
    **/
    _count?: true | NoticeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NoticeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NoticeMaxAggregateInputType
  }

  export type GetNoticeAggregateType<T extends NoticeAggregateArgs> = {
        [P in keyof T & keyof AggregateNotice]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotice[P]>
      : GetScalarType<T[P], AggregateNotice[P]>
  }




  export type NoticeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NoticeWhereInput
    orderBy?: NoticeOrderByWithAggregationInput | NoticeOrderByWithAggregationInput[]
    by: NoticeScalarFieldEnum[] | NoticeScalarFieldEnum
    having?: NoticeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NoticeCountAggregateInputType | true
    _min?: NoticeMinAggregateInputType
    _max?: NoticeMaxAggregateInputType
  }

  export type NoticeGroupByOutputType = {
    id: string
    title: string
    content: string
    createdAt: Date
    updatedAt: Date
    _count: NoticeCountAggregateOutputType | null
    _min: NoticeMinAggregateOutputType | null
    _max: NoticeMaxAggregateOutputType | null
  }

  type GetNoticeGroupByPayload<T extends NoticeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NoticeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NoticeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NoticeGroupByOutputType[P]>
            : GetScalarType<T[P], NoticeGroupByOutputType[P]>
        }
      >
    >


  export type NoticeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["notice"]>

  export type NoticeSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $NoticePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Notice"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["notice"]>
    composites: {}
  }

  type NoticeGetPayload<S extends boolean | null | undefined | NoticeDefaultArgs> = $Result.GetResult<Prisma.$NoticePayload, S>

  type NoticeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NoticeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NoticeCountAggregateInputType | true
    }

  export interface NoticeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Notice'], meta: { name: 'Notice' } }
    /**
     * Find zero or one Notice that matches the filter.
     * @param {NoticeFindUniqueArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NoticeFindUniqueArgs>(args: SelectSubset<T, NoticeFindUniqueArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Notice that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NoticeFindUniqueOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NoticeFindUniqueOrThrowArgs>(args: SelectSubset<T, NoticeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Notice that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NoticeFindFirstArgs>(args?: SelectSubset<T, NoticeFindFirstArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Notice that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindFirstOrThrowArgs} args - Arguments to find a Notice
     * @example
     * // Get one Notice
     * const notice = await prisma.notice.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NoticeFindFirstOrThrowArgs>(args?: SelectSubset<T, NoticeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Notices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notices
     * const notices = await prisma.notice.findMany()
     * 
     * // Get first 10 Notices
     * const notices = await prisma.notice.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const noticeWithIdOnly = await prisma.notice.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NoticeFindManyArgs>(args?: SelectSubset<T, NoticeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Notice.
     * @param {NoticeCreateArgs} args - Arguments to create a Notice.
     * @example
     * // Create one Notice
     * const Notice = await prisma.notice.create({
     *   data: {
     *     // ... data to create a Notice
     *   }
     * })
     * 
     */
    create<T extends NoticeCreateArgs>(args: SelectSubset<T, NoticeCreateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Notices.
     * @param {NoticeCreateManyArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NoticeCreateManyArgs>(args?: SelectSubset<T, NoticeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Notices and returns the data saved in the database.
     * @param {NoticeCreateManyAndReturnArgs} args - Arguments to create many Notices.
     * @example
     * // Create many Notices
     * const notice = await prisma.notice.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Notices and only return the `id`
     * const noticeWithIdOnly = await prisma.notice.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NoticeCreateManyAndReturnArgs>(args?: SelectSubset<T, NoticeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Notice.
     * @param {NoticeDeleteArgs} args - Arguments to delete one Notice.
     * @example
     * // Delete one Notice
     * const Notice = await prisma.notice.delete({
     *   where: {
     *     // ... filter to delete one Notice
     *   }
     * })
     * 
     */
    delete<T extends NoticeDeleteArgs>(args: SelectSubset<T, NoticeDeleteArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Notice.
     * @param {NoticeUpdateArgs} args - Arguments to update one Notice.
     * @example
     * // Update one Notice
     * const notice = await prisma.notice.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NoticeUpdateArgs>(args: SelectSubset<T, NoticeUpdateArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Notices.
     * @param {NoticeDeleteManyArgs} args - Arguments to filter Notices to delete.
     * @example
     * // Delete a few Notices
     * const { count } = await prisma.notice.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NoticeDeleteManyArgs>(args?: SelectSubset<T, NoticeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notices
     * const notice = await prisma.notice.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NoticeUpdateManyArgs>(args: SelectSubset<T, NoticeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notice.
     * @param {NoticeUpsertArgs} args - Arguments to update or create a Notice.
     * @example
     * // Update or create a Notice
     * const notice = await prisma.notice.upsert({
     *   create: {
     *     // ... data to create a Notice
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notice we want to update
     *   }
     * })
     */
    upsert<T extends NoticeUpsertArgs>(args: SelectSubset<T, NoticeUpsertArgs<ExtArgs>>): Prisma__NoticeClient<$Result.GetResult<Prisma.$NoticePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Notices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeCountArgs} args - Arguments to filter Notices to count.
     * @example
     * // Count the number of Notices
     * const count = await prisma.notice.count({
     *   where: {
     *     // ... the filter for the Notices we want to count
     *   }
     * })
    **/
    count<T extends NoticeCountArgs>(
      args?: Subset<T, NoticeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NoticeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NoticeAggregateArgs>(args: Subset<T, NoticeAggregateArgs>): Prisma.PrismaPromise<GetNoticeAggregateType<T>>

    /**
     * Group by Notice.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NoticeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NoticeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NoticeGroupByArgs['orderBy'] }
        : { orderBy?: NoticeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NoticeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNoticeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Notice model
   */
  readonly fields: NoticeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Notice.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NoticeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Notice model
   */ 
  interface NoticeFieldRefs {
    readonly id: FieldRef<"Notice", 'String'>
    readonly title: FieldRef<"Notice", 'String'>
    readonly content: FieldRef<"Notice", 'String'>
    readonly createdAt: FieldRef<"Notice", 'DateTime'>
    readonly updatedAt: FieldRef<"Notice", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Notice findUnique
   */
  export type NoticeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findUniqueOrThrow
   */
  export type NoticeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice findFirst
   */
  export type NoticeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findFirstOrThrow
   */
  export type NoticeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notice to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Notices.
     */
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice findMany
   */
  export type NoticeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter, which Notices to fetch.
     */
    where?: NoticeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Notices to fetch.
     */
    orderBy?: NoticeOrderByWithRelationInput | NoticeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Notices.
     */
    cursor?: NoticeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Notices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Notices.
     */
    skip?: number
    distinct?: NoticeScalarFieldEnum | NoticeScalarFieldEnum[]
  }

  /**
   * Notice create
   */
  export type NoticeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The data needed to create a Notice.
     */
    data: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
  }

  /**
   * Notice createMany
   */
  export type NoticeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notice createManyAndReturn
   */
  export type NoticeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Notices.
     */
    data: NoticeCreateManyInput | NoticeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Notice update
   */
  export type NoticeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The data needed to update a Notice.
     */
    data: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
    /**
     * Choose, which Notice to update.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice updateMany
   */
  export type NoticeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Notices.
     */
    data: XOR<NoticeUpdateManyMutationInput, NoticeUncheckedUpdateManyInput>
    /**
     * Filter which Notices to update
     */
    where?: NoticeWhereInput
  }

  /**
   * Notice upsert
   */
  export type NoticeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * The filter to search for the Notice to update in case it exists.
     */
    where: NoticeWhereUniqueInput
    /**
     * In case the Notice found by the `where` argument doesn't exist, create a new Notice with this data.
     */
    create: XOR<NoticeCreateInput, NoticeUncheckedCreateInput>
    /**
     * In case the Notice was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NoticeUpdateInput, NoticeUncheckedUpdateInput>
  }

  /**
   * Notice delete
   */
  export type NoticeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
    /**
     * Filter which Notice to delete.
     */
    where: NoticeWhereUniqueInput
  }

  /**
   * Notice deleteMany
   */
  export type NoticeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Notices to delete
     */
    where?: NoticeWhereInput
  }

  /**
   * Notice without action
   */
  export type NoticeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Notice
     */
    select?: NoticeSelect<ExtArgs> | null
  }


  /**
   * Model GameRecord
   */

  export type AggregateGameRecord = {
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  export type GameRecordAvgAggregateOutputType = {
    score: number | null
    level: number | null
    duration: number | null
  }

  export type GameRecordSumAggregateOutputType = {
    score: number | null
    level: number | null
    duration: number | null
  }

  export type GameRecordMinAggregateOutputType = {
    id: string | null
    score: number | null
    level: number | null
    duration: number | null
    createdAt: Date | null
  }

  export type GameRecordMaxAggregateOutputType = {
    id: string | null
    score: number | null
    level: number | null
    duration: number | null
    createdAt: Date | null
  }

  export type GameRecordCountAggregateOutputType = {
    id: number
    score: number
    level: number
    duration: number
    createdAt: number
    _all: number
  }


  export type GameRecordAvgAggregateInputType = {
    score?: true
    level?: true
    duration?: true
  }

  export type GameRecordSumAggregateInputType = {
    score?: true
    level?: true
    duration?: true
  }

  export type GameRecordMinAggregateInputType = {
    id?: true
    score?: true
    level?: true
    duration?: true
    createdAt?: true
  }

  export type GameRecordMaxAggregateInputType = {
    id?: true
    score?: true
    level?: true
    duration?: true
    createdAt?: true
  }

  export type GameRecordCountAggregateInputType = {
    id?: true
    score?: true
    level?: true
    duration?: true
    createdAt?: true
    _all?: true
  }

  export type GameRecordAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecord to aggregate.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned GameRecords
    **/
    _count?: true | GameRecordCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameRecordAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameRecordSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameRecordMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameRecordMaxAggregateInputType
  }

  export type GetGameRecordAggregateType<T extends GameRecordAggregateArgs> = {
        [P in keyof T & keyof AggregateGameRecord]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGameRecord[P]>
      : GetScalarType<T[P], AggregateGameRecord[P]>
  }




  export type GameRecordGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameRecordWhereInput
    orderBy?: GameRecordOrderByWithAggregationInput | GameRecordOrderByWithAggregationInput[]
    by: GameRecordScalarFieldEnum[] | GameRecordScalarFieldEnum
    having?: GameRecordScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameRecordCountAggregateInputType | true
    _avg?: GameRecordAvgAggregateInputType
    _sum?: GameRecordSumAggregateInputType
    _min?: GameRecordMinAggregateInputType
    _max?: GameRecordMaxAggregateInputType
  }

  export type GameRecordGroupByOutputType = {
    id: string
    score: number
    level: number
    duration: number
    createdAt: Date
    _count: GameRecordCountAggregateOutputType | null
    _avg: GameRecordAvgAggregateOutputType | null
    _sum: GameRecordSumAggregateOutputType | null
    _min: GameRecordMinAggregateOutputType | null
    _max: GameRecordMaxAggregateOutputType | null
  }

  type GetGameRecordGroupByPayload<T extends GameRecordGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameRecordGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameRecordGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
            : GetScalarType<T[P], GameRecordGroupByOutputType[P]>
        }
      >
    >


  export type GameRecordSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    level?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    score?: boolean
    level?: boolean
    duration?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["gameRecord"]>

  export type GameRecordSelectScalar = {
    id?: boolean
    score?: boolean
    level?: boolean
    duration?: boolean
    createdAt?: boolean
  }


  export type $GameRecordPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "GameRecord"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      score: number
      level: number
      duration: number
      createdAt: Date
    }, ExtArgs["result"]["gameRecord"]>
    composites: {}
  }

  type GameRecordGetPayload<S extends boolean | null | undefined | GameRecordDefaultArgs> = $Result.GetResult<Prisma.$GameRecordPayload, S>

  type GameRecordCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<GameRecordFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: GameRecordCountAggregateInputType | true
    }

  export interface GameRecordDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['GameRecord'], meta: { name: 'GameRecord' } }
    /**
     * Find zero or one GameRecord that matches the filter.
     * @param {GameRecordFindUniqueArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameRecordFindUniqueArgs>(args: SelectSubset<T, GameRecordFindUniqueArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one GameRecord that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {GameRecordFindUniqueOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameRecordFindUniqueOrThrowArgs>(args: SelectSubset<T, GameRecordFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first GameRecord that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameRecordFindFirstArgs>(args?: SelectSubset<T, GameRecordFindFirstArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first GameRecord that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindFirstOrThrowArgs} args - Arguments to find a GameRecord
     * @example
     * // Get one GameRecord
     * const gameRecord = await prisma.gameRecord.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameRecordFindFirstOrThrowArgs>(args?: SelectSubset<T, GameRecordFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more GameRecords that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all GameRecords
     * const gameRecords = await prisma.gameRecord.findMany()
     * 
     * // Get first 10 GameRecords
     * const gameRecords = await prisma.gameRecord.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameRecordWithIdOnly = await prisma.gameRecord.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameRecordFindManyArgs>(args?: SelectSubset<T, GameRecordFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a GameRecord.
     * @param {GameRecordCreateArgs} args - Arguments to create a GameRecord.
     * @example
     * // Create one GameRecord
     * const GameRecord = await prisma.gameRecord.create({
     *   data: {
     *     // ... data to create a GameRecord
     *   }
     * })
     * 
     */
    create<T extends GameRecordCreateArgs>(args: SelectSubset<T, GameRecordCreateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many GameRecords.
     * @param {GameRecordCreateManyArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameRecordCreateManyArgs>(args?: SelectSubset<T, GameRecordCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many GameRecords and returns the data saved in the database.
     * @param {GameRecordCreateManyAndReturnArgs} args - Arguments to create many GameRecords.
     * @example
     * // Create many GameRecords
     * const gameRecord = await prisma.gameRecord.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many GameRecords and only return the `id`
     * const gameRecordWithIdOnly = await prisma.gameRecord.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameRecordCreateManyAndReturnArgs>(args?: SelectSubset<T, GameRecordCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a GameRecord.
     * @param {GameRecordDeleteArgs} args - Arguments to delete one GameRecord.
     * @example
     * // Delete one GameRecord
     * const GameRecord = await prisma.gameRecord.delete({
     *   where: {
     *     // ... filter to delete one GameRecord
     *   }
     * })
     * 
     */
    delete<T extends GameRecordDeleteArgs>(args: SelectSubset<T, GameRecordDeleteArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one GameRecord.
     * @param {GameRecordUpdateArgs} args - Arguments to update one GameRecord.
     * @example
     * // Update one GameRecord
     * const gameRecord = await prisma.gameRecord.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameRecordUpdateArgs>(args: SelectSubset<T, GameRecordUpdateArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more GameRecords.
     * @param {GameRecordDeleteManyArgs} args - Arguments to filter GameRecords to delete.
     * @example
     * // Delete a few GameRecords
     * const { count } = await prisma.gameRecord.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameRecordDeleteManyArgs>(args?: SelectSubset<T, GameRecordDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many GameRecords
     * const gameRecord = await prisma.gameRecord.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameRecordUpdateManyArgs>(args: SelectSubset<T, GameRecordUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one GameRecord.
     * @param {GameRecordUpsertArgs} args - Arguments to update or create a GameRecord.
     * @example
     * // Update or create a GameRecord
     * const gameRecord = await prisma.gameRecord.upsert({
     *   create: {
     *     // ... data to create a GameRecord
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the GameRecord we want to update
     *   }
     * })
     */
    upsert<T extends GameRecordUpsertArgs>(args: SelectSubset<T, GameRecordUpsertArgs<ExtArgs>>): Prisma__GameRecordClient<$Result.GetResult<Prisma.$GameRecordPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of GameRecords.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordCountArgs} args - Arguments to filter GameRecords to count.
     * @example
     * // Count the number of GameRecords
     * const count = await prisma.gameRecord.count({
     *   where: {
     *     // ... the filter for the GameRecords we want to count
     *   }
     * })
    **/
    count<T extends GameRecordCountArgs>(
      args?: Subset<T, GameRecordCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameRecordCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameRecordAggregateArgs>(args: Subset<T, GameRecordAggregateArgs>): Prisma.PrismaPromise<GetGameRecordAggregateType<T>>

    /**
     * Group by GameRecord.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameRecordGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameRecordGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameRecordGroupByArgs['orderBy'] }
        : { orderBy?: GameRecordGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameRecordGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameRecordGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the GameRecord model
   */
  readonly fields: GameRecordFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for GameRecord.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameRecordClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the GameRecord model
   */ 
  interface GameRecordFieldRefs {
    readonly id: FieldRef<"GameRecord", 'String'>
    readonly score: FieldRef<"GameRecord", 'Int'>
    readonly level: FieldRef<"GameRecord", 'Int'>
    readonly duration: FieldRef<"GameRecord", 'Int'>
    readonly createdAt: FieldRef<"GameRecord", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * GameRecord findUnique
   */
  export type GameRecordFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findUniqueOrThrow
   */
  export type GameRecordFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord findFirst
   */
  export type GameRecordFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findFirstOrThrow
   */
  export type GameRecordFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter, which GameRecord to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of GameRecords.
     */
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord findMany
   */
  export type GameRecordFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter, which GameRecords to fetch.
     */
    where?: GameRecordWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of GameRecords to fetch.
     */
    orderBy?: GameRecordOrderByWithRelationInput | GameRecordOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing GameRecords.
     */
    cursor?: GameRecordWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` GameRecords from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` GameRecords.
     */
    skip?: number
    distinct?: GameRecordScalarFieldEnum | GameRecordScalarFieldEnum[]
  }

  /**
   * GameRecord create
   */
  export type GameRecordCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * The data needed to create a GameRecord.
     */
    data: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
  }

  /**
   * GameRecord createMany
   */
  export type GameRecordCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRecord createManyAndReturn
   */
  export type GameRecordCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many GameRecords.
     */
    data: GameRecordCreateManyInput | GameRecordCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * GameRecord update
   */
  export type GameRecordUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * The data needed to update a GameRecord.
     */
    data: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
    /**
     * Choose, which GameRecord to update.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord updateMany
   */
  export type GameRecordUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update GameRecords.
     */
    data: XOR<GameRecordUpdateManyMutationInput, GameRecordUncheckedUpdateManyInput>
    /**
     * Filter which GameRecords to update
     */
    where?: GameRecordWhereInput
  }

  /**
   * GameRecord upsert
   */
  export type GameRecordUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * The filter to search for the GameRecord to update in case it exists.
     */
    where: GameRecordWhereUniqueInput
    /**
     * In case the GameRecord found by the `where` argument doesn't exist, create a new GameRecord with this data.
     */
    create: XOR<GameRecordCreateInput, GameRecordUncheckedCreateInput>
    /**
     * In case the GameRecord was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameRecordUpdateInput, GameRecordUncheckedUpdateInput>
  }

  /**
   * GameRecord delete
   */
  export type GameRecordDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
    /**
     * Filter which GameRecord to delete.
     */
    where: GameRecordWhereUniqueInput
  }

  /**
   * GameRecord deleteMany
   */
  export type GameRecordDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which GameRecords to delete
     */
    where?: GameRecordWhereInput
  }

  /**
   * GameRecord without action
   */
  export type GameRecordDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameRecord
     */
    select?: GameRecordSelect<ExtArgs> | null
  }


  /**
   * Model Example
   */

  export type AggregateExample = {
    _count: ExampleCountAggregateOutputType | null
    _avg: ExampleAvgAggregateOutputType | null
    _sum: ExampleSumAggregateOutputType | null
    _min: ExampleMinAggregateOutputType | null
    _max: ExampleMaxAggregateOutputType | null
  }

  export type ExampleAvgAggregateOutputType = {
    id: number | null
  }

  export type ExampleSumAggregateOutputType = {
    id: number | null
  }

  export type ExampleMinAggregateOutputType = {
    id: number | null
    text: string | null
    dictionaryId: string | null
  }

  export type ExampleMaxAggregateOutputType = {
    id: number | null
    text: string | null
    dictionaryId: string | null
  }

  export type ExampleCountAggregateOutputType = {
    id: number
    text: number
    dictionaryId: number
    _all: number
  }


  export type ExampleAvgAggregateInputType = {
    id?: true
  }

  export type ExampleSumAggregateInputType = {
    id?: true
  }

  export type ExampleMinAggregateInputType = {
    id?: true
    text?: true
    dictionaryId?: true
  }

  export type ExampleMaxAggregateInputType = {
    id?: true
    text?: true
    dictionaryId?: true
  }

  export type ExampleCountAggregateInputType = {
    id?: true
    text?: true
    dictionaryId?: true
    _all?: true
  }

  export type ExampleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Example to aggregate.
     */
    where?: ExampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examples to fetch.
     */
    orderBy?: ExampleOrderByWithRelationInput | ExampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Examples
    **/
    _count?: true | ExampleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ExampleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ExampleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExampleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExampleMaxAggregateInputType
  }

  export type GetExampleAggregateType<T extends ExampleAggregateArgs> = {
        [P in keyof T & keyof AggregateExample]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExample[P]>
      : GetScalarType<T[P], AggregateExample[P]>
  }




  export type ExampleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExampleWhereInput
    orderBy?: ExampleOrderByWithAggregationInput | ExampleOrderByWithAggregationInput[]
    by: ExampleScalarFieldEnum[] | ExampleScalarFieldEnum
    having?: ExampleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExampleCountAggregateInputType | true
    _avg?: ExampleAvgAggregateInputType
    _sum?: ExampleSumAggregateInputType
    _min?: ExampleMinAggregateInputType
    _max?: ExampleMaxAggregateInputType
  }

  export type ExampleGroupByOutputType = {
    id: number
    text: string
    dictionaryId: string
    _count: ExampleCountAggregateOutputType | null
    _avg: ExampleAvgAggregateOutputType | null
    _sum: ExampleSumAggregateOutputType | null
    _min: ExampleMinAggregateOutputType | null
    _max: ExampleMaxAggregateOutputType | null
  }

  type GetExampleGroupByPayload<T extends ExampleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExampleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExampleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExampleGroupByOutputType[P]>
            : GetScalarType<T[P], ExampleGroupByOutputType[P]>
        }
      >
    >


  export type ExampleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    dictionaryId?: boolean
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["example"]>

  export type ExampleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    dictionaryId?: boolean
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["example"]>

  export type ExampleSelectScalar = {
    id?: boolean
    text?: boolean
    dictionaryId?: boolean
  }

  export type ExampleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }
  export type ExampleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    dictionary?: boolean | DictionaryDefaultArgs<ExtArgs>
  }

  export type $ExamplePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Example"
    objects: {
      dictionary: Prisma.$DictionaryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      text: string
      dictionaryId: string
    }, ExtArgs["result"]["example"]>
    composites: {}
  }

  type ExampleGetPayload<S extends boolean | null | undefined | ExampleDefaultArgs> = $Result.GetResult<Prisma.$ExamplePayload, S>

  type ExampleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ExampleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ExampleCountAggregateInputType | true
    }

  export interface ExampleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Example'], meta: { name: 'Example' } }
    /**
     * Find zero or one Example that matches the filter.
     * @param {ExampleFindUniqueArgs} args - Arguments to find a Example
     * @example
     * // Get one Example
     * const example = await prisma.example.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExampleFindUniqueArgs>(args: SelectSubset<T, ExampleFindUniqueArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Example that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ExampleFindUniqueOrThrowArgs} args - Arguments to find a Example
     * @example
     * // Get one Example
     * const example = await prisma.example.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExampleFindUniqueOrThrowArgs>(args: SelectSubset<T, ExampleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Example that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleFindFirstArgs} args - Arguments to find a Example
     * @example
     * // Get one Example
     * const example = await prisma.example.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExampleFindFirstArgs>(args?: SelectSubset<T, ExampleFindFirstArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Example that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleFindFirstOrThrowArgs} args - Arguments to find a Example
     * @example
     * // Get one Example
     * const example = await prisma.example.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExampleFindFirstOrThrowArgs>(args?: SelectSubset<T, ExampleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Examples that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Examples
     * const examples = await prisma.example.findMany()
     * 
     * // Get first 10 Examples
     * const examples = await prisma.example.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exampleWithIdOnly = await prisma.example.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExampleFindManyArgs>(args?: SelectSubset<T, ExampleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Example.
     * @param {ExampleCreateArgs} args - Arguments to create a Example.
     * @example
     * // Create one Example
     * const Example = await prisma.example.create({
     *   data: {
     *     // ... data to create a Example
     *   }
     * })
     * 
     */
    create<T extends ExampleCreateArgs>(args: SelectSubset<T, ExampleCreateArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Examples.
     * @param {ExampleCreateManyArgs} args - Arguments to create many Examples.
     * @example
     * // Create many Examples
     * const example = await prisma.example.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExampleCreateManyArgs>(args?: SelectSubset<T, ExampleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Examples and returns the data saved in the database.
     * @param {ExampleCreateManyAndReturnArgs} args - Arguments to create many Examples.
     * @example
     * // Create many Examples
     * const example = await prisma.example.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Examples and only return the `id`
     * const exampleWithIdOnly = await prisma.example.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExampleCreateManyAndReturnArgs>(args?: SelectSubset<T, ExampleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Example.
     * @param {ExampleDeleteArgs} args - Arguments to delete one Example.
     * @example
     * // Delete one Example
     * const Example = await prisma.example.delete({
     *   where: {
     *     // ... filter to delete one Example
     *   }
     * })
     * 
     */
    delete<T extends ExampleDeleteArgs>(args: SelectSubset<T, ExampleDeleteArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Example.
     * @param {ExampleUpdateArgs} args - Arguments to update one Example.
     * @example
     * // Update one Example
     * const example = await prisma.example.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExampleUpdateArgs>(args: SelectSubset<T, ExampleUpdateArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Examples.
     * @param {ExampleDeleteManyArgs} args - Arguments to filter Examples to delete.
     * @example
     * // Delete a few Examples
     * const { count } = await prisma.example.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExampleDeleteManyArgs>(args?: SelectSubset<T, ExampleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Examples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Examples
     * const example = await prisma.example.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExampleUpdateManyArgs>(args: SelectSubset<T, ExampleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Example.
     * @param {ExampleUpsertArgs} args - Arguments to update or create a Example.
     * @example
     * // Update or create a Example
     * const example = await prisma.example.upsert({
     *   create: {
     *     // ... data to create a Example
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Example we want to update
     *   }
     * })
     */
    upsert<T extends ExampleUpsertArgs>(args: SelectSubset<T, ExampleUpsertArgs<ExtArgs>>): Prisma__ExampleClient<$Result.GetResult<Prisma.$ExamplePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Examples.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleCountArgs} args - Arguments to filter Examples to count.
     * @example
     * // Count the number of Examples
     * const count = await prisma.example.count({
     *   where: {
     *     // ... the filter for the Examples we want to count
     *   }
     * })
    **/
    count<T extends ExampleCountArgs>(
      args?: Subset<T, ExampleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExampleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Example.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExampleAggregateArgs>(args: Subset<T, ExampleAggregateArgs>): Prisma.PrismaPromise<GetExampleAggregateType<T>>

    /**
     * Group by Example.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExampleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExampleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExampleGroupByArgs['orderBy'] }
        : { orderBy?: ExampleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExampleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExampleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Example model
   */
  readonly fields: ExampleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Example.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExampleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    dictionary<T extends DictionaryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DictionaryDefaultArgs<ExtArgs>>): Prisma__DictionaryClient<$Result.GetResult<Prisma.$DictionaryPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Example model
   */ 
  interface ExampleFieldRefs {
    readonly id: FieldRef<"Example", 'Int'>
    readonly text: FieldRef<"Example", 'String'>
    readonly dictionaryId: FieldRef<"Example", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Example findUnique
   */
  export type ExampleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter, which Example to fetch.
     */
    where: ExampleWhereUniqueInput
  }

  /**
   * Example findUniqueOrThrow
   */
  export type ExampleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter, which Example to fetch.
     */
    where: ExampleWhereUniqueInput
  }

  /**
   * Example findFirst
   */
  export type ExampleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter, which Example to fetch.
     */
    where?: ExampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examples to fetch.
     */
    orderBy?: ExampleOrderByWithRelationInput | ExampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Examples.
     */
    cursor?: ExampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Examples.
     */
    distinct?: ExampleScalarFieldEnum | ExampleScalarFieldEnum[]
  }

  /**
   * Example findFirstOrThrow
   */
  export type ExampleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter, which Example to fetch.
     */
    where?: ExampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examples to fetch.
     */
    orderBy?: ExampleOrderByWithRelationInput | ExampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Examples.
     */
    cursor?: ExampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examples.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Examples.
     */
    distinct?: ExampleScalarFieldEnum | ExampleScalarFieldEnum[]
  }

  /**
   * Example findMany
   */
  export type ExampleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter, which Examples to fetch.
     */
    where?: ExampleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Examples to fetch.
     */
    orderBy?: ExampleOrderByWithRelationInput | ExampleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Examples.
     */
    cursor?: ExampleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Examples from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Examples.
     */
    skip?: number
    distinct?: ExampleScalarFieldEnum | ExampleScalarFieldEnum[]
  }

  /**
   * Example create
   */
  export type ExampleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * The data needed to create a Example.
     */
    data: XOR<ExampleCreateInput, ExampleUncheckedCreateInput>
  }

  /**
   * Example createMany
   */
  export type ExampleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Examples.
     */
    data: ExampleCreateManyInput | ExampleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Example createManyAndReturn
   */
  export type ExampleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Examples.
     */
    data: ExampleCreateManyInput | ExampleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Example update
   */
  export type ExampleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * The data needed to update a Example.
     */
    data: XOR<ExampleUpdateInput, ExampleUncheckedUpdateInput>
    /**
     * Choose, which Example to update.
     */
    where: ExampleWhereUniqueInput
  }

  /**
   * Example updateMany
   */
  export type ExampleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Examples.
     */
    data: XOR<ExampleUpdateManyMutationInput, ExampleUncheckedUpdateManyInput>
    /**
     * Filter which Examples to update
     */
    where?: ExampleWhereInput
  }

  /**
   * Example upsert
   */
  export type ExampleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * The filter to search for the Example to update in case it exists.
     */
    where: ExampleWhereUniqueInput
    /**
     * In case the Example found by the `where` argument doesn't exist, create a new Example with this data.
     */
    create: XOR<ExampleCreateInput, ExampleUncheckedCreateInput>
    /**
     * In case the Example was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExampleUpdateInput, ExampleUncheckedUpdateInput>
  }

  /**
   * Example delete
   */
  export type ExampleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
    /**
     * Filter which Example to delete.
     */
    where: ExampleWhereUniqueInput
  }

  /**
   * Example deleteMany
   */
  export type ExampleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Examples to delete
     */
    where?: ExampleWhereInput
  }

  /**
   * Example without action
   */
  export type ExampleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Example
     */
    select?: ExampleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ExampleInclude<ExtArgs> | null
  }


  /**
   * Model Suggestion
   */

  export type AggregateSuggestion = {
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  export type SuggestionMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuggestionMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    status: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SuggestionCountAggregateOutputType = {
    id: number
    title: number
    content: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SuggestionMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuggestionMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SuggestionCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SuggestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestion to aggregate.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Suggestions
    **/
    _count?: true | SuggestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SuggestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SuggestionMaxAggregateInputType
  }

  export type GetSuggestionAggregateType<T extends SuggestionAggregateArgs> = {
        [P in keyof T & keyof AggregateSuggestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSuggestion[P]>
      : GetScalarType<T[P], AggregateSuggestion[P]>
  }




  export type SuggestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SuggestionWhereInput
    orderBy?: SuggestionOrderByWithAggregationInput | SuggestionOrderByWithAggregationInput[]
    by: SuggestionScalarFieldEnum[] | SuggestionScalarFieldEnum
    having?: SuggestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SuggestionCountAggregateInputType | true
    _min?: SuggestionMinAggregateInputType
    _max?: SuggestionMaxAggregateInputType
  }

  export type SuggestionGroupByOutputType = {
    id: string
    title: string
    content: string
    status: string
    createdAt: Date
    updatedAt: Date
    _count: SuggestionCountAggregateOutputType | null
    _min: SuggestionMinAggregateOutputType | null
    _max: SuggestionMaxAggregateOutputType | null
  }

  type GetSuggestionGroupByPayload<T extends SuggestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SuggestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SuggestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
            : GetScalarType<T[P], SuggestionGroupByOutputType[P]>
        }
      >
    >


  export type SuggestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["suggestion"]>

  export type SuggestionSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }


  export type $SuggestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Suggestion"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      status: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["suggestion"]>
    composites: {}
  }

  type SuggestionGetPayload<S extends boolean | null | undefined | SuggestionDefaultArgs> = $Result.GetResult<Prisma.$SuggestionPayload, S>

  type SuggestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SuggestionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SuggestionCountAggregateInputType | true
    }

  export interface SuggestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Suggestion'], meta: { name: 'Suggestion' } }
    /**
     * Find zero or one Suggestion that matches the filter.
     * @param {SuggestionFindUniqueArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SuggestionFindUniqueArgs>(args: SelectSubset<T, SuggestionFindUniqueArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Suggestion that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {SuggestionFindUniqueOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SuggestionFindUniqueOrThrowArgs>(args: SelectSubset<T, SuggestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Suggestion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SuggestionFindFirstArgs>(args?: SelectSubset<T, SuggestionFindFirstArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Suggestion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindFirstOrThrowArgs} args - Arguments to find a Suggestion
     * @example
     * // Get one Suggestion
     * const suggestion = await prisma.suggestion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SuggestionFindFirstOrThrowArgs>(args?: SelectSubset<T, SuggestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Suggestions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Suggestions
     * const suggestions = await prisma.suggestion.findMany()
     * 
     * // Get first 10 Suggestions
     * const suggestions = await prisma.suggestion.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SuggestionFindManyArgs>(args?: SelectSubset<T, SuggestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Suggestion.
     * @param {SuggestionCreateArgs} args - Arguments to create a Suggestion.
     * @example
     * // Create one Suggestion
     * const Suggestion = await prisma.suggestion.create({
     *   data: {
     *     // ... data to create a Suggestion
     *   }
     * })
     * 
     */
    create<T extends SuggestionCreateArgs>(args: SelectSubset<T, SuggestionCreateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Suggestions.
     * @param {SuggestionCreateManyArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SuggestionCreateManyArgs>(args?: SelectSubset<T, SuggestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Suggestions and returns the data saved in the database.
     * @param {SuggestionCreateManyAndReturnArgs} args - Arguments to create many Suggestions.
     * @example
     * // Create many Suggestions
     * const suggestion = await prisma.suggestion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Suggestions and only return the `id`
     * const suggestionWithIdOnly = await prisma.suggestion.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SuggestionCreateManyAndReturnArgs>(args?: SelectSubset<T, SuggestionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Suggestion.
     * @param {SuggestionDeleteArgs} args - Arguments to delete one Suggestion.
     * @example
     * // Delete one Suggestion
     * const Suggestion = await prisma.suggestion.delete({
     *   where: {
     *     // ... filter to delete one Suggestion
     *   }
     * })
     * 
     */
    delete<T extends SuggestionDeleteArgs>(args: SelectSubset<T, SuggestionDeleteArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Suggestion.
     * @param {SuggestionUpdateArgs} args - Arguments to update one Suggestion.
     * @example
     * // Update one Suggestion
     * const suggestion = await prisma.suggestion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SuggestionUpdateArgs>(args: SelectSubset<T, SuggestionUpdateArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Suggestions.
     * @param {SuggestionDeleteManyArgs} args - Arguments to filter Suggestions to delete.
     * @example
     * // Delete a few Suggestions
     * const { count } = await prisma.suggestion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SuggestionDeleteManyArgs>(args?: SelectSubset<T, SuggestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Suggestions
     * const suggestion = await prisma.suggestion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SuggestionUpdateManyArgs>(args: SelectSubset<T, SuggestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Suggestion.
     * @param {SuggestionUpsertArgs} args - Arguments to update or create a Suggestion.
     * @example
     * // Update or create a Suggestion
     * const suggestion = await prisma.suggestion.upsert({
     *   create: {
     *     // ... data to create a Suggestion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Suggestion we want to update
     *   }
     * })
     */
    upsert<T extends SuggestionUpsertArgs>(args: SelectSubset<T, SuggestionUpsertArgs<ExtArgs>>): Prisma__SuggestionClient<$Result.GetResult<Prisma.$SuggestionPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Suggestions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionCountArgs} args - Arguments to filter Suggestions to count.
     * @example
     * // Count the number of Suggestions
     * const count = await prisma.suggestion.count({
     *   where: {
     *     // ... the filter for the Suggestions we want to count
     *   }
     * })
    **/
    count<T extends SuggestionCountArgs>(
      args?: Subset<T, SuggestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SuggestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SuggestionAggregateArgs>(args: Subset<T, SuggestionAggregateArgs>): Prisma.PrismaPromise<GetSuggestionAggregateType<T>>

    /**
     * Group by Suggestion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SuggestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SuggestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SuggestionGroupByArgs['orderBy'] }
        : { orderBy?: SuggestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SuggestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSuggestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Suggestion model
   */
  readonly fields: SuggestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Suggestion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SuggestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Suggestion model
   */ 
  interface SuggestionFieldRefs {
    readonly id: FieldRef<"Suggestion", 'String'>
    readonly title: FieldRef<"Suggestion", 'String'>
    readonly content: FieldRef<"Suggestion", 'String'>
    readonly status: FieldRef<"Suggestion", 'String'>
    readonly createdAt: FieldRef<"Suggestion", 'DateTime'>
    readonly updatedAt: FieldRef<"Suggestion", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Suggestion findUnique
   */
  export type SuggestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findUniqueOrThrow
   */
  export type SuggestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion findFirst
   */
  export type SuggestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findFirstOrThrow
   */
  export type SuggestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter, which Suggestion to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Suggestions.
     */
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion findMany
   */
  export type SuggestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter, which Suggestions to fetch.
     */
    where?: SuggestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Suggestions to fetch.
     */
    orderBy?: SuggestionOrderByWithRelationInput | SuggestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Suggestions.
     */
    cursor?: SuggestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Suggestions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Suggestions.
     */
    skip?: number
    distinct?: SuggestionScalarFieldEnum | SuggestionScalarFieldEnum[]
  }

  /**
   * Suggestion create
   */
  export type SuggestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * The data needed to create a Suggestion.
     */
    data: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
  }

  /**
   * Suggestion createMany
   */
  export type SuggestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Suggestion createManyAndReturn
   */
  export type SuggestionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Suggestions.
     */
    data: SuggestionCreateManyInput | SuggestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Suggestion update
   */
  export type SuggestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * The data needed to update a Suggestion.
     */
    data: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
    /**
     * Choose, which Suggestion to update.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion updateMany
   */
  export type SuggestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Suggestions.
     */
    data: XOR<SuggestionUpdateManyMutationInput, SuggestionUncheckedUpdateManyInput>
    /**
     * Filter which Suggestions to update
     */
    where?: SuggestionWhereInput
  }

  /**
   * Suggestion upsert
   */
  export type SuggestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * The filter to search for the Suggestion to update in case it exists.
     */
    where: SuggestionWhereUniqueInput
    /**
     * In case the Suggestion found by the `where` argument doesn't exist, create a new Suggestion with this data.
     */
    create: XOR<SuggestionCreateInput, SuggestionUncheckedCreateInput>
    /**
     * In case the Suggestion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SuggestionUpdateInput, SuggestionUncheckedUpdateInput>
  }

  /**
   * Suggestion delete
   */
  export type SuggestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
    /**
     * Filter which Suggestion to delete.
     */
    where: SuggestionWhereUniqueInput
  }

  /**
   * Suggestion deleteMany
   */
  export type SuggestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Suggestions to delete
     */
    where?: SuggestionWhereInput
  }

  /**
   * Suggestion without action
   */
  export type SuggestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Suggestion
     */
    select?: SuggestionSelect<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const DictionaryScalarFieldEnum: {
    id: 'id',
    korean: 'korean',
    english: 'english',
    russian: 'russian',
    pronunciation: 'pronunciation',
    definition: 'definition',
    definition_ru: 'definition_ru',
    category: 'category',
    difficulty: 'difficulty',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DictionaryScalarFieldEnum = (typeof DictionaryScalarFieldEnum)[keyof typeof DictionaryScalarFieldEnum]


  export const StatisticsScalarFieldEnum: {
    id: 'id',
    totalVisits: 'totalVisits',
    lastUpdated: 'lastUpdated'
  };

  export type StatisticsScalarFieldEnum = (typeof StatisticsScalarFieldEnum)[keyof typeof StatisticsScalarFieldEnum]


  export const MenuStatsScalarFieldEnum: {
    id: 'id',
    menuId: 'menuId',
    name: 'name',
    nameRu: 'nameRu',
    count: 'count',
    lastClicked: 'lastClicked'
  };

  export type MenuStatsScalarFieldEnum = (typeof MenuStatsScalarFieldEnum)[keyof typeof MenuStatsScalarFieldEnum]


  export const WordStatsScalarFieldEnum: {
    id: 'id',
    korean: 'korean',
    russian: 'russian',
    pronunciation: 'pronunciation',
    count: 'count',
    lastUsed: 'lastUsed'
  };

  export type WordStatsScalarFieldEnum = (typeof WordStatsScalarFieldEnum)[keyof typeof WordStatsScalarFieldEnum]


  export const NoticeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NoticeScalarFieldEnum = (typeof NoticeScalarFieldEnum)[keyof typeof NoticeScalarFieldEnum]


  export const GameRecordScalarFieldEnum: {
    id: 'id',
    score: 'score',
    level: 'level',
    duration: 'duration',
    createdAt: 'createdAt'
  };

  export type GameRecordScalarFieldEnum = (typeof GameRecordScalarFieldEnum)[keyof typeof GameRecordScalarFieldEnum]


  export const ExampleScalarFieldEnum: {
    id: 'id',
    text: 'text',
    dictionaryId: 'dictionaryId'
  };

  export type ExampleScalarFieldEnum = (typeof ExampleScalarFieldEnum)[keyof typeof ExampleScalarFieldEnum]


  export const SuggestionScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SuggestionScalarFieldEnum = (typeof SuggestionScalarFieldEnum)[keyof typeof SuggestionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type DictionaryWhereInput = {
    AND?: DictionaryWhereInput | DictionaryWhereInput[]
    OR?: DictionaryWhereInput[]
    NOT?: DictionaryWhereInput | DictionaryWhereInput[]
    id?: StringFilter<"Dictionary"> | string
    korean?: StringFilter<"Dictionary"> | string
    english?: StringNullableFilter<"Dictionary"> | string | null
    russian?: StringFilter<"Dictionary"> | string
    pronunciation?: StringFilter<"Dictionary"> | string
    definition?: StringNullableFilter<"Dictionary"> | string | null
    definition_ru?: StringNullableFilter<"Dictionary"> | string | null
    category?: StringFilter<"Dictionary"> | string
    difficulty?: StringFilter<"Dictionary"> | string
    createdAt?: DateTimeFilter<"Dictionary"> | Date | string
    updatedAt?: DateTimeFilter<"Dictionary"> | Date | string
    examples?: ExampleListRelationFilter
    stats?: XOR<WordStatsNullableScalarRelationFilter, WordStatsWhereInput> | null
  }

  export type DictionaryOrderByWithRelationInput = {
    id?: SortOrder
    korean?: SortOrder
    english?: SortOrderInput | SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    definition?: SortOrderInput | SortOrder
    definition_ru?: SortOrderInput | SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    examples?: ExampleOrderByRelationAggregateInput
    stats?: WordStatsOrderByWithRelationInput
  }

  export type DictionaryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    korean?: string
    AND?: DictionaryWhereInput | DictionaryWhereInput[]
    OR?: DictionaryWhereInput[]
    NOT?: DictionaryWhereInput | DictionaryWhereInput[]
    english?: StringNullableFilter<"Dictionary"> | string | null
    russian?: StringFilter<"Dictionary"> | string
    pronunciation?: StringFilter<"Dictionary"> | string
    definition?: StringNullableFilter<"Dictionary"> | string | null
    definition_ru?: StringNullableFilter<"Dictionary"> | string | null
    category?: StringFilter<"Dictionary"> | string
    difficulty?: StringFilter<"Dictionary"> | string
    createdAt?: DateTimeFilter<"Dictionary"> | Date | string
    updatedAt?: DateTimeFilter<"Dictionary"> | Date | string
    examples?: ExampleListRelationFilter
    stats?: XOR<WordStatsNullableScalarRelationFilter, WordStatsWhereInput> | null
  }, "id" | "korean">

  export type DictionaryOrderByWithAggregationInput = {
    id?: SortOrder
    korean?: SortOrder
    english?: SortOrderInput | SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    definition?: SortOrderInput | SortOrder
    definition_ru?: SortOrderInput | SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DictionaryCountOrderByAggregateInput
    _max?: DictionaryMaxOrderByAggregateInput
    _min?: DictionaryMinOrderByAggregateInput
  }

  export type DictionaryScalarWhereWithAggregatesInput = {
    AND?: DictionaryScalarWhereWithAggregatesInput | DictionaryScalarWhereWithAggregatesInput[]
    OR?: DictionaryScalarWhereWithAggregatesInput[]
    NOT?: DictionaryScalarWhereWithAggregatesInput | DictionaryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Dictionary"> | string
    korean?: StringWithAggregatesFilter<"Dictionary"> | string
    english?: StringNullableWithAggregatesFilter<"Dictionary"> | string | null
    russian?: StringWithAggregatesFilter<"Dictionary"> | string
    pronunciation?: StringWithAggregatesFilter<"Dictionary"> | string
    definition?: StringNullableWithAggregatesFilter<"Dictionary"> | string | null
    definition_ru?: StringNullableWithAggregatesFilter<"Dictionary"> | string | null
    category?: StringWithAggregatesFilter<"Dictionary"> | string
    difficulty?: StringWithAggregatesFilter<"Dictionary"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Dictionary"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Dictionary"> | Date | string
  }

  export type StatisticsWhereInput = {
    AND?: StatisticsWhereInput | StatisticsWhereInput[]
    OR?: StatisticsWhereInput[]
    NOT?: StatisticsWhereInput | StatisticsWhereInput[]
    id?: StringFilter<"Statistics"> | string
    totalVisits?: IntFilter<"Statistics"> | number
    lastUpdated?: DateTimeFilter<"Statistics"> | Date | string
  }

  export type StatisticsOrderByWithRelationInput = {
    id?: SortOrder
    totalVisits?: SortOrder
    lastUpdated?: SortOrder
  }

  export type StatisticsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: StatisticsWhereInput | StatisticsWhereInput[]
    OR?: StatisticsWhereInput[]
    NOT?: StatisticsWhereInput | StatisticsWhereInput[]
    totalVisits?: IntFilter<"Statistics"> | number
    lastUpdated?: DateTimeFilter<"Statistics"> | Date | string
  }, "id">

  export type StatisticsOrderByWithAggregationInput = {
    id?: SortOrder
    totalVisits?: SortOrder
    lastUpdated?: SortOrder
    _count?: StatisticsCountOrderByAggregateInput
    _avg?: StatisticsAvgOrderByAggregateInput
    _max?: StatisticsMaxOrderByAggregateInput
    _min?: StatisticsMinOrderByAggregateInput
    _sum?: StatisticsSumOrderByAggregateInput
  }

  export type StatisticsScalarWhereWithAggregatesInput = {
    AND?: StatisticsScalarWhereWithAggregatesInput | StatisticsScalarWhereWithAggregatesInput[]
    OR?: StatisticsScalarWhereWithAggregatesInput[]
    NOT?: StatisticsScalarWhereWithAggregatesInput | StatisticsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Statistics"> | string
    totalVisits?: IntWithAggregatesFilter<"Statistics"> | number
    lastUpdated?: DateTimeWithAggregatesFilter<"Statistics"> | Date | string
  }

  export type MenuStatsWhereInput = {
    AND?: MenuStatsWhereInput | MenuStatsWhereInput[]
    OR?: MenuStatsWhereInput[]
    NOT?: MenuStatsWhereInput | MenuStatsWhereInput[]
    id?: StringFilter<"MenuStats"> | string
    menuId?: StringFilter<"MenuStats"> | string
    name?: StringFilter<"MenuStats"> | string
    nameRu?: StringFilter<"MenuStats"> | string
    count?: IntFilter<"MenuStats"> | number
    lastClicked?: DateTimeFilter<"MenuStats"> | Date | string
  }

  export type MenuStatsOrderByWithRelationInput = {
    id?: SortOrder
    menuId?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    count?: SortOrder
    lastClicked?: SortOrder
  }

  export type MenuStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    menuId?: string
    AND?: MenuStatsWhereInput | MenuStatsWhereInput[]
    OR?: MenuStatsWhereInput[]
    NOT?: MenuStatsWhereInput | MenuStatsWhereInput[]
    name?: StringFilter<"MenuStats"> | string
    nameRu?: StringFilter<"MenuStats"> | string
    count?: IntFilter<"MenuStats"> | number
    lastClicked?: DateTimeFilter<"MenuStats"> | Date | string
  }, "id" | "menuId">

  export type MenuStatsOrderByWithAggregationInput = {
    id?: SortOrder
    menuId?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    count?: SortOrder
    lastClicked?: SortOrder
    _count?: MenuStatsCountOrderByAggregateInput
    _avg?: MenuStatsAvgOrderByAggregateInput
    _max?: MenuStatsMaxOrderByAggregateInput
    _min?: MenuStatsMinOrderByAggregateInput
    _sum?: MenuStatsSumOrderByAggregateInput
  }

  export type MenuStatsScalarWhereWithAggregatesInput = {
    AND?: MenuStatsScalarWhereWithAggregatesInput | MenuStatsScalarWhereWithAggregatesInput[]
    OR?: MenuStatsScalarWhereWithAggregatesInput[]
    NOT?: MenuStatsScalarWhereWithAggregatesInput | MenuStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MenuStats"> | string
    menuId?: StringWithAggregatesFilter<"MenuStats"> | string
    name?: StringWithAggregatesFilter<"MenuStats"> | string
    nameRu?: StringWithAggregatesFilter<"MenuStats"> | string
    count?: IntWithAggregatesFilter<"MenuStats"> | number
    lastClicked?: DateTimeWithAggregatesFilter<"MenuStats"> | Date | string
  }

  export type WordStatsWhereInput = {
    AND?: WordStatsWhereInput | WordStatsWhereInput[]
    OR?: WordStatsWhereInput[]
    NOT?: WordStatsWhereInput | WordStatsWhereInput[]
    id?: StringFilter<"WordStats"> | string
    korean?: StringFilter<"WordStats"> | string
    russian?: StringFilter<"WordStats"> | string
    pronunciation?: StringFilter<"WordStats"> | string
    count?: IntFilter<"WordStats"> | number
    lastUsed?: DateTimeFilter<"WordStats"> | Date | string
    dictionary?: XOR<DictionaryScalarRelationFilter, DictionaryWhereInput>
  }

  export type WordStatsOrderByWithRelationInput = {
    id?: SortOrder
    korean?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    count?: SortOrder
    lastUsed?: SortOrder
    dictionary?: DictionaryOrderByWithRelationInput
  }

  export type WordStatsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    korean?: string
    AND?: WordStatsWhereInput | WordStatsWhereInput[]
    OR?: WordStatsWhereInput[]
    NOT?: WordStatsWhereInput | WordStatsWhereInput[]
    russian?: StringFilter<"WordStats"> | string
    pronunciation?: StringFilter<"WordStats"> | string
    count?: IntFilter<"WordStats"> | number
    lastUsed?: DateTimeFilter<"WordStats"> | Date | string
    dictionary?: XOR<DictionaryScalarRelationFilter, DictionaryWhereInput>
  }, "id" | "korean">

  export type WordStatsOrderByWithAggregationInput = {
    id?: SortOrder
    korean?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    count?: SortOrder
    lastUsed?: SortOrder
    _count?: WordStatsCountOrderByAggregateInput
    _avg?: WordStatsAvgOrderByAggregateInput
    _max?: WordStatsMaxOrderByAggregateInput
    _min?: WordStatsMinOrderByAggregateInput
    _sum?: WordStatsSumOrderByAggregateInput
  }

  export type WordStatsScalarWhereWithAggregatesInput = {
    AND?: WordStatsScalarWhereWithAggregatesInput | WordStatsScalarWhereWithAggregatesInput[]
    OR?: WordStatsScalarWhereWithAggregatesInput[]
    NOT?: WordStatsScalarWhereWithAggregatesInput | WordStatsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WordStats"> | string
    korean?: StringWithAggregatesFilter<"WordStats"> | string
    russian?: StringWithAggregatesFilter<"WordStats"> | string
    pronunciation?: StringWithAggregatesFilter<"WordStats"> | string
    count?: IntWithAggregatesFilter<"WordStats"> | number
    lastUsed?: DateTimeWithAggregatesFilter<"WordStats"> | Date | string
  }

  export type NoticeWhereInput = {
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    id?: StringFilter<"Notice"> | string
    title?: StringFilter<"Notice"> | string
    content?: StringFilter<"Notice"> | string
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    updatedAt?: DateTimeFilter<"Notice"> | Date | string
  }

  export type NoticeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NoticeWhereInput | NoticeWhereInput[]
    OR?: NoticeWhereInput[]
    NOT?: NoticeWhereInput | NoticeWhereInput[]
    title?: StringFilter<"Notice"> | string
    content?: StringFilter<"Notice"> | string
    createdAt?: DateTimeFilter<"Notice"> | Date | string
    updatedAt?: DateTimeFilter<"Notice"> | Date | string
  }, "id">

  export type NoticeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NoticeCountOrderByAggregateInput
    _max?: NoticeMaxOrderByAggregateInput
    _min?: NoticeMinOrderByAggregateInput
  }

  export type NoticeScalarWhereWithAggregatesInput = {
    AND?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    OR?: NoticeScalarWhereWithAggregatesInput[]
    NOT?: NoticeScalarWhereWithAggregatesInput | NoticeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Notice"> | string
    title?: StringWithAggregatesFilter<"Notice"> | string
    content?: StringWithAggregatesFilter<"Notice"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Notice"> | Date | string
  }

  export type GameRecordWhereInput = {
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    id?: StringFilter<"GameRecord"> | string
    score?: IntFilter<"GameRecord"> | number
    level?: IntFilter<"GameRecord"> | number
    duration?: IntFilter<"GameRecord"> | number
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
  }

  export type GameRecordOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: GameRecordWhereInput | GameRecordWhereInput[]
    OR?: GameRecordWhereInput[]
    NOT?: GameRecordWhereInput | GameRecordWhereInput[]
    score?: IntFilter<"GameRecord"> | number
    level?: IntFilter<"GameRecord"> | number
    duration?: IntFilter<"GameRecord"> | number
    createdAt?: DateTimeFilter<"GameRecord"> | Date | string
  }, "id">

  export type GameRecordOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
    _count?: GameRecordCountOrderByAggregateInput
    _avg?: GameRecordAvgOrderByAggregateInput
    _max?: GameRecordMaxOrderByAggregateInput
    _min?: GameRecordMinOrderByAggregateInput
    _sum?: GameRecordSumOrderByAggregateInput
  }

  export type GameRecordScalarWhereWithAggregatesInput = {
    AND?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    OR?: GameRecordScalarWhereWithAggregatesInput[]
    NOT?: GameRecordScalarWhereWithAggregatesInput | GameRecordScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"GameRecord"> | string
    score?: IntWithAggregatesFilter<"GameRecord"> | number
    level?: IntWithAggregatesFilter<"GameRecord"> | number
    duration?: IntWithAggregatesFilter<"GameRecord"> | number
    createdAt?: DateTimeWithAggregatesFilter<"GameRecord"> | Date | string
  }

  export type ExampleWhereInput = {
    AND?: ExampleWhereInput | ExampleWhereInput[]
    OR?: ExampleWhereInput[]
    NOT?: ExampleWhereInput | ExampleWhereInput[]
    id?: IntFilter<"Example"> | number
    text?: StringFilter<"Example"> | string
    dictionaryId?: StringFilter<"Example"> | string
    dictionary?: XOR<DictionaryScalarRelationFilter, DictionaryWhereInput>
  }

  export type ExampleOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    dictionaryId?: SortOrder
    dictionary?: DictionaryOrderByWithRelationInput
  }

  export type ExampleWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ExampleWhereInput | ExampleWhereInput[]
    OR?: ExampleWhereInput[]
    NOT?: ExampleWhereInput | ExampleWhereInput[]
    text?: StringFilter<"Example"> | string
    dictionaryId?: StringFilter<"Example"> | string
    dictionary?: XOR<DictionaryScalarRelationFilter, DictionaryWhereInput>
  }, "id">

  export type ExampleOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    dictionaryId?: SortOrder
    _count?: ExampleCountOrderByAggregateInput
    _avg?: ExampleAvgOrderByAggregateInput
    _max?: ExampleMaxOrderByAggregateInput
    _min?: ExampleMinOrderByAggregateInput
    _sum?: ExampleSumOrderByAggregateInput
  }

  export type ExampleScalarWhereWithAggregatesInput = {
    AND?: ExampleScalarWhereWithAggregatesInput | ExampleScalarWhereWithAggregatesInput[]
    OR?: ExampleScalarWhereWithAggregatesInput[]
    NOT?: ExampleScalarWhereWithAggregatesInput | ExampleScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Example"> | number
    text?: StringWithAggregatesFilter<"Example"> | string
    dictionaryId?: StringWithAggregatesFilter<"Example"> | string
  }

  export type SuggestionWhereInput = {
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    id?: StringFilter<"Suggestion"> | string
    title?: StringFilter<"Suggestion"> | string
    content?: StringFilter<"Suggestion"> | string
    status?: StringFilter<"Suggestion"> | string
    createdAt?: DateTimeFilter<"Suggestion"> | Date | string
    updatedAt?: DateTimeFilter<"Suggestion"> | Date | string
  }

  export type SuggestionOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuggestionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SuggestionWhereInput | SuggestionWhereInput[]
    OR?: SuggestionWhereInput[]
    NOT?: SuggestionWhereInput | SuggestionWhereInput[]
    title?: StringFilter<"Suggestion"> | string
    content?: StringFilter<"Suggestion"> | string
    status?: StringFilter<"Suggestion"> | string
    createdAt?: DateTimeFilter<"Suggestion"> | Date | string
    updatedAt?: DateTimeFilter<"Suggestion"> | Date | string
  }, "id">

  export type SuggestionOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SuggestionCountOrderByAggregateInput
    _max?: SuggestionMaxOrderByAggregateInput
    _min?: SuggestionMinOrderByAggregateInput
  }

  export type SuggestionScalarWhereWithAggregatesInput = {
    AND?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    OR?: SuggestionScalarWhereWithAggregatesInput[]
    NOT?: SuggestionScalarWhereWithAggregatesInput | SuggestionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Suggestion"> | string
    title?: StringWithAggregatesFilter<"Suggestion"> | string
    content?: StringWithAggregatesFilter<"Suggestion"> | string
    status?: StringWithAggregatesFilter<"Suggestion"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Suggestion"> | Date | string
  }

  export type DictionaryCreateInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    examples?: ExampleCreateNestedManyWithoutDictionaryInput
    stats?: WordStatsCreateNestedOneWithoutDictionaryInput
  }

  export type DictionaryUncheckedCreateInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    examples?: ExampleUncheckedCreateNestedManyWithoutDictionaryInput
    stats?: WordStatsUncheckedCreateNestedOneWithoutDictionaryInput
  }

  export type DictionaryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examples?: ExampleUpdateManyWithoutDictionaryNestedInput
    stats?: WordStatsUpdateOneWithoutDictionaryNestedInput
  }

  export type DictionaryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examples?: ExampleUncheckedUpdateManyWithoutDictionaryNestedInput
    stats?: WordStatsUncheckedUpdateOneWithoutDictionaryNestedInput
  }

  export type DictionaryCreateManyInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DictionaryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DictionaryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatisticsCreateInput = {
    id?: string
    totalVisits?: number
    lastUpdated?: Date | string
  }

  export type StatisticsUncheckedCreateInput = {
    id?: string
    totalVisits?: number
    lastUpdated?: Date | string
  }

  export type StatisticsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatisticsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatisticsCreateManyInput = {
    id?: string
    totalVisits?: number
    lastUpdated?: Date | string
  }

  export type StatisticsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StatisticsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    totalVisits?: IntFieldUpdateOperationsInput | number
    lastUpdated?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuStatsCreateInput = {
    id?: string
    menuId: string
    name: string
    nameRu: string
    count?: number
    lastClicked?: Date | string
  }

  export type MenuStatsUncheckedCreateInput = {
    id?: string
    menuId: string
    name: string
    nameRu: string
    count?: number
    lastClicked?: Date | string
  }

  export type MenuStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastClicked?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastClicked?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuStatsCreateManyInput = {
    id?: string
    menuId: string
    name: string
    nameRu: string
    count?: number
    lastClicked?: Date | string
  }

  export type MenuStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastClicked?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MenuStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    menuId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    nameRu?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastClicked?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordStatsCreateInput = {
    id?: string
    russian: string
    pronunciation: string
    count?: number
    lastUsed?: Date | string
    dictionary: DictionaryCreateNestedOneWithoutStatsInput
  }

  export type WordStatsUncheckedCreateInput = {
    id?: string
    korean: string
    russian: string
    pronunciation: string
    count?: number
    lastUsed?: Date | string
  }

  export type WordStatsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
    dictionary?: DictionaryUpdateOneRequiredWithoutStatsNestedInput
  }

  export type WordStatsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordStatsCreateManyInput = {
    id?: string
    korean: string
    russian: string
    pronunciation: string
    count?: number
    lastUsed?: Date | string
  }

  export type WordStatsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordStatsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeCreateManyInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NoticeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NoticeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordCreateInput = {
    id?: string
    score: number
    level: number
    duration: number
    createdAt?: Date | string
  }

  export type GameRecordUncheckedCreateInput = {
    id?: string
    score: number
    level: number
    duration: number
    createdAt?: Date | string
  }

  export type GameRecordUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordCreateManyInput = {
    id?: string
    score: number
    level: number
    duration: number
    createdAt?: Date | string
  }

  export type GameRecordUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GameRecordUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    score?: IntFieldUpdateOperationsInput | number
    level?: IntFieldUpdateOperationsInput | number
    duration?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExampleCreateInput = {
    text: string
    dictionary: DictionaryCreateNestedOneWithoutExamplesInput
  }

  export type ExampleUncheckedCreateInput = {
    id?: number
    text: string
    dictionaryId: string
  }

  export type ExampleUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    dictionary?: DictionaryUpdateOneRequiredWithoutExamplesNestedInput
  }

  export type ExampleUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    dictionaryId?: StringFieldUpdateOperationsInput | string
  }

  export type ExampleCreateManyInput = {
    id?: number
    text: string
    dictionaryId: string
  }

  export type ExampleUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ExampleUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    dictionaryId?: StringFieldUpdateOperationsInput | string
  }

  export type SuggestionCreateInput = {
    id?: string
    title: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuggestionUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuggestionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionCreateManyInput = {
    id?: string
    title: string
    content: string
    status?: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SuggestionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SuggestionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ExampleListRelationFilter = {
    every?: ExampleWhereInput
    some?: ExampleWhereInput
    none?: ExampleWhereInput
  }

  export type WordStatsNullableScalarRelationFilter = {
    is?: WordStatsWhereInput | null
    isNot?: WordStatsWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ExampleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DictionaryCountOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    english?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    definition?: SortOrder
    definition_ru?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DictionaryMaxOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    english?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    definition?: SortOrder
    definition_ru?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DictionaryMinOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    english?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    definition?: SortOrder
    definition_ru?: SortOrder
    category?: SortOrder
    difficulty?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StatisticsCountOrderByAggregateInput = {
    id?: SortOrder
    totalVisits?: SortOrder
    lastUpdated?: SortOrder
  }

  export type StatisticsAvgOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type StatisticsMaxOrderByAggregateInput = {
    id?: SortOrder
    totalVisits?: SortOrder
    lastUpdated?: SortOrder
  }

  export type StatisticsMinOrderByAggregateInput = {
    id?: SortOrder
    totalVisits?: SortOrder
    lastUpdated?: SortOrder
  }

  export type StatisticsSumOrderByAggregateInput = {
    totalVisits?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MenuStatsCountOrderByAggregateInput = {
    id?: SortOrder
    menuId?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    count?: SortOrder
    lastClicked?: SortOrder
  }

  export type MenuStatsAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type MenuStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    menuId?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    count?: SortOrder
    lastClicked?: SortOrder
  }

  export type MenuStatsMinOrderByAggregateInput = {
    id?: SortOrder
    menuId?: SortOrder
    name?: SortOrder
    nameRu?: SortOrder
    count?: SortOrder
    lastClicked?: SortOrder
  }

  export type MenuStatsSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type DictionaryScalarRelationFilter = {
    is?: DictionaryWhereInput
    isNot?: DictionaryWhereInput
  }

  export type WordStatsCountOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    count?: SortOrder
    lastUsed?: SortOrder
  }

  export type WordStatsAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type WordStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    count?: SortOrder
    lastUsed?: SortOrder
  }

  export type WordStatsMinOrderByAggregateInput = {
    id?: SortOrder
    korean?: SortOrder
    russian?: SortOrder
    pronunciation?: SortOrder
    count?: SortOrder
    lastUsed?: SortOrder
  }

  export type WordStatsSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type NoticeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NoticeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type GameRecordCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordAvgOrderByAggregateInput = {
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
  }

  export type GameRecordMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
    createdAt?: SortOrder
  }

  export type GameRecordSumOrderByAggregateInput = {
    score?: SortOrder
    level?: SortOrder
    duration?: SortOrder
  }

  export type ExampleCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    dictionaryId?: SortOrder
  }

  export type ExampleAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ExampleMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    dictionaryId?: SortOrder
  }

  export type ExampleMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    dictionaryId?: SortOrder
  }

  export type ExampleSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SuggestionCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuggestionMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SuggestionMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ExampleCreateNestedManyWithoutDictionaryInput = {
    create?: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput> | ExampleCreateWithoutDictionaryInput[] | ExampleUncheckedCreateWithoutDictionaryInput[]
    connectOrCreate?: ExampleCreateOrConnectWithoutDictionaryInput | ExampleCreateOrConnectWithoutDictionaryInput[]
    createMany?: ExampleCreateManyDictionaryInputEnvelope
    connect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
  }

  export type WordStatsCreateNestedOneWithoutDictionaryInput = {
    create?: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
    connectOrCreate?: WordStatsCreateOrConnectWithoutDictionaryInput
    connect?: WordStatsWhereUniqueInput
  }

  export type ExampleUncheckedCreateNestedManyWithoutDictionaryInput = {
    create?: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput> | ExampleCreateWithoutDictionaryInput[] | ExampleUncheckedCreateWithoutDictionaryInput[]
    connectOrCreate?: ExampleCreateOrConnectWithoutDictionaryInput | ExampleCreateOrConnectWithoutDictionaryInput[]
    createMany?: ExampleCreateManyDictionaryInputEnvelope
    connect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
  }

  export type WordStatsUncheckedCreateNestedOneWithoutDictionaryInput = {
    create?: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
    connectOrCreate?: WordStatsCreateOrConnectWithoutDictionaryInput
    connect?: WordStatsWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ExampleUpdateManyWithoutDictionaryNestedInput = {
    create?: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput> | ExampleCreateWithoutDictionaryInput[] | ExampleUncheckedCreateWithoutDictionaryInput[]
    connectOrCreate?: ExampleCreateOrConnectWithoutDictionaryInput | ExampleCreateOrConnectWithoutDictionaryInput[]
    upsert?: ExampleUpsertWithWhereUniqueWithoutDictionaryInput | ExampleUpsertWithWhereUniqueWithoutDictionaryInput[]
    createMany?: ExampleCreateManyDictionaryInputEnvelope
    set?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    disconnect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    delete?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    connect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    update?: ExampleUpdateWithWhereUniqueWithoutDictionaryInput | ExampleUpdateWithWhereUniqueWithoutDictionaryInput[]
    updateMany?: ExampleUpdateManyWithWhereWithoutDictionaryInput | ExampleUpdateManyWithWhereWithoutDictionaryInput[]
    deleteMany?: ExampleScalarWhereInput | ExampleScalarWhereInput[]
  }

  export type WordStatsUpdateOneWithoutDictionaryNestedInput = {
    create?: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
    connectOrCreate?: WordStatsCreateOrConnectWithoutDictionaryInput
    upsert?: WordStatsUpsertWithoutDictionaryInput
    disconnect?: WordStatsWhereInput | boolean
    delete?: WordStatsWhereInput | boolean
    connect?: WordStatsWhereUniqueInput
    update?: XOR<XOR<WordStatsUpdateToOneWithWhereWithoutDictionaryInput, WordStatsUpdateWithoutDictionaryInput>, WordStatsUncheckedUpdateWithoutDictionaryInput>
  }

  export type ExampleUncheckedUpdateManyWithoutDictionaryNestedInput = {
    create?: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput> | ExampleCreateWithoutDictionaryInput[] | ExampleUncheckedCreateWithoutDictionaryInput[]
    connectOrCreate?: ExampleCreateOrConnectWithoutDictionaryInput | ExampleCreateOrConnectWithoutDictionaryInput[]
    upsert?: ExampleUpsertWithWhereUniqueWithoutDictionaryInput | ExampleUpsertWithWhereUniqueWithoutDictionaryInput[]
    createMany?: ExampleCreateManyDictionaryInputEnvelope
    set?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    disconnect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    delete?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    connect?: ExampleWhereUniqueInput | ExampleWhereUniqueInput[]
    update?: ExampleUpdateWithWhereUniqueWithoutDictionaryInput | ExampleUpdateWithWhereUniqueWithoutDictionaryInput[]
    updateMany?: ExampleUpdateManyWithWhereWithoutDictionaryInput | ExampleUpdateManyWithWhereWithoutDictionaryInput[]
    deleteMany?: ExampleScalarWhereInput | ExampleScalarWhereInput[]
  }

  export type WordStatsUncheckedUpdateOneWithoutDictionaryNestedInput = {
    create?: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
    connectOrCreate?: WordStatsCreateOrConnectWithoutDictionaryInput
    upsert?: WordStatsUpsertWithoutDictionaryInput
    disconnect?: WordStatsWhereInput | boolean
    delete?: WordStatsWhereInput | boolean
    connect?: WordStatsWhereUniqueInput
    update?: XOR<XOR<WordStatsUpdateToOneWithWhereWithoutDictionaryInput, WordStatsUpdateWithoutDictionaryInput>, WordStatsUncheckedUpdateWithoutDictionaryInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DictionaryCreateNestedOneWithoutStatsInput = {
    create?: XOR<DictionaryCreateWithoutStatsInput, DictionaryUncheckedCreateWithoutStatsInput>
    connectOrCreate?: DictionaryCreateOrConnectWithoutStatsInput
    connect?: DictionaryWhereUniqueInput
  }

  export type DictionaryUpdateOneRequiredWithoutStatsNestedInput = {
    create?: XOR<DictionaryCreateWithoutStatsInput, DictionaryUncheckedCreateWithoutStatsInput>
    connectOrCreate?: DictionaryCreateOrConnectWithoutStatsInput
    upsert?: DictionaryUpsertWithoutStatsInput
    connect?: DictionaryWhereUniqueInput
    update?: XOR<XOR<DictionaryUpdateToOneWithWhereWithoutStatsInput, DictionaryUpdateWithoutStatsInput>, DictionaryUncheckedUpdateWithoutStatsInput>
  }

  export type DictionaryCreateNestedOneWithoutExamplesInput = {
    create?: XOR<DictionaryCreateWithoutExamplesInput, DictionaryUncheckedCreateWithoutExamplesInput>
    connectOrCreate?: DictionaryCreateOrConnectWithoutExamplesInput
    connect?: DictionaryWhereUniqueInput
  }

  export type DictionaryUpdateOneRequiredWithoutExamplesNestedInput = {
    create?: XOR<DictionaryCreateWithoutExamplesInput, DictionaryUncheckedCreateWithoutExamplesInput>
    connectOrCreate?: DictionaryCreateOrConnectWithoutExamplesInput
    upsert?: DictionaryUpsertWithoutExamplesInput
    connect?: DictionaryWhereUniqueInput
    update?: XOR<XOR<DictionaryUpdateToOneWithWhereWithoutExamplesInput, DictionaryUpdateWithoutExamplesInput>, DictionaryUncheckedUpdateWithoutExamplesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ExampleCreateWithoutDictionaryInput = {
    text: string
  }

  export type ExampleUncheckedCreateWithoutDictionaryInput = {
    id?: number
    text: string
  }

  export type ExampleCreateOrConnectWithoutDictionaryInput = {
    where: ExampleWhereUniqueInput
    create: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput>
  }

  export type ExampleCreateManyDictionaryInputEnvelope = {
    data: ExampleCreateManyDictionaryInput | ExampleCreateManyDictionaryInput[]
    skipDuplicates?: boolean
  }

  export type WordStatsCreateWithoutDictionaryInput = {
    id?: string
    russian: string
    pronunciation: string
    count?: number
    lastUsed?: Date | string
  }

  export type WordStatsUncheckedCreateWithoutDictionaryInput = {
    id?: string
    russian: string
    pronunciation: string
    count?: number
    lastUsed?: Date | string
  }

  export type WordStatsCreateOrConnectWithoutDictionaryInput = {
    where: WordStatsWhereUniqueInput
    create: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
  }

  export type ExampleUpsertWithWhereUniqueWithoutDictionaryInput = {
    where: ExampleWhereUniqueInput
    update: XOR<ExampleUpdateWithoutDictionaryInput, ExampleUncheckedUpdateWithoutDictionaryInput>
    create: XOR<ExampleCreateWithoutDictionaryInput, ExampleUncheckedCreateWithoutDictionaryInput>
  }

  export type ExampleUpdateWithWhereUniqueWithoutDictionaryInput = {
    where: ExampleWhereUniqueInput
    data: XOR<ExampleUpdateWithoutDictionaryInput, ExampleUncheckedUpdateWithoutDictionaryInput>
  }

  export type ExampleUpdateManyWithWhereWithoutDictionaryInput = {
    where: ExampleScalarWhereInput
    data: XOR<ExampleUpdateManyMutationInput, ExampleUncheckedUpdateManyWithoutDictionaryInput>
  }

  export type ExampleScalarWhereInput = {
    AND?: ExampleScalarWhereInput | ExampleScalarWhereInput[]
    OR?: ExampleScalarWhereInput[]
    NOT?: ExampleScalarWhereInput | ExampleScalarWhereInput[]
    id?: IntFilter<"Example"> | number
    text?: StringFilter<"Example"> | string
    dictionaryId?: StringFilter<"Example"> | string
  }

  export type WordStatsUpsertWithoutDictionaryInput = {
    update: XOR<WordStatsUpdateWithoutDictionaryInput, WordStatsUncheckedUpdateWithoutDictionaryInput>
    create: XOR<WordStatsCreateWithoutDictionaryInput, WordStatsUncheckedCreateWithoutDictionaryInput>
    where?: WordStatsWhereInput
  }

  export type WordStatsUpdateToOneWithWhereWithoutDictionaryInput = {
    where?: WordStatsWhereInput
    data: XOR<WordStatsUpdateWithoutDictionaryInput, WordStatsUncheckedUpdateWithoutDictionaryInput>
  }

  export type WordStatsUpdateWithoutDictionaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WordStatsUncheckedUpdateWithoutDictionaryInput = {
    id?: StringFieldUpdateOperationsInput | string
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    lastUsed?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DictionaryCreateWithoutStatsInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    examples?: ExampleCreateNestedManyWithoutDictionaryInput
  }

  export type DictionaryUncheckedCreateWithoutStatsInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    examples?: ExampleUncheckedCreateNestedManyWithoutDictionaryInput
  }

  export type DictionaryCreateOrConnectWithoutStatsInput = {
    where: DictionaryWhereUniqueInput
    create: XOR<DictionaryCreateWithoutStatsInput, DictionaryUncheckedCreateWithoutStatsInput>
  }

  export type DictionaryUpsertWithoutStatsInput = {
    update: XOR<DictionaryUpdateWithoutStatsInput, DictionaryUncheckedUpdateWithoutStatsInput>
    create: XOR<DictionaryCreateWithoutStatsInput, DictionaryUncheckedCreateWithoutStatsInput>
    where?: DictionaryWhereInput
  }

  export type DictionaryUpdateToOneWithWhereWithoutStatsInput = {
    where?: DictionaryWhereInput
    data: XOR<DictionaryUpdateWithoutStatsInput, DictionaryUncheckedUpdateWithoutStatsInput>
  }

  export type DictionaryUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examples?: ExampleUpdateManyWithoutDictionaryNestedInput
  }

  export type DictionaryUncheckedUpdateWithoutStatsInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    examples?: ExampleUncheckedUpdateManyWithoutDictionaryNestedInput
  }

  export type DictionaryCreateWithoutExamplesInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: WordStatsCreateNestedOneWithoutDictionaryInput
  }

  export type DictionaryUncheckedCreateWithoutExamplesInput = {
    id?: string
    korean: string
    english?: string | null
    russian: string
    pronunciation: string
    definition?: string | null
    definition_ru?: string | null
    category?: string
    difficulty?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    stats?: WordStatsUncheckedCreateNestedOneWithoutDictionaryInput
  }

  export type DictionaryCreateOrConnectWithoutExamplesInput = {
    where: DictionaryWhereUniqueInput
    create: XOR<DictionaryCreateWithoutExamplesInput, DictionaryUncheckedCreateWithoutExamplesInput>
  }

  export type DictionaryUpsertWithoutExamplesInput = {
    update: XOR<DictionaryUpdateWithoutExamplesInput, DictionaryUncheckedUpdateWithoutExamplesInput>
    create: XOR<DictionaryCreateWithoutExamplesInput, DictionaryUncheckedCreateWithoutExamplesInput>
    where?: DictionaryWhereInput
  }

  export type DictionaryUpdateToOneWithWhereWithoutExamplesInput = {
    where?: DictionaryWhereInput
    data: XOR<DictionaryUpdateWithoutExamplesInput, DictionaryUncheckedUpdateWithoutExamplesInput>
  }

  export type DictionaryUpdateWithoutExamplesInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: WordStatsUpdateOneWithoutDictionaryNestedInput
  }

  export type DictionaryUncheckedUpdateWithoutExamplesInput = {
    id?: StringFieldUpdateOperationsInput | string
    korean?: StringFieldUpdateOperationsInput | string
    english?: NullableStringFieldUpdateOperationsInput | string | null
    russian?: StringFieldUpdateOperationsInput | string
    pronunciation?: StringFieldUpdateOperationsInput | string
    definition?: NullableStringFieldUpdateOperationsInput | string | null
    definition_ru?: NullableStringFieldUpdateOperationsInput | string | null
    category?: StringFieldUpdateOperationsInput | string
    difficulty?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    stats?: WordStatsUncheckedUpdateOneWithoutDictionaryNestedInput
  }

  export type ExampleCreateManyDictionaryInput = {
    id?: number
    text: string
  }

  export type ExampleUpdateWithoutDictionaryInput = {
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ExampleUncheckedUpdateWithoutDictionaryInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ExampleUncheckedUpdateManyWithoutDictionaryInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}