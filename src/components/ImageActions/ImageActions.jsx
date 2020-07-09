import React, { useState } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  src: PropTypes.string.isRequired
};

// Example component to test out hooks
const ImageActions = ({ src }) => {
  const [rotation, setRotation] = useState(0);

  return (
    <div>
      <div>
        <span class="material-icons" onClick={() => setRotation(rotation - 90)}>rotate_left</span>
        <span class="material-icons" onClick={() => setRotation(rotation + 90)}>rotate_right</span>
      </div>
      <img src={src} style={{ transform: `rotate(${rotation}deg)` }} />
    </div>
  )
};

ImageActions.propTypes = propTypes;

export default ImageActions;
