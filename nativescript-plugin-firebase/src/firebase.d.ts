/**
 * The allowed values for LoginOptions.type.
 */
export enum LoginType {
  /**
   * No further data is required.
   */
  ANONYMOUS,
  /**
   * This requires you to pass in the 'passwordOptions' as well.
   */
  PASSWORD,
  /**
   * This requires you to add the 'phoneOptions' as well.
   */
  PHONE,
  /**
   * This requires you to pass either an authentication token generated by your backend server
   * or the tokenProviderFn function that returns a promise to provide the token (see 'customOptions').
   * See: https://firebase.google.com/docs/auth/server
   */
  CUSTOM,
  /**
   * This requires you to setup Facebook Auth in the Firebase console,
   * as well as uncommenting the SDK includes in include.gradle (Android) and Podfile (iOS).
   * You can pass in an optional 'facebookOptions' object to override the default scopes.
   */
  FACEBOOK,
  /**
   * This requires you to setup Google Sign In in the Firebase console,
   * as well as uncommenting the SDK includes in include.gradle (Android) and Podfile (iOS).
   * You can pass in an optional 'googleOptions' object to set a 'hostedDomain'.
   */
  GOOGLE,
  /**
   * This requires you to pass in the 'emailLinkOptions' as well.
   * Note that 'Firebase Dynamic Links' must be enabled for this login type to work.
   */
  EMAIL_LINK
}

export enum LogComplexEventTypeParameter {
  STRING,
  INT,
  FLOAT,
  DOUBLE,
  LONG,
  ARRAY,
  BOOLEAN
}

/**
 * The allowed values for QueryOptions.orderBy.type.
 */
export enum QueryOrderByType {
  KEY,
  VALUE,
  CHILD,
  PRIORITY
}

/**
 * The allowed values for QueryOptions.range.type.
 */
export enum QueryRangeType {
  START_AT,
  END_AT,
  EQUAL_TO
}

/**
 * The allowed values for QueryOptions.limit.type.
 */
export enum QueryLimitType {
  FIRST,
  LAST
}

export enum ServerValue {
  /**
   * When for instance using setValue you can set a timestamp property to this placeholder value.
   * Example:
   *   updateTs: firebase.ServerValue.TIMESTAMP
   */
  TIMESTAMP
}

export interface MessagingOptions {
  /**
   * For Messaging, either pass in this callback function here, or use addOnMessageReceivedCallback.
   */
  onPushTokenReceivedCallback?: (token: string) => void;

  /**
   * For Messaging, either pass in this callback function here, or use addOnPushTokenReceivedCallback.
   */
  onMessageReceivedCallback?: (message: Message) => void;

  /**
   * For Messaging (Push Notifications). Whether you want this plugin to automatically display the notifications or just notify the callback.
   * Currently used on iOS only. Default true.
   */
  showNotifications?: boolean;

  /**
   * For Messaging (Push Notifications). Whether you want this plugin to always handle the notifications when the app is in foreground.
   * Currently used on iOS only. Default false.
   */
  showNotificationsWhenInForeground?: boolean;

  /**
   * Automatically clear the badges on starting.
   * Currently used on iOS only. Default true.
   */
  autoClearBadge?: boolean;
}

/**
 * The options object passed into the init function.
 */
export interface InitOptions extends MessagingOptions {
  /**
   * Allow the app to send analytics data to Firebase.
   * Can also be set later with analytics.setAnalyticsCollectionEnabled.
   * Default true.
   */
  analyticsCollectionEnabled?: boolean;

  /**
   * Allow the app to collect Crashlytics data and send it to Firebase.
   * Can also be set later with crashlytics.setCrashReportingEnabled.
   * Only useful in case it was disabled in AndroidManfifest.xml and/or Info.plist,
   * see https://firebase.google.com/docs/crashlytics/customize-crash-reports
   */
  crashlyticsCollectionEnabled?: boolean;

  /**
   * Allow disk persistence. Default true for Firestore, false for regular Firebase DB.
   */
  persist?: boolean;

  /**
   * Get notified when the user is logged in.
   */
  onAuthStateChanged?: (data: AuthStateData) => void;

  /**
   * Attempt to sign out before initializing, useful in case previous
   * project token is cached which leads to following type of error:
   *   "[FirebaseDatabase] Authentication failed: invalid_token ..."
   * Default false.
   */
  iOSEmulatorFlush?: boolean;

