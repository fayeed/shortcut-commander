import { OsShortcuts } from "../../dist/types";

type OS = "Windows" | "Macintosh" | "Unknown OS";

export function getOS(): OS {
  let OSName: OS = "Unknown OS";

  if (navigator.userAgent.indexOf("Win") !== -1) OSName = "Windows";
  if (navigator.userAgent.indexOf("Mac") !== -1) OSName = "Macintosh";
  if (navigator.userAgent.indexOf("Linux") !== -1) OSName = "Windows";

  return OSName;
}

export function getShortcut(shortcuts: string[] | OsShortcuts): string[] {
  if ((shortcuts as OsShortcuts).windows !== undefined) {
    const osShortcuts = shortcuts as OsShortcuts;
    return getOS() === "Macintosh" ? osShortcuts.macOS : osShortcuts.windows;
  } else {
    return shortcuts as string[];
  }
}
