import React from 'react';
import PropTypes from 'prop-types';
import './ImageStrip.css';

/**
 * ImageStrip display an arbitrary number of images on the same row
 * so they all fill 100% of the parent's width and have all the same height.
 * Achieved with flexbox, which makes the images responsive
 *
 * Based on the following Codepen https://codepen.io/blimpage/pen/obWdgp
 */
export default class ImageStrip extends React.Component {
  static propTypes = {
    imageURLs: PropTypes.arrayOf(PropTypes.string).isRequired,
    padding: PropTypes.number,
  };

  static defaultProps = {
    padding: 5
  };

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      images: []
    };
  }

  componentDidMount() {
    const { imageURLs } = this.props;

    // load images in the background to get their width/height
    imageURLs.forEach(src => {
      const image = new Image();
      image.onload = this.onImageLoad;
      image.src = src;
    });
  }

  onImageLoad = event => {
    // an image has loaded, its width and height are now known
    const { height, src, width } = event.path[0];

    this.setState((state, props) => {
      const { images } = state;
      const { imageURLs } = props;

      // add an image aspect ratio and source to the list of images to be rendered
      const newImages = [
        ...images,
        {
          aspectRatio: width / height,
          src
        }
      ];

      // update the state with new image list and loaded flag
      return {
        loaded: newImages.length === imageURLs.length,
        images: newImages
      };
    });
  }

  render() {
    const { images, loaded } = this.state;
    const { padding } = this.props;

    if (!loaded) {
      return null;
    }

    return (
      <div className="strip">
        {images.map(({ aspectRatio, src }, index) => {
          const divStyle = {
            // allow the image container to grow by the image's aspect ratio, which will
            // give all images the same height while filling 100% of the width
            flex: aspectRatio,
            // add padding after the image (last one will be overriden via CSS class)
            paddingRight: padding
          };
          return (
            <div key={src} className="stripItem" style={divStyle}>
              <img src={src} alt="thumbnail" role="presentation" />
            </div>
          );
        })}
      </div>
    );
  }
}