  /**
   * For Firebase Storage you can pass in something like 'gs://n-plugin-test.appspot.com'
   * here so we can cache it. Otherwise pass in the 'bucket' param when using Storage features.
   * Can be found in the firebase console.
   */
  storageBucket?: string;

  /**
   * Get notified when a dynamic link was used to launch the app. Alternatively use addOnDynamicLinkReceivedCallback.
   * TODO iOS seems to return an object; not a string
   */
  onDynamicLinkCallback?: (data: DynamicLinkData) => void;
}

export interface QueryRangeOption {
  type: QueryRangeType;
  value: any;
}

/**
 * The options object passed into the query function.
 */
export interface QueryOptions {
  /**
   * How you'd like to sort the query result.
   */
  orderBy: {
    type: QueryOrderByType;
    /**
     * mandatory when type is QueryOrderByType.CHILD
     */
    value?: string;
  };

  /**
   * You can further restrict the returned results by specifying restrictions.
   * Need more than one range restriction? Use 'ranges' instead.
   */
  range?: QueryRangeOption;

  /**
   * Same as 'range', but for a 'chain of ranges'.
   * You can further restrict the returned results by specifying restrictions.
   */
  ranges?: QueryRangeOption[];

  /**
   * You can limit the number of returned rows if you want to.
   */
  limit?: {
    type: QueryLimitType;
    value: number;
  };

  /**
   * Set this to true if you don't want to listen for any future updates,
   * but just want to retrieve the current value.
   * You can also use this to check if certain data is in the database.
   * Default false.
   */
  singleEvent?: boolean;
}

export interface GetAuthTokenOptions {
  /**
   * Default false.
   */
  forceRefresh?: boolean;
}

export interface IdTokenResult {
  token: string;
  claims: { [key: string]: any; };
  signInProvider: string;
  expirationTime: number;
  issuedAtTime: number;
  authTime: number;
}

export interface Provider {
  id: string;
  token?: string;
}

export interface FirebasePasswordLoginOptions {
  email: string;
  password: string;
}

export interface FirebaseEmailLinkActionCodeSettings {
  url: string;
  iOS?: {
    bundleId: string;
  };
  android?: {
    packageName: string;
    installApp?: false;
    minimumVersion?: string;
  };
}

export interface FirebaseEmailLinkLoginOptions extends FirebaseEmailLinkActionCodeSettings {
  email: string;
}

export interface FirebasePhoneLoginOptions {
  phoneNumber: string;
  /**
   * The message show to the user that prompts him to enter the received verification code.
   * Default: "Verification code".
   */
  verificationPrompt?: string;
}

export interface FirebaseGoogleLoginOptions {
  hostedDomain?: string;
  /**
   * You can add scopes like "https://www.googleapis.com/auth/contacts.readonly" and "https://www.googleapis.com/auth/user.birthday.read"
   *
   * Default: ["profile", "email"]
   */
  scopes?: Array<string>;
}

export interface FirebaseFacebookLoginOptions {
  /**
   * Default: ["public_profile", "email"]
   */
  scopes?: Array<string>;
}

export interface FirebaseCustomLoginOptions {
  /**
   * The JSON Web Token (JWT) to use for authentication.
   * Either specify this, or 'tokenProviderFn'.
   * See: https://firebase.google.com/docs/auth/server
   */
  token?: string;
  /**
   * A function that returns a promise with the  JSON Web Token (JWT) to use for authentication.
   * Either specify this, or 'token'.
   * See: https://firebase.google.com/docs/auth/server
   */
  tokenProviderFn?: () => Promise<String>;
}

export interface LoginIOSOptions {
  controller?: any;
}

/**
 * The options object passed into the login function.
 */
