import autoImport from "unplugin-auto-import/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImport() {
  return autoImport({
    imports: ["vue", "vue-router", "pinia"],
    dts: false,
    resolvers: [ArcoResolver()],
  });
}
