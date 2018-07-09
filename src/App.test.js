import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import React from 'react';
import App from './App';
import HomeContainer from './layouts/home/HomeContainer';
import {shallow, mount} from 'enzyme';

it('renders without crashing', () => {
  shallow(<App />);
  shallow(<HomeContainer />);
});
it('renders button click correctly', () => {
  const wrapper = mount(<App />);
  wrapper.find('.pure-form').value = 1;
  const transfer = wrapper.find('.pure-form:input');
  expect(transfer).toEqual(1);

  // const transfer = wrapper.find('.pure-button');
  // transfer.simulate('click');
})
