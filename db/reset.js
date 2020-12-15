import DB from './db';

export default async () => {
  await DB.words.deleteMany();
  await DB.game.deleteMany();
};
