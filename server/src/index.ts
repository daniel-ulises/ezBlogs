import { createConnection } from "typeorm";
import "dotenv/config";
import app from "./app";
import { __PROD__ } from "./constants";
import { Users } from "./entities/Users";
import { Posts } from "./entities/Posts";

const main = async () => {
  const PORT = process.env.PORT || 3001;

  await createConnection({
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
    synchronize: true,
    cli: {
      migrationsDir: "./migrations",
    },
  })
    .then(() => console.log("Connected to the database"))
    .then(() =>
      app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
    )
    .catch(err => console.log(err));
};

main();
