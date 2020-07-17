import { MutableRefObject } from "react";

export interface ButtonCommanderProps {
  ref?: MutableRefObject<any>;
  commands?: Array<Command>;
  option?: Option;
}

export interface ButtonCommanderReturnType {
  add: () => void; // done
  clear: (name: string) => void; // done
  clearAll: () => void; // done
  update: (name: string, options: UpdateCommand) => void; // done
  stop: (name: string) => void; // done
  start: (name: string) => void; // done
  once: () => void; // done
  longPress: () => void; // done
  getAll: () => Array<Command>; // done
  command: Command; // done
}

export interface Command extends Option {
  name: string; // done
  shortcut: string[] | OsShortcuts; // done
  callback: (event: Event) => void; // done
  description?: string; // done
  registerTime?: Date; // done
  stopped?: boolean; // done
  delay?: number;
  ref?: HTMLElement; // done
}

export interface UpdateCommand extends Option {
  shortcut?: string[] | OsShortcuts; // done
  callback?: (event: Event) => void; // done
  description?: string; // done
  registerTime?: Date; // done
  stopped?: boolean; // done
  delay?: number; // done
}

export type OsShortcuts = { windows: string[]; macOS: string[] };

export interface Option {
  global?: boolean; // done
  persist?: boolean;
  system?: boolean;
  readOnly?: boolean; // done
  once?: boolean; // done
  longPress?: boolean; // done
  onRelease?: boolean;
  dontRepeat?: boolean; // done
  stopBubblingUp?: boolean; // done
}
