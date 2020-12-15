import getWords from '../../db/get-words';

export default async (req, res) => {
  res.statusCode = 200;
  const {
    query: { key },
  } = req;

  const words = await getWords({ key });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ words }));
};
