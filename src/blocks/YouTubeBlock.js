import { TextField } from '@mui/material';

const YouTubeBlock = ({ isEdit, block, onChange }) => {
  return isEdit ? (
    <TextField
      value={block.embedId}
      fullWidth
      label="YouTube id (11 symbols)"
      onChange={(e) => {
        onChange({
          ...block,
          embedId: e.target.value.length > 11 ? e.target.value.slice(11) : e.target.value,
        });
      }}
    />
  ) : (
    <div className="video-responsive" key={block.embedId}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${block.embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};

export default YouTubeBlock;
