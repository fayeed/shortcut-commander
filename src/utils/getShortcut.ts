import { OsShortcuts } from "../types";
import { getOS } from "./getOS";

export function getShortcut(shortcuts: string[] | OsShortcuts): string[] {
  if ((shortcuts as OsShortcuts).windows !== undefined) {
    const osShortcuts = shortcuts as OsShortcuts;
    return getOS() === "Macintosh" ? osShortcuts.macOS : osShortcuts.windows;
  } else {
    return shortcuts as string[];
  }
}
