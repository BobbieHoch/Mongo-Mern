import { MongoClient, Db } from "mongodb/lib/db";

const atlasUri: string = process.env.ATLAS_URI || '';

const options: { useNewUrlParser: boolean; useUnifiedTopology: boolean } = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(atlasUri, options);

let _db: Db | undefined;

export const connectToServer = (callback: (err?: Error) => void): void => {
  client.connect((err: Error | undefined, db: MongoClient | undefined) => {
    // Verify we got a good "db" object
    if (db) {
      _db = db.db("employees");
      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
};

export const getDb = (): Db => {
  return _db!;
};
