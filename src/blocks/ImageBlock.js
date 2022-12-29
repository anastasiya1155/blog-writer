import { Box, Button, TextField, Typography } from '@mui/material';

const ImageBlock = ({ isEdit, onChange, block }) => {
  const onFileChange = (e) => {
    onChange({
      ...block,
      image: e.target.files[0],
      imageUrl: { url: URL.createObjectURL(e.target.files[0]), caption: '' },
    });
  };

  const onCaptionChange = (e) => {
    onChange({
      ...block,
      imageUrl: { ...block.imageUrl, caption: e.target.value },
    });
  };

  return isEdit ? (
    <Box>
      <Button variant="contained" component="label" sx={{ marginBottom: 2 }} color="secondary">
        Upload Image
        <input type="file" hidden accept="image/*" onChange={onFileChange} />
      </Button>
      <Box sx={{ maxWidth: 850, margin: 'auto' }}>
        <img src={block.imageUrl.url} alt={block.imageUrl.caption} width="100%" />
        <TextField
          value={block.imageUrl.caption}
          onChange={onCaptionChange}
          fullWidth
          placeholder="Caption"
          variant="standard"
        />
      </Box>
    </Box>
  ) : (
    <Box sx={{ maxWidth: 850, margin: 'auto' }}>
      <img src={block.imageUrl.url} alt={block.imageUrl.caption} width="100%" />
      <Typography
        sx={{ width: '100%', textAlign: 'center', display: 'inline-block' }}
        variant="caption"
      >
        {block.imageUrl.caption}
      </Typography>
    </Box>
  );
};

export default ImageBlock;
