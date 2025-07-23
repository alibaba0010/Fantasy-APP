import User from "../src/models/User";
import League from "../src/models/League";

export default async function migrate() {
  await User.syncIndexes();
  await League.syncIndexes();
  console.log("Indexes created for User and League");
}
