export function matchCommand(e: KeyboardEvent, command: string[]) {
  let matched = false;

  for (const key of command) {
    if (key === "meta") {
      if (e.metaKey) matched = true;
      else return false;
    } else if (key === "ctrl") {
      if (e.ctrlKey) matched = true;
      else return false;
    } else if (key === "alt") {
      if (e.altKey) matched = true;
      else return false;
    } else if (key === "shift") {
      if (e.shiftKey) matched = true;
      else return false;
    } else if (key === "space") {
      if (e.key === " ") matched = true;
      else return false;
    } else {
      if (key === e.key.toLowerCase()) matched = true;
      else return false;
    }
  }

  return matched;
}