export interface LoginOptions {
  type: LoginType;
  passwordOptions?: FirebasePasswordLoginOptions;
  emailLinkOptions?: FirebaseEmailLinkLoginOptions;
  phoneOptions?: FirebasePhoneLoginOptions;
  googleOptions?: FirebaseGoogleLoginOptions;
  facebookOptions?: FirebaseFacebookLoginOptions;
  customOptions?: FirebaseCustomLoginOptions;
  ios?: LoginIOSOptions;

  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  email?: string;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  password?: string;
  /**
   * @deprecated Please use the 'customOptions?: FirebaseCustomLoginOptions' object instead.
   */
  token?: string;
  /**
   * @deprecated Please use the 'customOptions?: FirebaseCustomLoginOptions' object instead.
   */
  tokenProviderFn?: () => Promise<String>;
  /**
   * @deprecated Please use the 'facebookOptions?: FirebaseFacebookLoginOptions' object instead.
   */
  scope?: string[];
}

export interface ReauthenticateOptions {
  type: LoginType;
  passwordOptions?: FirebasePasswordLoginOptions;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  email?: string;
  /**
   * @deprecated Please use the 'passwordOptions?: FirebasePasswordLoginOptions' object instead.
   */
  password?: string;
}

type ActionCodeSettings = {
  url: string;
  handleCodeInApp?: boolean;
  android?: {
    installApp?: boolean;
    minimumVersion?: string;
    packageName: string;
  };
  iOS?: {
    bundleId: string;
    dynamicLinkDomain?: string;
  };
};

/**
 * The returned object from the login function.
 */
export interface User {
  uid: string;
  email?: string;
  emailVerified: boolean;
  displayName?: string;
  phoneNumber?: string;
  anonymous: boolean;
  isAnonymous: boolean; // This is used by the web API
  providers: Array<Provider>;
  photoURL?: string;
  metadata: UserMetadata;
  additionalUserInfo?: AdditionalUserInfo;

  /** iOS only */
  refreshToken?: string;

  getIdToken(forceRefresh?: boolean): Promise<string>;

  getIdTokenResult(forceRefresh?: boolean): Promise<IdTokenResult>;

  sendEmailVerification(actionCodeSettings?: ActionCodeSettings): Promise<void>;
}

/**
 * The metadata of the user
 */
export interface UserMetadata {
  creationTimestamp: Date;
  lastSignInTimestamp: Date;
}

/**
 * Contains additional user information
 */
export interface AdditionalUserInfo {
  profile: Map<string, any>;
  providerId: string;
  username: string;
  isNewUser: boolean;
}

/**
 * The returned object from the push function.
 */
export interface PushResult {
  key: string;
}

/**
 * The returned object from the addEventListener functions.
 */
export interface AddEventListenerResult {
  path: string;
  listeners: Array<any>;
}

/**
 * The options object passed into the createUser function.
 */
export interface CreateUserOptions {
  email: string;
  password: string;
}

/**
 * The options object passed into the updateProfile function.
 */
export interface UpdateProfileOptions {
  displayName?: string;
  photoURL?: string;
}

/**
 * The returned object in the callback handlers
 * of the addChildEventListener and addValueEventListener functions.
 */
export interface FBData {
  type: string;
  key: string;
  value: any;
}

export interface FBDataSingleEvent extends FBData {
  children?: Array<any>;
}

export interface FBErrorData {
  error: string;
}

export interface AuthStateData {
  loggedIn?: boolean;
  user?: User;
}

export interface AuthStateChangeListener {
  onAuthStateChanged: (data: AuthStateData) => void;
  thisArg?: any;
}

export interface RemoteConfigProperty {
  key: string;
  default: any;
}

export interface GetRemoteConfigOptions {
  /**
   * Fetch new results from the server more often.
   * Default false.
   */
  developerMode?: boolean;
  /**
   * The number of seconds before retrieving fresh state from the server.
   * Default 12 hours.
   */
  cacheExpirationSeconds?: number;
  /**
   * The configuration properties to retrieve for your app. Specify as:
   *  properties: [{
   *    key: "holiday_promo_enabled",
   *    default: false
   *  }, ..]
   */
  properties: Array<RemoteConfigProperty>;
}

/**
 * The returned object from the getRemoteConfig function.
 */
export interface GetRemoteConfigResult {
  /**
   * The date the data was last refreshed from the server.
   * Should honor the 'cacheExpirationSeconds' you passed in previously.
   */
  lastFetch: Date;
  /**
   * The result may be throttled when retrieved from the server.
   * Even when the cache has expired. And it's just FYI really.
   */
  throttled: boolean;
  /**
   * A JS Object with properties and values.
   * If you previously requested keys ["foo", "is_enabled"] then this will be like:
   *   properties: {
   *     foo: "bar",
   *     is_enabled: true
   *   }
   */
  properties: Object;
}

