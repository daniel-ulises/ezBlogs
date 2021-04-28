import { createConnection } from "typeorm";
import "dotenv/config";
import app from "./app";
import { __PROD__ } from "./constants";

const main = async () => {
  const PORT = process.env.PORT || 3001;

  await createConnection("default")
    .then(() => console.log("Connected to the database"))
    .then(() =>
      app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`))
    )
    .catch(err => console.log(err));
};

main();
