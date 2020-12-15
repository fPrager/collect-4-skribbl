import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  useInput, Input, Spacer, Button, Divider,
} from '@geist-ui/react';

const Game = () => {
  const router = useRouter();
  const { key } = router.query;

  let client = '';
  if (typeof window !== 'undefined') {
    client = localStorage.getItem('client');
    console.log('got ', client);
    if (!client) {
      client = Math.random().toString(32);
      localStorage.setItem('client', client);
    }
  }

  const [isLoading, setIsLoading] = useState(true);
  const [removingWords, setRemovingWords] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [words, setWords] = useState([]);

  const {
    state, setState, reset, bindings,
  } = useInput('');

  const requestWords = async () => {
    if (!key) return;
    const resWords = await fetch(`/api/get-words?key=${key}&client=${client}`);
    const dataWords = await resWords.json();
    setWords(dataWords.words);
    setIsLoading(false);
  };

  const addWord = async () => {
    setIsSaving(true);
    const word = state;
    await fetch('/api/add-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key,
        word,
        client,
      }),
    });
    await requestWords();
    reset();
    setIsSaving(false);
  };

  const removeWord = async (id) => {
    setRemovingWords([...removingWords, id]);
    await fetch('/api/remove-word', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });
    await requestWords();
  };

  useEffect(() => {
    requestWords();
  }, [key]);

  const WordList = () => {
    if (isLoading) {
      return (
        <div>Loading ...</div>
      );
    }
    if (words.length === 0) {
      return (
        <p>No words Stored yet...</p>
      );
    }
    return (
      <>
        {
        words.map((w) => (

          <Button key={w.id} style={{ marginRight: '0.5rem', marginTop: '0.5rem' }} auto loading={removingWords.includes(w.id)} onClick={() => (removeWord(w.id))}>
            <b>{ w.content }</b>
            <Spacer x={0.5} />
            X
          </Button>

        ))
}
      </>
    );
  };

  return (
    <>
      <h2>
        Add words to the game of
        {' '}
        {key}
      </h2>
      <Input disabled={isSaving} {...bindings} />
      <Spacer y={0.5} />
      <Button
        auto
        type="primary"
        size="small"
        onClick={addWord}
        loading={isSaving}
      >
        Add
      </Button>
      <Divider />
      <Spacer y={2} />
      <WordList />
    </>
  );
};

export default React.memo(Game);
