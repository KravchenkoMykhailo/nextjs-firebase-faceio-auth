import NextCors from "nextjs-cors";

import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  cookieName: "SESSION_AUTHENTICATION_CREDENTIAL",
  password:
    process.env.SESSION_AUTHENTICATION_CREDENTIAL ??
    (() => {
      throw "No cookie secret";
    })(),
  cookieOptions: {
    // maxAge: 600, // Reset after 600 seconds.
    secure: process.env.NODE_ENV === "production",
  },
};

function withNextCors(handler) {
  return async function nextApiHandlerWrappedWithNextCors(req, res) {
    const methods = ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"];
    await NextCors(req, res, {
      methods,
      optionsSuccessStatus: 200,
    });
    return handler(req, res);
  };
}

export function withNextCorsSessionRoute(handler) {
  const withSessionHandler = withIronSessionApiRoute(handler, sessionOptions);
  return withNextCors(withSessionHandler);
}

export function withSessionSsr(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}
