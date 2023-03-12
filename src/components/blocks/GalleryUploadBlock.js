import { Box, Button, Stack, TextField } from '@mui/material';
import { Carousel } from 'react-carousel-minimal';

const captionStyle = {
  fontSize: '2em',
  fontWeight: 'bold',
};
const slideNumberStyle = {
  fontSize: '20px',
  fontWeight: 'bold',
};

const GalleryBlock = ({ isEdit, block, onChange }) => {
  const onFilesChange = (e) => {
    onChange({
      ...block,
      images: [...block.images, ...e.target.files],
      imageUrls: [
        ...block.imageUrls,
        ...[...e.target.files].map((img) => ({ url: URL.createObjectURL(img), caption: '' })),
      ],
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
    onChange({
      ...block,
      images: block.images.filter((img, i) => i !== index),
      imageUrls: block.imageUrls.filter((img, i) => i !== index),
    });
  };

  return isEdit ? (
    <Box>
      <Button variant="contained" component="label" sx={{ marginBottom: 2 }} color="secondary">
        Upload Files
        <input type="file" hidden accept="image/*" multiple onChange={onFilesChange} />
      </Button>
      <Stack gap={2}>
        {block.imageUrls.map((img, i) => (
          <Box key={i} sx={{ maxWidth: 850, margin: 'auto' }}>
            <img src={img.url} alt={img.caption} width="100%" />
            <Stack gap={2} direction="row">
              <TextField
                value={img.caption}
                onChange={(e) => onCaptionsChange(e, i)}
                fullWidth
                placeholder="Caption"
                variant="standard"
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