export interface DynamicLinkData {
  url: string;
  minimumAppVersion: string;
}

/**
 * The returned object in the callback handler of the addOnMessageReceivedCallback function.
 *
 * Note that any custom data you send from your server will be available as
 * key/value properties on the Message object as well.
 */
export interface Message {
  /**
   * Indicated whether or not the notification was received while the app was in the foreground.
   */
  foreground: boolean;
  /**
   * The main text shown in the notificiation.
   * Not available on Android when the notification was received in the background.
   */
  body?: string;
  /**
   * Optional title, shown above the body in the notification.
   * Not available on Android when the notification was received in the background.
   */
  title?: string;
  /**
   * Any other data you may have added to the notification.
   */
  data: any;
}

export function init(options?: InitOptions): Promise<any>;

// Database
export interface OnDisconnect {
  cancel(): Promise<any>;

  remove(): Promise<any>;

  set(value: any): Promise<any>;

  setWithPriority(
      value: any,
      priority: number | string
  ): Promise<any>;

  update(values: Object): Promise<any>;
}

export interface DataSnapshot {
  key: string;
  ref: any; // TODO: Type it so that it returns a databaseReference.
  child(path: string): DataSnapshot;

  exists(): boolean;

  forEach(action: (snapshot: DataSnapshot) => any): boolean;

  getPriority(): string | number | null;

  hasChild(path: string): boolean;

  hasChildren(): boolean;

  numChildren(): number;

  toJSON(): Object;

  val(): any;
}

export interface FirebaseQueryResult {
  type: string;
  key: string;
  value: any;
}

export type Unsubscribe = () => void;

export function transaction(path: string, transactionUpdate: (a: any) => any,
                            onComplete?: (error: Error | null, committed: boolean, dataSnapshot: DataSnapshot) => any): Promise<any>;

export function push(path: string, value: any): Promise<PushResult>;

export function getValue(path: string): Promise<any>;

export function setValue(path: string, value: any): Promise<any>;

export function update(path: string, value: any): Promise<any>;

export function remove(path: string): Promise<any>;

export function query(onValueEvent: (data: FBData | FBErrorData) => void, path: string, options: QueryOptions): Promise<any>;

export function addChildEventListener(onChildEvent: (data: FBData) => void, path: string): Promise<AddEventListenerResult>;

export function addValueEventListener(onValueEvent: (data: FBData) => void, path: string): Promise<AddEventListenerResult>;

export function removeEventListeners(listeners: Array<any>, path: string): Promise<any>;

export function onDisconnect(path: string): OnDisconnect;

export function enableLogging(logger?: boolean | ((a: string) => any), persistent?: boolean);

/**
 * Tells the client to keep its local cache in sync with the server automatically.
 */
export function keepInSync(path: string, switchOn: boolean): Promise<any>;

export namespace dynamicLinks {
  export enum MATCH_CONFIDENCE {
    WEAK,
    STRONG
  }

  export interface DynamicLinkCallbackData {
    url: string;
    matchConfidence?: MATCH_CONFIDENCE;
    minimumAppVersion?: string;
  }
}

export namespace firestore {
  export type DocumentData = { [field: string]: any };
  export type WhereFilterOp = '<' | '<=' | '==' | '>=' | '>' | 'array-contains';
  export type OrderByDirection = 'desc' | 'asc';

  export interface GeoPoint {
    longitude: number;
    latitude: number;
  }

  export function GeoPoint(latitude: number, longitude: number): GeoPoint;

  export interface Settings {
    /** The hostname to connect to. */
    host?: string;
    /** Whether to use SSL when connecting. */
    ssl?: boolean;

    /**
     * Specifies whether to use `Timestamp` objects for timestamp fields in
     * `DocumentSnapshot`s. This is enabled by default and should not be
     * disabled.
     *
     * Previously, Firestore returned timestamp fields as `Date` but `Date`
     * only supports millisecond precision, which leads to truncation and
     * causes unexpected behavior when using a timestamp from a snapshot as a
     * part of a subsequent query.
     *
     * So now Firestore returns `Timestamp` values instead of `Date`, avoiding
     * this kind of problem.
     *
     * To opt into the old behavior of returning `Date` objects, you can
     * temporarily set `timestampsInSnapshots` to false.
     *
     * @deprecated This setting will be removed in a future release. You should
     * update your code to expect `Timestamp` objects and stop using the
     * `timestampsInSnapshots` setting.
     */
    timestampsInSnapshots?: boolean;

