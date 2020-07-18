export interface ButtonCommanderReturnType {
  /**
   * Add a new command to the commands list.
   * If there exist a command with the same name it throw an Error.
   *
   * @param command: Command to be added.
   */
  add: (command: Command) => void;

  /**
   * Remove a command from the command list
   *
   * @param name: Name of the to be removed.
   */
  remove: (name: string) => void;

  /**
   * Clears all the registered commands.
   */
  clearAll: () => void;

  /**
   * Update the command.
   * If the command doesn't exist it will throw an Error.
   *
   * @param name: Name of the command to be updated.
   * @param options: The set of properties to update.
   */
  update: (name: string, options: UpdateCommand) => void;

  /**
   * Stops the named command.
   *
   * @param name: Name of the command to stop.
   */
  stop: (name: string) => void;

  /**
   * Restarts the command if was stopped.
   *
   * @param name: Name of the command to start.
   */
  start: (name: string) => void;

  /**
   * Register a command that will be removed once its has been called.
   *
   * @param command: Command object.
   */
  once: (command: Command) => void;

  /**
   * Registers a command that will only work when long pressed.
   *
   * @param command: Command object.
   */
  longPress: (command: Command) => void;

  /**
   * Gets all the registered command.
   *
   * @returns An array of commands.
   */
  getAll: () => Array<Command>;

  /**
   * Indicates the command that was ran recently.
   */
  command?: Command;
}

export interface Command extends Option {
  /**
   * Name of the command, must be unique.
   */
  name: string;

  /**
   * Short for the commands.
   * By default you can setup default shortcuts using an array.
   *
   * In case you need to setup seperate command for different divices you
   * use the [OsShortcuts].
   */
  shortcut: string[] | OsShortcuts;

  /**
   * Callback function when the shortcut is called.
   */
  callback: (event: Event) => void;

  /**
   * Description for the command.
   */
  description?: string;

  /**
   * Indicates when was the command was registered.
   */
  registerTime?: Date;

  /**
   * Indicates wheater the command was stopped.
   */
  stopped?: boolean;

  /**
   * Controls the time to reset the active command.
   */
  delay?: number;
}

export interface UpdateCommand extends Option {
  /**
   * Short for the commands.
   * By default you can setup default shortcuts using an array.
   *
   * In case you need to setup seperate command for different divices you
   * use the [OsShortcuts].
   */
  shortcut?: string[] | OsShortcuts;

  /**
   * Callback function when the shortcut is called.
   */
  callback?: (event: Event) => void;

  /**
   * Description for the command.
   */
  description?: string;

  /**
   * Indicates when was the command was registered.
   */
  registerTime?: Date;

  /**
   * Indicates wheater the command was stopped.
   */
  stopped?: boolean;

  /**
   * Controls the time to reset the active command.
   */
  delay?: number;
}

export type OsShortcuts = { windows: string[]; macOS: string[] };

export interface Option {
  /**
   * Is the registered command global i.e is it registered on the document body.
   */
  global?: boolean;

  /**
   * Should the command persist even if the hook is unmounted.
   */
  persist?: boolean;

  /**
   * Indicates if the command is readonly. Won't allow to update the command.
   */
  readOnly?: boolean;

  /**
   * Indicates should this command be unregistered if its called once.
   */
  once?: boolean;

  /**
   * Indicates will ths command be called after long press.
   */
  longPress?: boolean;

  /**
   * Should the comand be called once & not continously if the keys are being
   * hold down, this is the default behaviour for the 'onkeydown' event
   * handler.
   *
   * Defaults to false.
   */
  dontRepeat?: boolean;

  /**
   * Should the event buddle up if it was catched.
   */
  stopBubblingUp?: boolean;

  /**
   * Indicate the time the shortcuts need to be holded down before the callback
   * will fire. Defaults to 1000ms.
   */
  longPressWaitTime?: number;

  /**
   * Ref to the element on which the command will registered for.
   */
  ref?: HTMLElement;

  /**
   * Indicates if the command is scoped to which element.
   * ! Don't manually change this.
   */
  scopedTo?: string;
}
