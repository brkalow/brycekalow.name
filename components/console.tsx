"use client";
import { cn } from "lib/cn";
import { ReactNode, useEffect, useRef, useState } from "react";

// c.f. https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
const cyrb53 = (str, seed = 0) => {
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

function parseLineInputs(inputs) {
  let result: ReactNode[] = [];
  let index = 0;

  while (index < inputs.length) {
    let style = "";
    let className;
    let input = inputs[index];

    // %c is the format specifier for styles, if the input includes that, treat the next input as the style declaration
    if (input.includes("%c")) {
      style = inputs[index + 1];
      className = `console_${cyrb53(style)}`;
      style = `.${className} { ${style} }`;
      input = input.replace("%c", "");
      // skip over the style
      index += 1;
    }

    result.push(
      <>
        {/* If we have styles, inject a style tag */}
        {style && <style dangerouslySetInnerHTML={{ __html: style }} />}
        <span key={input} className={className}>
          {input}
        </span>
      </>
    );
    index += 1;
  }

  return result;
}

function ConsoleLine({ lineInputs, showInput }) {
  return (
    <>
      {showInput && (
        <span
          className={cn(
            "p-2 last-of-type:border-none border-b border-black/25 dark:border-white/25"
          )}
        >
          <span className="opacity-35">&gt;&nbsp;</span>
          console.log({lineInputs.map((input) => `"${input}"`).join(", ")})
        </span>
      )}
      <span className="p-2 last-of-type:border-none border-b border-black/25 dark:border-white/25">
        {parseLineInputs(lineInputs)}
      </span>
    </>
  );
}

export default function Console({
  lines,
  showInput,
  interactive,
  placeholder,
}) {
  const [_lines, setLines] = useState(lines);
  const [input, setInput] = useState<string>();
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (linesRef.current) {
      linesRef.current.scrollTo(0, linesRef.current.scrollHeight);
    }
  }, [_lines]);

  let prompt: ReactNode = null;
  if (interactive) {
    // Keep the size of the input element in-sync with the size of the input value, to make it look like the static text is part of the value
    const inputSize = Math.max(
      ((input?.length || placeholder?.length) ?? 1) - 1,
      1
    );

    prompt = (
      <>
        <div className={cn("p-2 max-w-full overflow-x-auto")}>
          <span className="opacity-35">&gt;&nbsp;</span>
          console.log(
          <input
            className={cn(
              "bg-transparent text-color-inherit font-family-inherit text-inherit fit-content border-2 border-dashed border-black/25 dark:border-white/25 appearance-none rounded"
            )}
            type="text"
            size={inputSize}
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                const inputToSplit = input || placeholder;
                // parse the inputs by splitting on , and remove wrapping quotes
                const inputs = inputToSplit
                  .split(/,\s?/)
                  .map((i) => i.replace(/^["'](.+)["']$/, "$1"));
                setLines((cur) => [...cur, inputs]);
                setInput("");
              }
            }}
            placeholder={placeholder}
          />
          )
        </div>
      </>
    );
  }

  return (
    <>
      <pre
        data-solid-bg
        className={cn(
          "text-sm bg-gray-50 dark:bg-gray-500/5 border rounded-lg border-black/25 dark:border-white/25"
        )}
      >
        <span
          className={cn("grid max-w-full overflow-x-auto max-h-[300px]")}
          ref={linesRef}
        >
          {_lines.map((lineInputs, index) => (
            <ConsoleLine
              key={JSON.stringify(lineInputs) + index}
              lineInputs={lineInputs}
              showInput={showInput}
            />
          ))}
        </span>
        {prompt}
      </pre>
    </>
  );
}
