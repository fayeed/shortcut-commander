import React, { useEffect, useState } from "react";

import { useCommander } from "shortcut-commander";
import { getShortcut } from "./utils";
import { Command } from "../../dist/types";
import GithubIcon from "./github";
import Icon from "./Icon";

const App = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const { stop, start, command, getAll } = useCommander(
    undefined,
    [
      {
        name: "Green Color",
        shortcut: { windows: ["ctrl", "space"], macOS: ["meta", "z"] },
        description: "Change background color to green",
        callback: () => (document.body.style.background = "#64C964"),
        stopBubblingUp: true,
      },
      {
        name: "Yellow Color",
        shortcut: ["meta", "c"],
        description: "Change background color to yellow",
        callback: () => (document.body.style.background = "#fdd231"),
      },
      {
        name: "Red Color",
        shortcut: ["meta", "x"],
        description: "Change background color to red",
        callback: () => (document.body.style.background = "#FF614D"),
      },
    ],
    undefined
  );

  useEffect(() => {
    console.log("command: ", command);
  }, [command, getAll]);

  useEffect(() => {
    setTimeout(() => {
      setCommands(getAll());
    }, 0);
  }, [getAll]);

  return (
    <div className="container">
      <Icon width={120} height={120} fill="#121212" />
      <div className="title">
        <div>Shortcut Commander</div>
        <a href="https://github.com/fayeed/button-commander">
          <GithubIcon />
        </a>
      </div>
      <div className="commandContainer">
        <div style={{ color: "#fff", fontSize: 24, marginBottom: 30 }}>
          Commands
        </div>
        {commands.map((command) => (
          <div className="commandNewContainer">
            <div className="command">
              <div>
                <span>{command.name}</span>
                <span>{command.description}</span>
              </div>
              <div className="commandKey">
                {getShortcut(command.shortcut).map((btn, i) => (
                  <>
                    <span>{i === 0 ? null : "+"}</span>
                    <div className="key key-new" key={btn}>
                      {btn}
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div>
              <button onClick={() => stop(command.name)}>Stop</button>
              <button onClick={() => start(command.name)}>Start</button>
            </div>
          </div>
        ))}
      </div>

      <div className="shortcutContainer">
        {command?.map((btn, i) => (
          <>
            {i === 0 ? null : <span>+</span>}
            <div className="key">{btn}</div>
          </>
        ))}
      </div>
    </div>
  );
};
export default App;
