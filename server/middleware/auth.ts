import type { UserWithId } from "~/lib/auth";

import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  event.context.user = session?.user as unknown as UserWithId;

  if (event.path.startsWith("/dashboard")) {
    const session = await auth.api.getSession({ headers: event.headers });
    if (!session?.user) {
      sendRedirect(event, "/", 302);
    }
  }
});
