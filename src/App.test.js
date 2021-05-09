import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new EnzymeAdapter() });

const setup = () => shallow(<App />);

const findByTestAttribute = (wrapper, valueToFind) => wrapper.find(`[data-test='${valueToFind}']`);

const simulateMultipleClicks = (wrapper, valueToFind, numberOfClicks) => {
  for (let i = 1; i <= numberOfClicks; i++) {
    const buttonToClick = findByTestAttribute(wrapper, valueToFind);
    buttonToClick.simulate('click');
  }
}

test('renders non-empty component without crashing', () => {
  const wrapper = setup();
  const appComponent = findByTestAttribute(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const buttonComponent = findByTestAttribute(wrapper, 'increment-button');
  expect(buttonComponent.length).toBe(1);
});

test('render counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttribute(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter display start at 0', () => {
  const wrapper = setup();
  const count = findByTestAttribute(wrapper, "count").text();
  expect(count).toBe('0');
});

test('clicking button increments counter display', () => {
  const wrapper = setup();

  // find the button
  const buttonComponent = findByTestAttribute(wrapper, 'increment-button');

  // click the button
  buttonComponent.simulate('click');

  // find the display, test that the number has incremented
  const count = findByTestAttribute(wrapper, "count").text();
  expect(count).toBe('1')

});

test('render decrement button', () => {
  const wrapper = setup();
  const decrementBtn = findByTestAttribute(wrapper, 'decrement-button');
  expect(decrementBtn.length).toBe(1)
});

test('clicking decrement button decrement display', () => {
  const wrapper = setup();
  const incrementBtn = findByTestAttribute(wrapper, 'increment-button');
  incrementBtn.simulate('click');

  const decrementBtn = findByTestAttribute(wrapper, 'decrement-button');
  decrementBtn.simulate('click');

  const count = findByTestAttribute(wrapper, 'count').text();
  expect(count).toBe('0');

});

test('decrement wont go bellow 0', () => {

  const wrapper = setup();

  simulateMultipleClicks(wrapper, 'increment-button', 2);
  simulateMultipleClicks(wrapper, 'decrement-button', 3);

  const count = findByTestAttribute(wrapper, 'count').text();
  expect(count).toBe('0');
});

test('click decrement bellow 0 display error msg', () => {

  const wrapper = setup();

  simulateMultipleClicks(wrapper, 'increment-button', 2);
  simulateMultipleClicks(wrapper, 'decrement-button', 3);

  const errorMessage = findByTestAttribute(wrapper, 'error-display');
  expect(errorMessage.length).toBe(1);

})