    /**
     * An approximate cache size threshold for the on-disk data. If the cache grows beyond this
     * size, Firestore will start removing data that hasn't been recently used. The size is not a
     * guarantee that the cache will stay below that size, only that if the cache exceeds the given
     * size, cleanup will be attempted.
     *
     * The default value is 40 MB. The threshold must be set to at least 1 MB, and can be set to
     * CACHE_SIZE_UNLIMITED to disable garbage collection.
     */
    cacheSizeBytes?: number;
  }

  /**
   * Specifies custom settings to be used to configure the `Firestore`
   * instance. Must be set before invoking any other methods.
   *
   * @param settings The settings to use.
   */
  export function settings(settings: Settings): void;

  export interface SetOptions {
    merge?: boolean;
  }

  export interface SnapshotMetadata {
    /**
     * True if the snapshot contains the result of local writes (e.g. set() or
     * update() calls) that have not yet been committed to the backend.
     * If your listener has opted into metadata updates (via
     * `DocumentListenOptions` or `QueryListenOptions`) you will receive another
     * snapshot with `hasPendingWrites` equal to false once the writes have been
     * committed to the backend.
     */
    readonly hasPendingWrites: boolean;

    /**
     * True if the snapshot was created from cached data rather than
     * guaranteed up-to-date server data. If your listener has opted into
     * metadata updates (via `DocumentListenOptions` or `QueryListenOptions`)
     * you will receive another snapshot with `fromCache` equal to false once
     * the client has received up-to-date data from the backend.
     */
    readonly fromCache: boolean;
  }

  export interface DocumentSnapshot {
    ios?: any;
    /* FIRDocumentSnapshot */
    android?: any;
    /* com.google.firebase.firestore.DocumentSnapshot */
    id: string;
    exists: boolean;
    ref: DocumentReference;

    /**
     * Included when includeMetadataChanges is true.
     */
    readonly metadata?: SnapshotMetadata;

    data(): DocumentData;
  }

  export interface SnapshotListenOptions {
    /**
     * Include a change even if only the metadata of the query or of a document changed.
     * Default false.
     */
    readonly includeMetadataChanges?: boolean;
  }

  export interface GetOptions {
    /**
     * Describes whether we should get from server or cache.
     *
     * Setting to 'default' (or not setting at all), causes Firestore to try to
     * retrieve an up-to-date (server-retrieved) snapshot, but fall back to
     * returning cached data if the server can't be reached.
     *
     * Setting to 'server' causes Firestore to avoid the cache, generating an
     * error if the server cannot be reached. Note that the cache will still be
     * updated if the server request succeeds. Also note that latency-compensation
     * still takes effect, so any pending write operations will be visible in the
     * returned data (merged into the server-provided data).
     *
     * Setting to 'cache' causes Firestore to immediately return a value from the
     * cache, ignoring the server completely (implying that the returned value
     * may be stale with respect to the value on the server.) If there is no data
     * in the cache to satisfy the `get()` call, `DocumentReference.get()` will
     * return an error and `QuerySnapshot.get()` will return an empty
     * `QuerySnapshot` with no documents.
     */
    source?: 'default' | 'server' | 'cache';
  }

  export interface DocumentReference {
    readonly discriminator: "docRef";

    readonly id: string;

    /**
     * A reference to the Collection to which this DocumentReference belongs.
     */
    readonly parent: CollectionReference;

    readonly path: string;

    collection: (collectionPath: string) => CollectionReference;

    set: (document: any, options?: SetOptions) => Promise<void>;

    get: (options?: GetOptions) => Promise<DocumentSnapshot>;

    update: (document: any) => Promise<void>;

    delete: () => Promise<void>;

    onSnapshot(optionsOrCallback: SnapshotListenOptions | ((snapshot: DocumentSnapshot) => void), callbackOrOnError?: (snapshot: DocumentSnapshot | Error) => void, onError?: (error: Error) => void): () => void;

    android?: any;

