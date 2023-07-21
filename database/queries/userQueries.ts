import {
  DatabaseError,
  SequelizeScopeError,
  UniqueConstraintError,
} from "sequelize";
import { User } from "../../models";

export function readUserByEmail(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}

export async function createUser(user: User): Promise<number | null> {
  const { firstName, lastName, email, password } = user;
  try {
    const result = await User.create({ firstName, lastName, email, password });
    console.log("result: ", result);
    return result ? result.id : null;
  } catch (error) {
    const exception = error as UniqueConstraintError;
    return exception.name === "SequelizeUniqueConstraintError" ? -1 : null;
  }
}
