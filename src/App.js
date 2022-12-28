import { useState } from 'react';
import {
  createTheme,
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
} from '@mui/material';
import PlusIcon from '@mui/icons-material/Add';
import TextBlock from './blocks/TextBlock';
import { emptyBlocks } from './consts';
import GalleryBlock from './blocks/GalleryBlock';
import MapBlock from './blocks/MapBlock';
import './App.css';

const theme = createTheme();

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

  const getBlockByType = (block, i) => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlock
            isEdit={isEdit}
            block={block}
            key={i}
            onChange={(body) => {
              handleBlockChange({ ...block, body }, i);
            }}
          />
        );
      case 'gallery': {
        return (
          <GalleryBlock
            block={block}
            key={i}
            isEdit={isEdit}
            onChange={(newBlock) => handleBlockChange(newBlock, i)}
          />
        );
      }
      case 'map': {
        return (
          <MapBlock
            block={block}
            key={i}
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
        component="main"
        sx={{
          borderLeft: '1px solid black',
          borderRight: '1px solid black',
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >
        <Stack direction="column" gap={4}>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={isEdit} onChange={(e) => setEdit(e.target.checked)} />}
              label="Is edit mode"
            />
          </FormGroup>
          {blocks.map(getBlockByType)}
          {isEdit && (
            <Button
              id="add-button"
              size="large"
              startIcon={<PlusIcon />}
              variant="contained"
              onClick={handleClick}
            >
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
            <MenuItem onClick={() => handleSelect('gallery')}>Gallery</MenuItem>
            <MenuItem onClick={() => handleSelect('map')}>Map</MenuItem>
          </Menu>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
