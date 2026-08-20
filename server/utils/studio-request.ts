import {
  createError,
  getRequestURL,
  getHeader,
  type H3Event,
} from "h3";

export const requireSameOriginStudioRequest = (event: H3Event): void => {
  const origin = getHeader(event, "origin");

  if (!origin || origin !== getRequestURL(event).origin) {
    throw createError({
      statusCode: 403,
      message: "Żądanie zostało odrzucone.",
    });
  }
};
