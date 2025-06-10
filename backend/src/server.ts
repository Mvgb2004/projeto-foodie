import { app } from "./app";

import { env } from "./lib/env/env-validator";

app.listen(env.PORT, () => {
	console.log("Server is running on port ", env.PORT);
});
