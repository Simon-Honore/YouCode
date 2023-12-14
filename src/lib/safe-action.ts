import { createSafeActionClient } from "next-safe-action";
import { getAuthSession } from "./auth";

export const action = createSafeActionClient();

export class ServerError extends Error {}

export const authentificatedAction = createSafeActionClient({
  handleReturnedServerError: (error) => {
    if (error instanceof ServerError) {
      return { serverError: error.message };
    }

    return { serverError: "An error occured" };
  },
  async middleware() {
    const session = await getAuthSession();

    if (!session) {
      throw new ServerError("You must be logged in to perform this action");
    }

    const user = session.user;
    const userId = user.id;

    return {
      user,
      userId,
    };
  },
});
