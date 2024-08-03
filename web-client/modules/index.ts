import { sectionModules } from "@/sections";
import { FreeModule } from "@/lib/module/freeModule";

export const freeModules: () => FreeModule[] = () => [...sectionModules()];
