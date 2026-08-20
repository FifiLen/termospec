export interface StudioDocument {
  fsPath?: string;
  [key: string]: unknown;
}

export interface StudioHost {
  document: {
    db: {
      create: (fsPath: string, content: string) => Promise<unknown>;
      get: (fsPath: string) => Promise<StudioDocument | undefined>;
      list: () => Promise<StudioDocument[]>;
      upsert: (fsPath: string, document: Record<string, unknown>) => Promise<void>;
    };
  };
  app: {
    requestRerender: () => Promise<void>;
  };
}

declare global {
  interface Window {
    useStudioHost?: () => StudioHost;
  }
}
