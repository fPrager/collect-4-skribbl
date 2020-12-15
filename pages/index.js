import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  const Child = () => (
    <>
      <h2>Collect 4 ScribbleIO</h2>
      <p>
        1. Open a game like
        {' '}
        {' '}
        {router.basePath}
        /game/YOUR_GAME_NAME
      </p>
      <p>2. Share the link iwht others. </p>
      <p>3. Collect words together, but in secret!</p>
      <p>
        4. Go to
        {' '}
        {' '}
        {router.basePath}
        /results/YOUR_GAME_NAME to copy the word list.
      </p>
      <p>5. Go to scribble.io and paste the list.</p>
    </>
  );
  return (
    <Child />
  );
};
