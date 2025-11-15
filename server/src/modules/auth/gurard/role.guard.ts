import { asyncHandler } from "../../../lib/AsyncHandler";
import { HttpError } from "../../../lib/HttpError";
import { Role } from "@prisma/client";

export const Roles = (role: Role, ...others: Role[]) =>
  asyncHandler((req, res, next) => {
    const roles = [role, ...others];

    console.log(roles);

    if (!roles.includes(req.user.role as Role)) {
      throw new HttpError(
        401,
        "You do not have permission to access this route.",
      );
    }

    next();
  });
