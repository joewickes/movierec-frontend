import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './../components/Welcome';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Welcome />, div);
  ReactDOM.unmountComponentAtNode(div);
});