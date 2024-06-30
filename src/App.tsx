import { useEffect, useState, useRef } from "react";

import "./App.css";

function App() {
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<JSX.Element[]>([
    <div key="0">hello</div>,
    <div key="1">hey</div>,
  ]);
  const [directory, setDirectory] = useState("~");

  const files = {
    home: ["hello", "websites"],
    about: ["about.txt"],
    socials: ["linkedIn (link)", "github (link)"],
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const notFound = (command: string) => {
    return (
      <div>
        command not found: {command} <br /> try: "help"
      </div>
    );
  };

  const help = (
    <div>
      <span className="pl-4 underline">help</span>: show this helpfull thing
      <br />
      <span className="pl-4 underline">ls</span>: show a list of the directories
      <br />
      <span className="pl-4 underline">clear</span>: clear the terminal screen
    </div>
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      if (input == "") {
        return;
      }
      let newHistory = [
        <div key={history.length}>
          {directory} {input}
        </div>,
      ];
      setHistory([...history, ...newHistory]);
      switch (input) {
        case "help":
          newHistory.push(help);
          break;
        case "clear":
          newHistory = [];
          setHistory([]);
          break;
        case "ls":
          if (directory == "~") {
            newHistory.push(...Object.keys(files).map((f) => <div>{f}</div>));
          }
          break;
        default:
          newHistory.push(notFound(input));
          break;
      }
      setHistory([...history, ...newHistory]);
      setInput("");
    }
  };

  useEffect(() => {
    if (scrollRef.current != null) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div
      className="h-screen w-screen bg-gray-700 flex items-center justify-center font-mono"
      onClick={focusInput}
    >
      <div
        className="relative w-4/5 h-4/5 bg-gray-800 rounded-lg overflow-hidden flex flex-col"
        onClick={focusInput}
      >
        <div className="flex items-center bg-gray-900 h-10 gap-2 absolute top-0 w-full rounded-t-lg">
          <div className="h-4 aspect-square bg-red-600/60 ml-2 rounded-full flex items-center justify-center text-red-800"></div>
          <div className="h-4 aspect-square bg-amber-600/60 rounded-full flex items-center justify-center text-amber-800"></div>
          <div className="h-4 aspect-square bg-green-600/60 rounded-full flex items-center justify-center text-green-800"></div>
        </div>
        <div
          className="mt-12 m-4 w-full flex flex-col gap-2 text-gray-400 overflow-y-auto flex-grow no-scrollbar pr-4"
          ref={scrollRef}
        >
          {history.map((element, index) => (
            <div key={index}>{element}</div>
          ))}
          <div className="flex gap-2">
            <div className="flex gap-2">
              <div>&gt;</div> <div className="text-sky-600">{directory}</div>
            </div>
            <input
              type="text"
              onKeyDown={handleEnter}
              onChange={handleInput}
              className="bg-transparent focus:ring-0 focus:ring-transparent focus:border-transparent focus:outline-none w-full text-wrap"
              autoFocus
              ref={inputRef}
              value={input}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
