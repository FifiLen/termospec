import assert from "node:assert/strict";
import { scryptSync } from "node:crypto";
import test from "node:test";

import {
  normalizeStudioEmail,
  safeEqualStudioEmail,
  verifyStudioPassword,
} from "../server/utils/studio-password.ts";

const createHash = (password: string, salt: Buffer): string => {
  const digest = scryptSync(password, salt, 64);

  return `scrypt-v1$${salt.toString("base64url")}$${digest.toString("base64url")}`;
};

test("Studio email comparison is case-insensitive and trims whitespace", () => {
  assert.equal(normalizeStudioEmail(" REDAKTOR@Termospec.pl "), "redaktor@termospec.pl");
  assert.equal(safeEqualStudioEmail("redaktor@termospec.pl", "REDAKTOR@TERMOSPEC.PL"), true);
  assert.equal(safeEqualStudioEmail("inna@termospec.pl", "redaktor@termospec.pl"), false);
});

test("Studio password verifier accepts only the matching scrypt hash", async () => {
  const hash = createHash("bezpieczne-haslo-testowe", Buffer.from("0123456789abcdef"));

  assert.equal(await verifyStudioPassword("bezpieczne-haslo-testowe", hash), true);
  assert.equal(await verifyStudioPassword("niepoprawne-haslo", hash), false);
  assert.equal(await verifyStudioPassword("bezpieczne-haslo-testowe", "invalid"), false);
});
