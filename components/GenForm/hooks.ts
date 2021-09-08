import React, { useState, useCallback } from 'react';
import axios from 'axios';

const useSubmit = (setResult: (res: string) => void, owner: string, repo: string, color: string) => {
  const [ loading, setLoading ] = useState(false);
  const [ link, setLink ] = useState('');

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: 'POST',
      url: '/api/shortlink',
      headers: { 'Content-Type': 'application/json' },
      data: {
        owner: owner,
        repo: repo,
        color,
      },
    }).then((res) => {
      if (res.status === 200) {
        const shortLink = res?.data?.shortLink;
        setResult(`${window.location.origin}/shortlink/${shortLink}`);
        setLink(`${window.location.origin}/shortlink/${shortLink}`);
        setLoading(false);
      }
    }).catch((e) => {
      console.log(e);
      setLoading(false);
    });
  }, [ owner, repo, color ]);

  return { handleSubmit, loading, link };

};

export { useSubmit };