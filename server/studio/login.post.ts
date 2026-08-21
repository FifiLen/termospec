import {
  createError,
  defineEventHandler,
  getRequestIP,
  readBody,
  setResponseHeader,
} from "h3";

// @ts-ignore This server handler is registered only when nuxt-studio is enabled.
import { setStudioUserSession } from "#imports";
import {
  isAllowedStudioEmail,
  normalizeStudioEmail,
  parseStudioEmails,
  verifyStudioPassword,
} from "../utils/studio-password";
import { requireSameOriginStudioRequest } from "../utils/studio-request";

interface StudioLoginBody {
  email?: unknown;
  password?: unknown;
}

interface AttemptWindow {
  count: number;
  resetAt: number;
}

const ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, AttemptWindow>();

const consumeAttempt = (key: string): void => {
  const now = Date.now();

  if (attempts.size > 1_000) {
    for (const [attemptKey, window] of attempts) {
      if (window.resetAt <= now) {
        attempts.delete(attemptKey);
      }
    }
  }

  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + ATTEMPT_WINDOW_MS });
    return;
  }

  if (current.count >= MAX_ATTEMPTS) {
    throw createError({
      statusCode: 429,
      message: "Zbyt wiele prób logowania. Spróbuj ponownie za 15 minut.",
    });
  }

  current.count += 1;
};

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "cache-control", "no-store");
  requireSameOriginStudioRequest(event);

  const config = useRuntimeConfig(event);
  const configuredEmails = parseStudioEmails(String(config.studioLogin.email || ""));
  const configuredHash = String(config.studioLogin.passwordHash || "");
  const displayName = String(config.studioLogin.displayName || "Redaktor Termospec");

  if (configuredEmails.length === 0 || !configuredHash || !process.env.STUDIO_GITHUB_TOKEN) {
    throw createError({
      statusCode: 503,
      message: "Logowanie do Studio nie zostało jeszcze skonfigurowane.",
    });
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  consumeAttempt(ip);

  const body = await readBody<StudioLoginBody>(event);
  const email = typeof body?.email === "string" ? body.email : "";
  const password = typeof body?.password === "string" ? body.password : "";
  const normalizedEmail = normalizeStudioEmail(email);

  if (email.length > 254 || password.length > 1024) {
    throw createError({ statusCode: 401, message: "Nieprawidłowy e-mail lub hasło." });
  }

  const [emailMatches, passwordMatches] = await Promise.all([
    Promise.resolve(isAllowedStudioEmail(normalizedEmail, configuredEmails)),
    verifyStudioPassword(password, configuredHash),
  ]);

  if (!emailMatches || !passwordMatches) {
    throw createError({
      statusCode: 401,
      message: "Nieprawidłowy e-mail lub hasło.",
    });
  }

  await setStudioUserSession(event, {
    providerId: `custom:${normalizedEmail}`,
    name: displayName,
    email: normalizedEmail,
  });

  attempts.delete(ip);

  return {
    ok: true,
    redirectTo: "/produkty",
  };
});
