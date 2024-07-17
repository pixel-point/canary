export interface MainRoutes {
  toHome: () => string;
  toStudio: () => string;
  toStudioParallel: () => string;
  toStudioMixed: () => string;
  toStudioDemo: () => string;

  /* Component routes */
  toComponents: () => string;
  toAvatar: () => string;
  toButton: () => string;
  toDialog: () => string;
  toDropdown: () => string;
  toInput: () => string;
  toPopover: () => string;
  toRadio: () => string;
  toSwitch: () => string;
  toTabs: () => string;

  /* Samples */
  toWebhookFormDemo: () => string;
  toAppShellDemo: () => string;
  toAppShellPlayground: () => string;
}

export interface ComponentRoutes {}

export const routes: MainRoutes & ComponentRoutes = {
  toHome: (): string => "/",
  toStudio: (): string => "/studio",
  toStudioParallel: (): string => "/studio/parallel",
  toStudioMixed: (): string => "/studio/mixed",
  toStudioDemo: (): string => "/studio/demo",

  /* Components */
  toComponents: (): string => "/components",
  toAvatar: (): string => "/components/avatar",
  toButton: (): string => "/components/button",
  toDialog: (): string => "/components/dialog",
  toDropdown: (): string => "/components/dropdown",
  toInput: (): string => "/components/input",
  toPopover: (): string => "/components/popover",
  toRadio: (): string => "/components/radio",
  toSwitch: (): string => "/components/switch",
  toTabs: (): string => "/components/tabs",

  /* Samples */
  toWebhookFormDemo: (): string => "/demo/webhook-form",
  toAppShellDemo: (): string => "/demo/app-shell",
  toAppShellPlayground: (): string => "/demo/app-shell/playground",
};
