import { useCallback, useMemo } from "react";

import { useSearchParams } from "react-router";

type SetterOptions = {
  clearAll?: boolean;
};

type ParamState<T> = [
  T,

  (
    updater: React.SetStateAction<Partial<T>>,

    options?: { clearAll?: boolean },
  ) => void,
];

export function useQueryParamsState<T extends Record<string, string | number>>(
  initial: T,
): ParamState<T> {
  // const [searchParams, setSearchParams] = useSearchParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const state = useMemo(() => {
    const obj = { ...initial };

    (Object.keys(initial) as (keyof T)[]).forEach((key) => {
      const value = searchParams.get(key as string); // Now searchParams is URLSearchParams

      if (value !== null) {
        const defaultVal = initial[key];

        obj[key] =
          typeof defaultVal === "number"
            ? (Number(value) as T[keyof T])
            : (value as T[keyof T]);
      }
    });

    return obj as T;
  }, [searchParams, initial]);

  const setState = useCallback<
    (updater: React.SetStateAction<Partial<T>>, options?: SetterOptions) => void
  >(
    (updater, options = {}) => {
      const next =
        typeof updater === "function"
          ? (updater as (prev: Partial<T>) => Partial<T>)(state)
          : updater;

      setSearchParams(
        (prevParams) => {
          const params = options.clearAll
            ? new URLSearchParams()
            : new URLSearchParams(prevParams);

          (Object.entries(next) as [keyof T, string | number][]).forEach(
            ([key, value]) => {
              if (value === undefined || value === null || value === "") {
                params.delete(key as string);
              } else {
                params.set(key as string, String(value));
              }
            },
          );

          return params;
        },

        { replace: true },
      );
    },

    [setSearchParams, state],
  );

  return [state, setState];
}
