// @ts-check
import fs from "node:fs";
import { js } from "@ast-grep/napi";
import fg from "fast-glob";

// clean
fg.sync("src/*.{res,tsx}", { absolute: true }).forEach((file) => {
  fs.unlinkSync(file);
});

const blockedModule = ["JSON", "Type"];

/** @type {Record<string, (string | RegExp)[]>} */
const blockedFn = {
  Array: ["swapUnsafe"],
  List: [/Aux/, "reduceReverseUnsafeU", "reduceReverse2UnsafeU"],
};

fg.sync("./node_modules/@rescript/core/src/*.mjs", {
  absolute: true,
}).forEach((file) => {
  if (!file.includes("__")) return;

  const moduleName = file.split("__")[1].split(".")[0];
  if (blockedModule.includes(moduleName)) return;

  const content = fs.readFileSync(file, { encoding: "utf-8" });
  const fnNames = js
    .parse(content)
    .root()
    .findAll("function $NAME($$$A) { $$$B }")
    .flatMap((v) => {
      const name = v.getMatch("NAME")?.text();
      return name &&
        // invalid name
        !name.startsWith("$$") &&
        !blockedFn[moduleName]?.some((regexOrStr) =>
          typeof regexOrStr === "string"
            ? name === regexOrStr
            : regexOrStr.test(name),
        )
        ? [name]
        : [];
    });

  // ignore empty files
  if (fnNames.length === 0) return;

  const code = fnNames
    .map((name) => `@genType let ${name} = RescriptCore.${moduleName}.${name}`)
    .join("\n");

  fs.writeFileSync(`src/${moduleName.toLowerCase()}.res`, code);
});
