import addWord from '../../db/add-word';

export default async (req, res) => {
  const { key, client, word } = req.body;
  await addWord({
    key,
    word,
    client,
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
