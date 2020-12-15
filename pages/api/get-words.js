import getWords from '../../db/get-words';

export default async (req, res) => {
  res.statusCode = 200;
  const {
    query: { client, key },
  } = req;

  const words = await getWords({ client, key });
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ words }));
};
