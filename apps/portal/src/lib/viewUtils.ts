export const noop = () => void 0;

export const asyncNoop = async () => void 0;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockT = (key: string, options?: { [key: string]: any }) => {
  if (typeof options === "string") {
    return options;
  }

  if (typeof options === "object" && options?.defaultValue) {
    return options.defaultValue.replace(
      /{{\s*(\w+)\s*}}/g,
      (_: string, variable: string) => options[variable] || "",
    );
  }

  return key;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useTranslationStore = () => ({
  t: mockT as any,
  changeLanguage: noop,
  i18n: {} as any,
});
