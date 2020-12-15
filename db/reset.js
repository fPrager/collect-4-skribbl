import DB from './db';

export default async () => {
  DB.words.deleteMany();
  DB.game.deleteMany();
};
