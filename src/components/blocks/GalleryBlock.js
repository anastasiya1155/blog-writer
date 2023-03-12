import { Box, Button, Stack, TextField } from '@mui/material';
import { Carousel } from 'react-carousel-minimal';
import { patchArticleBlock } from '../../api/routes';

const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
};
const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const GalleryBlock = ({ isEdit, block, onChange }) => {
  const onImagesChange = (e, i) => {
    const newImages = [...block.imageUrls];
    newImages[i].url = e.target.value;
    onChange({
      ...block,
      imageUrls: newImages,
    });
  };

  const onCaptionsChange = (e, i) => {
    const newUrls = [...block.imageUrls];
    newUrls[i].caption = e.target.value;
    onChange({
      ...block,
      imageUrls: newUrls,
    });
  };

  const onImageRemoved = (index) => {
    const newImageUrls = block.imageUrls.filter((img, i) => i !== index);
    onChange({
      ...block,
      images: block.images.filter((img, i) => i !== index),
      imageUrls: newImageUrls,
    });
    patchArticleBlock(block.id, { data: JSON.stringify({ imageUrls: newImageUrls }) });
  };

  const onImageAdded = () => {
    onChange({ ...block, imageUrls: [...block.imageUrls, { url: '', caption: '' }] });
  };

  const handleBlur = () => {
    patchArticleBlock(block.id, { data: JSON.stringify({ imageUrls: block.imageUrls }) });
  };

  return isEdit ? (
    <Box>
      <Stack gap={2}>
        {block.imageUrls.map((img, i) => (
          <Box key={i} sx={{ maxWidth: 850, margin: 'auto', width: '100%' }}>
            <TextField
              value={img.url}
              onChange={(e) => onImagesChange(e, i)}
              label="Image url"
              fullWidth
              onBlur={handleBlur}
            />
            <img src={img.url} alt={img.caption} width="100%" />
            <Stack gap={2} direction="row">
              <TextField
                value={img.caption}
                onChange={(e) => onCaptionsChange(e, i)}
                fullWidth
                placeholder="Caption"
                variant="standard"
                onBlur={handleBlur}
              />
              <Button
                onClick={() => onImageRemoved(i)}
                sx={{ flexShrink: 0 }}
                variant="contained"
                color="secondary"
              >
                Remove image
              </Button>
            </Stack>
          </Box>
        ))}
        <Button
          variant="contained"
          onClick={onImageAdded}
          sx={{ display: 'flex', alignItems: 'center', alignSelf: 'start' }}
          size="small"
          color="secondary"
        >
          <span style={{ fontSize: 20, marginRight: 10, position: 'relative', top: -1 }}>+</span>
          Add image
        </Button>
      </Stack>
    </Box>
  ) : (
    <Box>
      <Carousel
        data={block.imageUrls.map((i) => ({ image: i.url, caption: i.caption }))}
        width="850px"
        height="500px"
        radius="10px"
        slideNumber={true}
        captionStyle={captionStyle}
        slideNumberStyle={slideNumberStyle}
        captionPosition="bottom"
        dots={true}
        pauseIconColor="white"
        pauseIconSize="40px"
        slideBackgroundColor="darkgrey"
        slideImageFit="cover"
        thumbnails={true}
        thumbnailWidth="150px"
        style={{
          textAlign: 'center',
          maxWidth: '850px',
          margin: 'auto',
        }}
      />
    </Box>
  );
};

export default GalleryBlock;
