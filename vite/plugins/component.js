import Components from "unplugin-vue-components/vite";
import { ArcoResolver } from "unplugin-vue-components/resolvers";

export default function createAutoImportComponent() {
  return Components({
    resolvers: [
      ArcoResolver({
        sideEffect: true,
      }),
    ],
  });
}
