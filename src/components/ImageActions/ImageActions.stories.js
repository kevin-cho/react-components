import React from 'react';
import ImageActions from '.';
import './ImageActions.css';

export default {
  title: 'ImageActions',
  component: ImageActions
};

export const Test = () => (
  <ImageActions src="https://images.unsplash.com/photo-1519098901909-b1553a1190af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1867&q=80" />
);
