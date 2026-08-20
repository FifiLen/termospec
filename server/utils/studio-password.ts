import {
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const HASH_PREFIX = "scrypt-v1";
const HASH_BYTES = 64;

const decodeBase64Url = (value: string): Buffer | null => {
  try {
    const decoded = Buffer.from(value, "base64url");

    return decoded.length > 0 ? decoded : null;
  } catch {
    return null;
  }
};

export const normalizeStudioEmail = (value: string): string => {
  return value.trim().toLowerCase();
};

export const verifyStudioPassword = async (
  password: string,
  encodedHash: string,
): Promise<boolean> => {
  const [prefix, saltValue, digestValue, ...extra] = encodedHash.split("$");

  if (prefix !== HASH_PREFIX || extra.length > 0) {
    return false;
  }

  const salt = decodeBase64Url(saltValue ?? "");
  const expectedDigest = decodeBase64Url(digestValue ?? "");

  if (!salt || !expectedDigest || expectedDigest.length !== HASH_BYTES) {
    return false;
  }

  const derived = await scrypt(password, salt, HASH_BYTES) as Buffer;

  return timingSafeEqual(derived, expectedDigest);
};

export const safeEqualStudioEmail = (candidate: string, expected: string): boolean => {
  const candidateBuffer = Buffer.from(normalizeStudioEmail(candidate));
  const expectedBuffer = Buffer.from(normalizeStudioEmail(expected));

  if (candidateBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(candidateBuffer, expectedBuffer);
};