    ios?: any;
  }

  export interface Query {
    get(options?: GetOptions): Promise<QuerySnapshot>;

    where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;

    orderBy(fieldPath: string, directionStr: firestore.OrderByDirection): Query;

    limit(limit: number): Query;

    onSnapshot(optionsOrCallback: SnapshotListenOptions | ((snapshot: QuerySnapshot) => void), callbackOrOnError?: (snapshotOrError: QuerySnapshot | Error) => void, onError?: (error: Error) => void): () => void;

    startAt(snapshot: DocumentSnapshot): Query;

    startAfter(snapshot: DocumentSnapshot): Query;

    endAt(snapshot: DocumentSnapshot): Query;

    endBefore(snapshot: DocumentSnapshot): Query;
  }

  export interface CollectionGroup {
    where(fieldPath: string, opStr: WhereFilterOp, value: any): Query;
  }

  export interface CollectionReference extends Query {
    readonly id: string;

    /**
     * A reference to the containing Document if this is a subcollection, else null.
     */
    readonly parent: DocumentReference | null;

    doc(documentPath?: string): DocumentReference;

    add(data: DocumentData): Promise<DocumentReference>;
  }

  export type UpdateData = { [fieldPath: string]: any };

  export class FieldPath {
    /**
     * Creates a FieldPath from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames A list of field names.
     */
    constructor(...fieldNames: string[]);

    /**
     * Returns a special sentinel FieldPath to refer to the ID of a document.
     * It can be used in queries to sort or filter by the document ID.
     */
    static documentId(): FieldPath;
  }

  export interface Transaction {
    get(documentRef: DocumentReference): DocumentSnapshot;

    set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): Transaction;

    update(documentRef: DocumentReference, data: UpdateData): Transaction;

    update(documentRef: DocumentReference, field: string | FieldPath, value: any, ...moreFieldsAndValues: any[]): Transaction;

    delete(documentRef: DocumentReference): Transaction;
  }

  export interface WriteBatch {
    set(documentRef: DocumentReference, data: DocumentData, options?: SetOptions): WriteBatch;

    update(documentRef: DocumentReference, data: UpdateData): WriteBatch;

    update(documentRef: DocumentReference, field: string | FieldPath, value: any, ...moreFieldsAndValues: any[]): WriteBatch;

    delete(documentRef: DocumentReference): WriteBatch;

    commit(): Promise<void>;
  }

  export type FieldValueType = "ARRAY_UNION" | "ARRAY_REMOVE" | "INCREMENT";

  export class FieldValue {
    constructor(type: FieldValueType, value: any);

    static serverTimestamp: () => "SERVER_TIMESTAMP";
    static delete: () => "DELETE_FIELD";
    static arrayUnion: (...elements: any[]) => FieldValue;
    static arrayRemove: (...elements: any[]) => FieldValue;
    static increment: (n: number) => FieldValue;
  }

  export interface SnapshotListenOptions {
    readonly includeMetadataChanges?: boolean;
  }

  export interface SnapshotOptions {
    /**
     * If set, controls the return value for server timestamps that have not yet
     * been set to their final value.
     *
     * By specifying 'estimate', pending server timestamps return an estimate
     * based on the local clock. This estimate will differ from the final value
     * and cause these values to change once the server result becomes available.
     *
     * By specifying 'previous', pending timestamps will be ignored and return
     * their previous value instead.
     *
     * If omitted or set to 'none', `null` will be returned by default until the
     * server value becomes available.
     */
    readonly serverTimestamps?: 'estimate' | 'previous' | 'none';
  }

  export interface QueryDocumentSnapshot extends firestore.DocumentSnapshot {
    /**
     * Retrieves all fields in the document as an Object.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options An options object to configure how data is retrieved from
     * the snapshot (e.g. the desired behavior for server timestamps that have
     * not yet been set to their final value).
     * @return An Object containing all fields in the document.
     */
    data(options?: SnapshotOptions): DocumentData;
  }

  export type DocumentChangeType = 'added' | 'removed' | 'modified';

  export interface DocumentChange {
    readonly type: DocumentChangeType;

    /** The document affected by this change. */
    readonly doc: QueryDocumentSnapshot;

    /**
     * The index of the changed document in the result set immediately prior to
     * this DocumentChange (i.e. supposing that all prior DocumentChange objects
     * have been applied). Is -1 for 'added' events.
     */
    readonly oldIndex: number;

    /**
     * The index of the changed document in the result set immediately after
     * this DocumentChange (i.e. supposing that all prior DocumentChange
     * objects and the current DocumentChange object have been applied).
     * Is -1 for 'removed' events.
     */
    readonly newIndex: number;
  }

  export interface QuerySnapshot {
    docSnapshots: firestore.DocumentSnapshot[];
    docs: firestore.QueryDocumentSnapshot[];

    /**
     * Included when includeMetadataChanges is true.
     */
    readonly metadata: SnapshotMetadata;

    docChanges(options?: SnapshotListenOptions): DocumentChange[];

    forEach(callback: (result: DocumentSnapshot) => void, thisArg?: any): void;
  }

  function collection(collectionPath: string): CollectionReference;

  function collectionGroup(id: string): CollectionGroup;

  function doc(collectionPath: string, documentPath?: string): DocumentReference;

  function docRef(documentPath: string): DocumentReference;

  function add(collectionPath: string, documentData: any): Promise<DocumentReference>;

  function set(collectionPath: string, documentPath: string, document: any, options?: any): Promise<void>;

  function getCollection(collectionPath: string, options?: GetOptions): Promise<QuerySnapshot>;

  function getDocument(collectionPath: string, documentPath: string, options?: GetOptions): Promise<DocumentSnapshot>;

  function update(collectionPath: string, documentPath: string, document: any): Promise<void>;

  function runTransaction(updateFunction: (transaction: firestore.Transaction) => Promise<any>): Promise<void>;

  function batch(): firestore.WriteBatch;

  function clearPersistence(): Promise<void>;
}

