import {
  Box,
  Button,
  Fab,
  FormControlLabel,
  FormGroup,
  Menu,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useContext, useEffect, useMemo, useState } from 'react';
import { emptyBlocks } from '../consts';
import TextBlock from '../components/blocks/TextBlock';
import GalleryBlock from '../components/blocks/GalleryBlock';
import MapBlock from '../components/blocks/MapBlock';
import ImageBlock from '../components/blocks/ImageBlock';
import YouTubeBlock from '../components/blocks/YouTubeBlock';
import { useParams, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';
import { deleteArticleBlock, getArticle, getArticleBlocks, postArticleBlock } from '../api/routes';

const Blog = ({ isEdit }) => {
  const [article, setArticle] = useState(null);
  const [blocks, setBlocks] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const params = useParams();
  const { user } = useContext(AuthContext);
  const isAuthenticated = useMemo(() => article && user?.id === article?.user_id, [article, user]);

  const handleModeToggle = () => {
    navigate(isEdit ? `/article/${params.id}` : `/article/${params.id}/edit`);
  };

  useEffect(() => {
    getArticle(params.id).then(setArticle);
    getArticleBlocks(params.id).then((resp) =>
      setBlocks(resp.data.map((b) => ({ ...b, ...b.data }))),
    );
  }, [params.id]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (type) => {
    const { type: _, ...newEmptyBlock } = emptyBlocks[type]();
    postArticleBlock({
      blog_post_id: params.id,
      type,
      position: blocks[blocks.length - 1]?.position + 1 || 0,
      data: newEmptyBlock,
    }).then((resp) => {
      setBlocks((prev) => [...prev, { ...resp, ...resp.data }]);
    });
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
    deleteArticleBlock(blocks[index].id);
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
    <Stack direction="column" gap={4}>
      {(isAuthenticated || isEdit) && (
        <FormGroup>
          <FormControlLabel
            control={
              <Switch checked={isEdit} onChange={(e) => handleModeToggle(e.target.checked)} />
            }
            label="Is edit mode"
          />
        </FormGroup>
      )}
      <Typography variant="h3" sx={{ textAlign: 'center' }}>
        {article?.title}
      </Typography>
      {blocks.map((block, i) => (
        <Box sx={{ position: 'relative' }} key={i}>
          {getBlockByType(block, i)}
          {isEdit && (
            <Fab
              sx={{ position: 'absolute', top: 0, right: 0, transform: 'translate(30%, -30%)' }}
              color="secondary"
              size="small"
              onClick={() => handleBlockRemove(i)}
            >
              <CloseIcon />
            </Fab>
          )}
        </Box>
      ))}
      {isEdit && (
        <Button
          id="add-button"
          size="large"
          variant="contained"
          onClick={handleClick}
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ fontSize: 20, marginRight: 10, position: 'relative', top: -1 }}>+</span>
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
  );
};

export default Blog;
