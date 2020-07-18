export interface ButtonCommanderReturnType {
  add: (command: Command) => void;
  remove: (name: string) => void;
  clearAll: () => void;
  update: (name: string, options: UpdateCommand) => void;
  stop: (name: string) => void;
  start: (name: string) => void;
  once: (command: Command) => void;
  longPress: (command: Command) => void;
  getAll: () => Array<Command>;
  command?: Command;
}

export interface Command extends Option {
  name: string;
  shortcut: string[] | OsShortcuts;
  callback: (event: Event) => void;
  description?: string;
  registerTime?: Date;
  stopped?: boolean;
  delay?: number;
  ref?: HTMLElement;
  scopedTo?: string;
}

export interface UpdateCommand extends Option {
  shortcut?: string[] | OsShortcuts;
  callback?: (event: Event) => void;
  description?: string;
  registerTime?: Date;
  stopped?: boolean;
  delay?: number;
}

export type OsShortcuts = { windows: string[]; macOS: string[] };

export interface Option {
  global?: boolean;
  persist?: boolean;
  system?: boolean;
  readOnly?: boolean;
  once?: boolean;
  longPress?: boolean;
  onRelease?: boolean;
  dontRepeat?: boolean;
  stopBubblingUp?: boolean;
  longPressWaitTime?: number;
}
