declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, string | number | boolean | undefined>
    ) => void;
    Calendly?: {
      initInlineWidget: (options: Record<string, unknown>) => void;
      closePopupWidget: () => void;
    };
  }
}

export {};