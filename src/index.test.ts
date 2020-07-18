import { useCommander } from ".";
import { renderHook, act } from "@testing-library/react-hooks";
import { Command } from "./types";

const commands: Array<Command> = [
  {
    name: "Green Color",
    shortcut: { windows: ["ctrl", "z"], macOS: ["meta", "z"] },
    description: "Change background color to green",
    callback: () => (document.body.style.background = "#64C964"),
    stopBubblingUp: true,
  },
  {
    name: "Yellow Color",
    shortcut: { windows: ["ctrl", "x"], macOS: ["meta", "x"] },
    description: "Change background color to yellow",
    callback: () => (document.body.style.background = "#fdd231"),
    readOnly: true,
  },
  {
    name: "Red Color",
    shortcut: { windows: ["ctrl", "c"], macOS: ["meta", "c"] },
    description: "Change background color to red",
    callback: () => (document.body.style.background = "#FF614D"),
  },
];

describe("useCommander", () => {
  it("Test if the new commands are registered", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    // initial state
    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(3);
  });

  it("Add a new command", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.add({
        name: "Purple Color",
        shortcut: { windows: ["ctrl", "z"], macOS: ["meta", "z"] },
        description: "Change background color to green",
        callback: () => (document.body.style.background = "purple"),
        stopBubblingUp: true,
      });
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(4);
  });

  it("remove the command", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.remove("Red Color");
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(3);
    expect(result.current.getAll().find((e) => e.name === "Red Color")).toBe(
      undefined
    );
  });

  it("Disable the command", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.stop("Red Color");
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(4);
    expect(
      result.current.getAll().find((e) => e.name === "Red Color")?.stopped
    ).toBeTruthy();
  });

  it("Enable the command.", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.start("Red Color");
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(4);
    expect(
      result.current.getAll().find((e) => e.name === "Red Color")?.stopped
    ).toBeFalsy();
  });

  it("Add a new command that will be executed only once", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.once({
        name: "Red Color",
        shortcut: { windows: ["ctrl", "c"], macOS: ["meta", "c"] },
        description: "Change background color to red",
        callback: () => (document.body.style.background = "#FF614D"),
      });
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(4);
    expect(
      result.current.getAll().find((e) => e.name === "Red Color")?.once
    ).toBeTruthy();
  });

  it("Add a new command that will be executed only when long pressed", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.longPress({
        name: "Black Color",
        shortcut: { windows: ["ctrl", "c"], macOS: ["meta", "c"] },
        description: "Change background color to red",
        callback: () => (document.body.style.background = "black"),
      });
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(5);
    expect(
      result.current.getAll().find((e) => e.name === "Black Color")?.longPress
    ).toBeTruthy();
  });

  it("Update a command", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.update("Red Color", { readOnly: true });
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(5);
    expect(
      result.current.getAll().find((e) => e.name === "Red Color")?.readOnly
    ).toBeTruthy();
  });

  it("Clears all the reegistered command", () => {
    const { result } = renderHook(() => useCommander(undefined, commands));

    act(() => {
      result.current.clearAll();
    });

    expect(result.current.command).toBe(undefined);
    expect(result.current.getAll().length).toBe(0);
  });
});
