import DB from './db';

export default async ({ key, word, client }) => {
  let game = await DB.game.findFirst({
    where: {
      key,
    },
  });

  if (!game) {
    game = await DB.game.create({
      data: {
        key,
      },
    });
  }

  await DB.words.create({
    data: {
      content: word,
      client,
      game: {
        connect: {
          key,
        },
      },
    },
  });
};
