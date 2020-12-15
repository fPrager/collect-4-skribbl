import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  Button, Spacer, useClipboard, useToasts,
} from '@geist-ui/react';

const Result = () => {
  const router = useRouter();
  const { key } = router.query;
  const { copy } = useClipboard();
  const [, setToast] = useToasts();

  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState([]);

  const requestWords = async () => {
    if (!key) return;
    const resWords = await fetch(`/api/get-all-words?key=${key}`);
    const dataWords = await resWords.json();
    setWords(dataWords.words);
    setIsLoading(false);
  };

  useEffect(() => {
    requestWords();
  }, [key]);

  const getUniqueList = () => {
    const lowerWords = words.map((w) => w.content.toLowerCase());
    return lowerWords.filter((value, index, self) => self.indexOf(value) === index);
  };

  const copyWordsForScribbleIo = () => {
    const uniqueWords = getUniqueList();
    copy(uniqueWords.join(', '));
    setToast({ text: 'Copied!' });
  };

  return (
    <>
      <h2>
        Words of game
        {' '}
        {key}
      </h2>
      <p>
        Stored words:
        {getUniqueList().length}
      </p>

      <Button
        auto
        type="primary"
        size="small"
        onClick={copyWordsForScribbleIo}
        loading={isLoading}
      >
        Copy
      </Button>
    </>
  );
};

export default React.memo(Result);
