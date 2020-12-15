import DB from './db';

export default async ({ key, client }) => {
  if (!client) {
    const allWords = await DB.words.findMany({
      where: {
        game: {
          key,
        },
      },
    });
    return allWords || [];
  }

  const words = await DB.words.findMany({
    where: {
      game: {
        key,
      },
      client,
    },
  });

  return words || [];
};
