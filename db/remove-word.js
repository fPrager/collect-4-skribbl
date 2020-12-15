import DB from './db';

export default async ({ id }) => {
  await DB.words.delete({
    where: {
      id,
    },
  });
};
