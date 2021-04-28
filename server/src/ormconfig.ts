import "dotenv/config";
import { __PROD__ } from "./constants";
import { Posts } from "./entities/Posts";
import { Users } from "./entities/Users";

export = {
  type: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database: process.env.DB_DATABASE,
  logging: !__PROD__,
  entities: [Users, Posts],
  migrations: ["./migrations/"],
  migrationsRun: true,
  cli: {
    migrationsDir: "./src/migrations",
  },
};
