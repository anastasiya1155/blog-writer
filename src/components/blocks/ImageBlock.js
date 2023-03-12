import { Box, Button, TextField, Typography } from '@mui/material';
import { patchArticleBlock } from '../../api/routes';

const ImageBlock = ({ isEdit, onChange, block }) => {
  const onImageChange = (e) => {
    onChange({
      ...block,
      imageUrl: { ...block.imageUrl, url: e.target.value },
    });
  };

  const onCaptionChange = (e) => {
    onChange({
      ...block,
      imageUrl: { ...block.imageUrl, caption: e.target.value },
    });
  };

  const handleBlur = () => {
    patchArticleBlock(block.id, { data: JSON.stringify({ imageUrl: block.imageUrl }) });
  };

  return isEdit ? (
    <Box>
      <TextField
        value={block.imageUrl.url}
        onChange={onImageChange}
        label="Image url"
        fullWidth
        onBlur={handleBlur}
      />
      <Box sx={{ maxWidth: 850, margin: 'auto', marginTop: 2 }}>
        <img src={block.imageUrl.url} alt={block.imageUrl.caption} width="100%" />
        <TextField
          value={block.imageUrl.caption}
          onChange={onCaptionChange}
          fullWidth
          placeholder="Caption"
          variant="standard"
          onBlur={handleBlur}
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
