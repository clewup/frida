import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    /*
     * Specify what prefix the client-side variables must have.
     * This is enforced both on type-level and at runtime.
     */
    clientPrefix: "NEXT_PUBLIC_",
    server: {
        APP_URL: z.string().min(1),
    },
    client: {
        NEXT_PUBLIC_APP_URL: z.string().min(1),
    },
    /**
     * What object holds the environment variables at runtime.
     * Often `process.env` or `import.meta.env`
     */
    runtimeEnv: process.env,
});