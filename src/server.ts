import { app } from "./app";

const port = 3333;

app.listen({
   port,
   host: "0.0.0.0",
}).then(() => {
   console.log("http server is running on port:", port);
});
