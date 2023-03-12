import React from 'react';
import { TextField, Button, Grid } from '@mui/material';

const initialState = { title: '', id: 0 };

const CreateArticle = ({ handleSubmit, initialValues, handleCancel }) => {
  const [values, setValues] = React.useState(initialValues || initialState);

  React.useEffect(() => {
    setValues(initialValues || initialState);
  }, [initialValues]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(values);
        setValues(initialState);
      }}
    >
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item md={9} xs={12}>
          <TextField
            name="title"
            fullWidth
            variant="standard"
            label="Title"
            value={values.title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <Button type="submit">Submit</Button>
          <Button
            onClick={() => {
              handleCancel();
              setValues(initialState);
            }}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateArticle;
