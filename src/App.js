import { useState } from 'react';
import {
  CssBaseline,
  ThemeProvider,
  FormGroup,
  FormControlLabel,
  Switch,
  Container,
  Button,
  Menu,
  MenuItem,
  Stack,
  Paper,
  Box,
  Fab,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextBlock from './blocks/TextBlock';
import { emptyBlocks } from './consts';
import GalleryBlock from './blocks/GalleryBlock';
import MapBlock from './blocks/MapBlock';
import './App.css';
import { theme } from './theme';
import ImageBlock from './blocks/ImageBlock';
import YouTubeBlock from './blocks/YouTubeBlock';

function App() {
  const [isEdit, setEdit] = useState(true);
  const [blocks, setBlocks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (type) => {
    setBlocks((prev) => [...prev, emptyBlocks[type]()]);
    handleClose();
  };

  const handleBlockChange = (newBlock, i) => {
    setBlocks((prev) => {
      const newBlocks = [...prev];
      newBlocks[i] = newBlock;
      return newBlocks;
    });
  };

  const handleBlockRemove = (index) => {
    setBlocks((prev) => prev.filter((b, i) => i !== index));
  };

  const getBlockByType = (block, i) => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlock
            isEdit={isEdit}
            block={block}
            onChange={(body) => {
              handleBlockChange({ ...block, body }, i);
            }}
          />
        );
      case 'gallery': {
        return (
          <GalleryBlock
            block={block}
            isEdit={isEdit}
            onChange={(newBlock) => handleBlockChange(newBlock, i)}
          />
        );
      }
      case 'map': {
        return (
          <MapBlock
            block={block}
            isEdit={isEdit}
            onChange={(newBlock) => handleBlockChange(newBlock, i)}
          />
        );
      }
      case 'image': {
        return (
          <ImageBlock
            block={block}
            isEdit={isEdit}
            onChange={(newBlock) => handleBlockChange(newBlock, i)}
          />
        );
      }
      case 'youtube': {
        return (
          <YouTubeBlock
            block={block}
            isEdit={isEdit}
            onChange={(newBlock) => handleBlockChange(newBlock, i)}
          />
        );
      }
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component={Paper}
        elevation={4}
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
          minHeight: '100vh',
        }}
      >
        <Stack direction="column" gap={4}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isEdit} onChange={(e) => setEdit(e.target.checked)} />}
              label="Is edit mode"
            />
          </FormGroup>
          {blocks.map((block, i) => (
            <Box sx={{ position: 'relative' }} key={i}>
              {getBlockByType(block, i)}
              <Fab
                sx={{ position: 'absolute', top: 0, right: 0, transform: 'translate(30%, -30%)' }}
                color="secondary"
                size="small"
                onClick={() => handleBlockRemove(i)}
              >
                <CloseIcon />
              </Fab>
            </Box>
          ))}
          {isEdit && (
            <Button
              id="add-button"
              size="large"
              variant="contained"
              onClick={handleClick}
              xs={{ display: 'flex', alignItems: 'center' }}
            >
              <span style={{ fontSize: 20, marginRight: 10, position: 'relative', top: -1 }}>
                +
              </span>
              Add block
            </Button>
          )}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'add-button',
            }}
          >
            <MenuItem onClick={() => handleSelect('text')}>Text</MenuItem>
            <MenuItem onClick={() => handleSelect('image')}>Image</MenuItem>
            <MenuItem onClick={() => handleSelect('gallery')}>Gallery</MenuItem>
            <MenuItem onClick={() => handleSelect('map')}>Map</MenuItem>
            <MenuItem onClick={() => handleSelect('youtube')}>YouTube</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
