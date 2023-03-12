import { Box, TextField } from '@mui/material';
import GoogleMapReact from 'google-map-react';
import { patchArticleBlock } from '../../api/routes';

const MapBlock = ({ isEdit, block, onChange }) => {
  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      //Create a new marker and use the map's center as the location.
      position: { lat: block.lat, lng: block.lng },
      map: map,
    });
  };

  const handleChange = (e) => {
    const [lat, lng] = e.target.value.split(', ');
    onChange({ ...block, lat: Number(lat), lng: Number(lng) });
  };

  const handleBlur = () => {
    patchArticleBlock(block.id, { data: JSON.stringify({ lat: block.lat, lng: block.lng }) });
  };

  return isEdit ? (
    <TextField
      value={[block.lat, block.lng].join(', ')}
      onChange={handleChange}
      placeholder="Lat, lng"
      fullWidth
      label="Coords (lat, lng)"
      onBlur={handleBlur}
    />
  ) : (
    <Box sx={{ width: '100%', height: 600 }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
        defaultCenter={{ lat: block.lat, lng: block.lng }}
        defaultZoom={11}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      />
    </Box>
  );
};

export default MapBlock;
