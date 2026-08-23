export type AccessibilityTextSize = "default" | "large" | "largest";

interface AccessibilityPreferences {
  textSize: AccessibilityTextSize;
  highContrast: boolean;
  reduceMotion: boolean;
}

const storageKey = "termospec-accessibility-preferences";

export const accessibilityPreferencesEvent = "termospec:accessibility-change";

const defaultPreferences = (): AccessibilityPreferences => ({
  textSize: "default",
  highContrast: false,
  reduceMotion: false,
});

const isTextSize = (value: unknown): value is AccessibilityTextSize => {
  return value === "default" || value === "large" || value === "largest";
};

const isPreferences = (value: unknown): value is AccessibilityPreferences => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const preferences = value as Partial<AccessibilityPreferences>;

  return isTextSize(preferences.textSize)
    && typeof preferences.highContrast === "boolean"
    && typeof preferences.reduceMotion === "boolean";
};

export const useAccessibilityPreferences = () => {
  const preferences = useState<AccessibilityPreferences>(
    "accessibility-preferences",
    defaultPreferences,
  );
  const isInitialized = useState("accessibility-preferences-initialized", () => false);

  const applyPreferences = () => {
    if (!import.meta.client) {
      return;
    }

    const root = document.documentElement;

    if (preferences.value.textSize === "default") {
      delete root.dataset.accessibilityTextSize;
    } else {
      root.dataset.accessibilityTextSize = preferences.value.textSize;
    }

    root.dataset.accessibilityContrast = preferences.value.highContrast
      ? "high"
      : "default";
    root.dataset.accessibilityMotion = preferences.value.reduceMotion
      ? "reduced"
      : "default";

    window.dispatchEvent(
      new CustomEvent(accessibilityPreferencesEvent, {
        detail: preferences.value,
      }),
    );
  };

  const persistPreferences = () => {
    if (!import.meta.client) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(preferences.value));
  };

  const updatePreferences = (updates: Partial<AccessibilityPreferences>) => {
    preferences.value = {
      ...preferences.value,
      ...updates,
    };
    persistPreferences();
    applyPreferences();
  };

  const setTextSize = (textSize: AccessibilityTextSize) => {
    updatePreferences({ textSize });
  };

  const toggleHighContrast = () => {
    updatePreferences({ highContrast: !preferences.value.highContrast });
  };

  const toggleReduceMotion = () => {
    updatePreferences({ reduceMotion: !preferences.value.reduceMotion });
  };

  const resetPreferences = () => {
    preferences.value = defaultPreferences();
    persistPreferences();
    applyPreferences();
  };

  onMounted(() => {
    if (!isInitialized.value) {
      try {
        const savedPreferences = window.localStorage.getItem(storageKey);

        if (savedPreferences) {
          const parsedPreferences = JSON.parse(savedPreferences) as unknown;

          if (isPreferences(parsedPreferences)) {
            preferences.value = parsedPreferences;
          }
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }

      isInitialized.value = true;
    }

    applyPreferences();
  });

  const hasCustomPreferences = computed(() => {
    return preferences.value.textSize !== "default"
      || preferences.value.highContrast
      || preferences.value.reduceMotion;
  });

  return {
    preferences,
    hasCustomPreferences,
    setTextSize,
    toggleHighContrast,
    toggleReduceMotion,
    resetPreferences,
  };
};
