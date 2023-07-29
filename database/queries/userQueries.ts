import {
  DatabaseError,
  SequelizeScopeError,
  UniqueConstraintError,
} from "sequelize";
import { Favorite, User } from "../../models";

export function readUserByEmail(email: string): Promise<User | null> {
  return User.findOne({ where: { email } });
}

export async function createUser(user: User): Promise<number | null> {
  const { firstName, lastName, email, password } = user;
  try {
    const result = await User.create({ firstName, lastName, email, password });
    return result ? result.id : null;
  } catch (error) {
    const exception = error as UniqueConstraintError;
    return exception.name === "SequelizeUniqueConstraintError" ? -1 : null;
  }
}

export async function addToFavourite(id: number, productsIds: number[] = []) {
  const [favouriteList, created] = await Favorite.findOrCreate({
    where: { userId: id },
    defaults: { userId: id, productsIds },
  });
  if (!created) favouriteList.productsIds.push(...productsIds);
  const added = await Favorite.update(
    { favouriteList },
    { where: { id: favouriteList.id } }
  );
  return added;
}
export async function deleteFromFavourite(
  id: number,
  productsIds: number[] = []
) {
  const [favouriteList, created] = await Favorite.findOrCreate({
    where: { userId: id },
    defaults: { userId: id, productsIds },
  });
  if (!created) favouriteList.productsIds.push(...productsIds);
  const added = await Favorite.update(
    { favouriteList },
    { where: { id: favouriteList.id } }
  );
  return added;
}
export async function getFavouriteList(id: number) {
  const [favouriteList] = await Favorite.findOrCreate({
    where: { userId: id },
    defaults: { userId: id, productsIds: [] },
  });
  return favouriteList;
}
