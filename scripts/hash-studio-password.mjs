import { randomBytes, scrypt as scryptCallback } from "node:crypto";
import { stdin, stdout } from "node:process";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const MIN_PASSWORD_LENGTH = 14;

const readHidden = (prompt) => new Promise((resolve, reject) => {
  if (!stdin.isTTY || !stdout.isTTY) {
    reject(new Error("Uruchom polecenie w interaktywnym terminalu."));
    return;
  }

  let value = "";
  const previousRawMode = stdin.isRaw;

  const cleanup = () => {
    stdin.off("data", onData);
    stdin.setRawMode(Boolean(previousRawMode));
    stdin.pause();
  };

  const onData = (chunk) => {
    const key = String(chunk);

    if (key === "\u0003") {
      cleanup();
      stdout.write("\n");
      reject(new Error("Przerwano."));
      return;
    }

    if (key === "\r" || key === "\n") {
      cleanup();
      stdout.write("\n");
      resolve(value);
      return;
    }

    if (key === "\u007f" || key === "\b") {
      if (value.length > 0) {
        value = value.slice(0, -1);
        stdout.write("\b \b");
      }
      return;
    }

    if (!/[\u0000-\u001f\u007f]/.test(key)) {
      value += key;
      stdout.write("*");
    }
  };

  stdout.write(prompt);
  stdin.setEncoding("utf8");
  stdin.setRawMode(true);
  stdin.resume();
  stdin.on("data", onData);
});

try {
  const password = await readHidden("Nowe hasło do Nuxt Studio: ");
  const confirmation = await readHidden("Powtórz hasło: ");

  if (password !== confirmation) {
    throw new Error("Hasła nie są identyczne.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków.`);
  }

  const salt = randomBytes(16);
  const digest = await scrypt(password, salt, 64);
  const encoded = [
    "scrypt-v1",
    salt.toString("base64url"),
    Buffer.from(digest).toString("base64url"),
  ].join("$");

  stdout.write("\nWklej poniższą wartość jako NUXT_STUDIO_LOGIN_PASSWORD_HASH:\n");
  stdout.write(`${encoded}\n`);
} catch (error) {
  const message = error instanceof Error ? error.message : "Nie udało się wygenerować hasha.";
  stdout.write(`\nBłąd: ${message}\n`);
  process.exitCode = 1;
}
