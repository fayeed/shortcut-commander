import {
  Command,
  Option,
  UpdateCommand,
  ButtonCommanderReturnType,
} from "./types";
import { useEffect, MutableRefObject, useState, useCallback } from "react";
import { matchCommand, getShortcut } from "./utils";

let commandSet = new Map<string, Command>();

let longPress = false;

let dontRepeat = false;

let globalListenerRegistered = false;

let removeTimeout: NodeJS.Timeout;

const commandChangeFuncs = new Set<any>();

let longPressFunc: NodeJS.Timeout;

function callbackFunc(e: KeyboardEvent, value: Command) {
  if (!value.scopedTo || (e.target as HTMLElement).tagName === value.scopedTo) {
    clearTimeout(removeTimeout);

    for (const setCommand of commandChangeFuncs) {
      setCommand(value);

      removeTimeout = setTimeout(
        () => setCommand(undefined),
        value.delay ?? 1000
      );
    }

    value.callback(e);
  }

  if (value.once) {
    commandSet.delete(value.name);
  }
}

const keyDownListener = (e: KeyboardEvent) => {
  // Sorts the command set by global property false -> true
  const sortedCommands = Array.from(commandSet.values()).sort((x, y) =>
    x === y ? 0 : x ? -1 : 1
  );

  for (const value of sortedCommands) {
    if (matchCommand(e, getShortcut(value.shortcut)) && !value.stopped) {
      if (value.longPress) {
        if (!longPress) {
          longPress = true;

          longPressFunc = setTimeout(
            () => callbackFunc(e, value),
            value.longPressWaitTime ?? 500
          );
        }
      } else {
        if (value.dontRepeat) {
          if (!dontRepeat) {
            dontRepeat = true;

            callbackFunc(e, value);
          }
        } else {
          callbackFunc(e, value);
        }
      }

      // If the stopBubbling is true don't execute if another command with
      // the same short is registered.
      if (value.stopBubblingUp) {
        e.preventDefault();
        e.stopPropagation();
        break;
      }
    }
  }

  return false;
};

const keyUpListener = () => {
  longPress = false;
  dontRepeat = false;
  clearTimeout(longPressFunc);
};

export const useCommander = (
  ref?: MutableRefObject<any>,
  commands?: Command[],
  option?: Option
): ButtonCommanderReturnType => {
  const [command, setCommand] = useState<Command>();

  useEffect(() => {
    commandChangeFuncs.add(setCommand);

    if (commands) {
      for (const command of commands) {
        commandSet.set(command.name, {
          global: !ref?.current ? true : false,
          registerTime: new Date(),
          scopedTo: ["INPUT", "TEXTAREA", "SELECT"].includes(
            ref?.current?.tagName
          )
            ? ref?.current?.tagName
            : undefined,
          readOnly: false,
          ...command,
          ...option,
        });
      }
    }

    /**
     * Registers listener on the ref provided.
     *
     * If no ref is provided check to see if any global listener was
     * set and then only set it.
     */
    if (ref?.current) {
      ref.current?.addEventListener("keydown", keyDownListener);
      ref.current?.addEventListener("keyup", keyUpListener);
    } else if (!globalListenerRegistered) {
      globalListenerRegistered = true;
      document.body.addEventListener("keydown", keyDownListener);
      document.body.addEventListener("keyup", keyUpListener);
    }

    return () => {
      // When the hook unmounts first remove the commands from the list.
      for (const command of Array.from(commands?.values()!)) {
        commandSet.delete(command.name);
      }

      commandChangeFuncs.delete(setCommand);

      // If the ref was provided remove listener too.
      // If the commandSet down to 0 remove teh global listener too.
      if (ref?.current) {
        ref.current?.removeEventListener("keydown", keyDownListener);
        ref.current?.removeEventListener("keyup", keyUpListener);
      } else if (globalListenerRegistered && commandSet.size === 0) {
        document.body.removeEventListener("keydown", keyDownListener);
        document.body.removeEventListener("keyup", keyUpListener);
      }
    };
  }, []);

  const getAll = useCallback(() => Array.from(commandSet.values()), []);

  const stop = useCallback(
    (name: string) =>
      commandSet.set(name, { ...commandSet.get(name)!, stopped: true }),
    []
  );

  const start = useCallback(
    (name: string) =>
      commandSet.set(name, { ...commandSet.get(name)!, stopped: false }),
    []
  );

  const update = useCallback((name: string, options: UpdateCommand) => {
    const command = commandSet.get(name);
    if (command) {
      if (!command.readOnly) {
        commandSet.set(name, { ...command, ...options });
      } else {
        throw Error("Shortcut you are trying to modify is set to readOnly.");
      }
    } else {
      throw Error("Shortcut that you are trying to update does not exist.");
    }
  }, []);

  const remove = useCallback((name: string) => commandSet.delete(name), []);

  const clearAll = () => commandSet.clear();

  const add = useCallback((command: Command) => {
    if (!commandSet.has(command.name)) {
      commandSet.set(command.name, command);
    } else {
      throw new Error("Shortcut with the same name already exist.");
    }
  }, []);

  const once = useCallback((command: Command) => {
    commandSet.set(command.name, { ...command, once: true });
  }, []);

  const longPress = useCallback((command: Command) => {
    commandSet.set(command.name, { ...command, longPress: true });
  }, []);

  return {
    getAll,
    stop,
    start,
    update,
    remove,
    clearAll,
    add,
    command,
    once,
    longPress,
  };
};

export default useCommander;
