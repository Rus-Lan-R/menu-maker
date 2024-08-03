import { memo, useCallback, useId, useMemo, useRef } from "react";
import useSSRLayoutEffect from "@/hooks/useSSRLayoutEffect";
import { nonNullable } from "@/lib/nonNullable";

export type ScriptContextData = {
  place: "react" | "page";
  element: HTMLElement;
};

type Destroy = () => void;

export type UpdatableCallback<D> = (
  data: ScriptContextData,
  advancedData: D,
) => Destroy | void;

// Just random string
const destroyersKey = "destroyersrevmdkgurmvdwvgoeivme";

type Destroyers = {
  [key: string]: Destroy;
};

type WindowWithDestroyers = Window & {
  [destroyersKey]?: Destroyers;
};

function initDestroyers(key: string) {
  if ((window as any)[key] === undefined) {
    (window as any)[key] = {};
  }
}

type Common = {
  rerunOnMount?: boolean;
} & Record<`data-${string}`, string | number>;

function UpdatableSSRScript(
  props: {
    callback: UpdatableCallback<undefined>;
  } & Common,
): JSX.Element;

function UpdatableSSRScript<D extends Record<string, unknown>>(
  props: {
    advancedData: D;
    callback: UpdatableCallback<D>;
  } & Common,
): JSX.Element;

function UpdatableSSRScript<D extends Record<string, unknown>>({
  advancedData,
  callback,
  rerunOnMount,
  ...common
}: {
  advancedData?: D;
  callback: UpdatableCallback<D | undefined>;
} & Common): JSX.Element {
  const id = useId();
  const scriptRef = useRef<HTMLScriptElement>(null);

  const dataInReact: () => ScriptContextData = useCallback(
    () =>
      ({
        place: "react",
        element: nonNullable(scriptRef.current),
      } satisfies ScriptContextData),
    [],
  );

  const wasFirstDestroy = useRef(false);

  useSSRLayoutEffect(() => {
    const serverDestroyer = (window as WindowWithDestroyers)[destroyersKey]?.[
      id
    ];

    if (!wasFirstDestroy.current && serverDestroyer) {
      wasFirstDestroy.current = true;

      if (rerunOnMount) {
        serverDestroyer();
      } else {
        return serverDestroyer;
      }
    }

    return callback(dataInReact(), advancedData);
  }, Object.values(advancedData ?? {}));

  function dataOnPage(): ScriptContextData {
    return {
      place: "page",
      element: document.currentScript as HTMLElement,
    };
  }

  const inserted = useMemo(
    () => ({
      data: `var __data = (${dataOnPage.toString()})();`,
      initDestroyers: `(${initDestroyers.toString()})("${destroyersKey}");`,
      callback: `window["${destroyersKey}"]["${id}"] = (${callback.toString()})(__data, ${
        advancedData ? JSON.stringify(advancedData) : "undefined"
      });`,
      defaultDestroyer: `if (window["${destroyersKey}"]["${id}"] === undefined) { window["${destroyersKey}"]["${id}"] = function() {} };`,
    }),
    [],
  );

  return (
    <script
      {...common}
      ref={scriptRef}
      dangerouslySetInnerHTML={useMemo(
        () => ({
          __html: `(function() { ${Object.values(inserted)
            .join("")
            .replace(/(\s+)|(\n)/gi, " ")} })();`,
        }),
        [],
      )}
      suppressHydrationWarning
    ></script>
  );
}

const typedMemo: <T>(c: T) => T = memo;

export default typedMemo(UpdatableSSRScript);
