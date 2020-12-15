import reset from '../../db/reset';

export default async (req, res) => {
  await reset();
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ msg: 'ok' }));
};
