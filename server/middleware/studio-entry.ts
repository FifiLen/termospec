import { defineEventHandler, getRequestURL, sendRedirect } from "h3";

export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event);

  if (config.public.studioEnabled && getRequestURL(event).pathname === "/_studio") {
    return sendRedirect(event, "/studio-login", 302);
  }
});
