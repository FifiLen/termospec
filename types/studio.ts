export interface StudioDocument {
  fsPath?: string;
  [key: string]: unknown;
}

export interface StudioMediaItem {
  id: string;
  fsPath?: string;
  path?: string;
  extension?: string;
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
  media: {
    list: () => Promise<StudioMediaItem[]>;
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
