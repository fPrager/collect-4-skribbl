import removeWord from '../../db/remove-word';

export default async (req, res) => {
  const { id } = req.body;
  await removeWord({
    id,
  });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
