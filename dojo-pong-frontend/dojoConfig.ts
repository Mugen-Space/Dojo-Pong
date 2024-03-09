// import manifest from "../dojo-starter/target/dev/manifest.json";
import manifest from "../dojo-starter/target/dev/manifest.json";
// import manifest from "../d";
import { createDojoConfig } from "@dojoengine/core";

export const dojoConfig = createDojoConfig({
  manifest,
});