export namespace functions {
  export type SupportedRegions = "us-central1" | "us-east1" | "us-east4" | "europe-west1" | "europe-west2" | "asia-east2" | "asia-northeast1";

  export type HttpsCallable<I, O> = (callableData: I) => Promise<O>;

  export function httpsCallable<I, O>(callableFunctionName: string, region?: SupportedRegions): HttpsCallable<I, O>;
}

// Auth
export function login(options: LoginOptions): Promise<User>;

export function reauthenticate(options: ReauthenticateOptions): Promise<any>;

export function reloadUser(): Promise<void>;

export function getAuthToken(option: GetAuthTokenOptions): Promise<IdTokenResult>;

export function logout(): Promise<any>;

export function unlink(providerId: string): Promise<User>;

export function fetchSignInMethodsForEmail(email: string): Promise<Array<string>>;

export function sendEmailVerification(actionCodeSettings?: ActionCodeSettings): Promise<any>;

export function createUser(options: CreateUserOptions): Promise<User>;

export function deleteUser(): Promise<any>;

export function updateProfile(options: UpdateProfileOptions): Promise<any>;

export function sendPasswordResetEmail(email: string): Promise<void>;

export function updateEmail(newEmail: string): Promise<void>;

export function updatePassword(newPassword: string): Promise<void>;

export function addAuthStateListener(listener: AuthStateChangeListener): boolean;

export function removeAuthStateListener(listener: AuthStateChangeListener): boolean;

export function hasAuthStateListener(listener: AuthStateChangeListener): boolean;

export function getCurrentUser(): Promise<User>;

// Messaging
export function addOnMessageReceivedCallback(onMessageReceived: (data: Message) => void): Promise<any>;

export function addOnPushTokenReceivedCallback(onPushTokenReceived: (data: string) => void): Promise<any>;

export function registerForInteractivePush(model: any): void;

export function getCurrentPushToken(): Promise<string>;

export function registerForPushNotifications(options?: MessagingOptions): Promise<void>;

export function unregisterForPushNotifications(): Promise<void>;

export function subscribeToTopic(topicName): Promise<any>;

export function unsubscribeFromTopic(topicName): Promise<any>;

export function areNotificationsEnabled(): boolean;

// dynamic links
export function addOnDynamicLinkReceivedCallback(onDynamicLinkReceived: (callBackData: dynamicLinks.DynamicLinkCallbackData) => void): Promise<any>;

// remote config
export function getRemoteConfig(options: GetRemoteConfigOptions): Promise<GetRemoteConfigResult>;