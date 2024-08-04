import { sectionModules } from "@/sections";
import { FreeModule } from "@/lib/module/freeModule";
import { buttonModule } from "./Button/module";
import { textModule } from "./Text/module";

export const freeModules: () => FreeModule[] = () => [
  ...sectionModules(),
  textModule,
  buttonModule,
];
