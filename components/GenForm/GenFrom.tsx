import React, { useState } from 'react';
import { GithubPicker } from 'react-color';
import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';

import { FormContainer } from './style';

import { useSubmit } from './hooks';


const GenFrom = ({ setResult }: { setResult: (res: string) => void }) => {
  const [ owner, setOwner ] = useState('');
  const [ repo, setRepo ] = useState('');
  const [ color, setColor ] = useState('#FFF');
  const { handleSubmit, loading, link } = useSubmit(setResult, owner, repo, color);

  const handleChangeComplete = (color: { hex: string }, event: any) => {
    setColor(color.hex);
  };

  return (
    <FormContainer color={color}>
      <Paper className="form-paper">
        <Typography variant="h5" color="primary">Awesome Cards for your Repos</Typography>
        <form noValidate autoComplete="off">
          <TextField
            label="Owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
            required
            disabled={loading}
            variant="outlined"
            color="primary"
            fullWidth
            className="text-field"
          />
          <TextField
            label="Repo"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            required
            disabled={loading}
            variant="outlined"
            color="primary"
            fullWidth
            className="text-field"
          />
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <Typography variant="body1" color="primary">
                Select Your Lovely Color:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <GithubPicker
                width="200px"
                colors={[ '#B80000', '#DB3E00', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF', '#5300EB', '#EB9694', '#FAD0C3', '#FEF3BD', '#C1E1C5', '#BEDADC', '#C4DEF6', '#BED3F3', '#D4C4FB' ]}
                triangle="hide"
                onChangeComplete={handleChangeComplete}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            disabled={owner === '' || repo === ''}
            onClick={(e) => {
              handleSubmit(e);
            }}>
            Submit
          </Button>
          {
            link !== ''
              ?
              <div className="repo-link-wrapper">
                <Typography
                  variant="h6"
                  color="primary"
                  onClick={() => {
                    navigator.clipboard.writeText(link);
                  }}
                >
                  {link}
                </Typography>
              </div>
              :
              null
          }
        </form>
      </Paper>
    </FormContainer>
  );
};

export default GenFrom;