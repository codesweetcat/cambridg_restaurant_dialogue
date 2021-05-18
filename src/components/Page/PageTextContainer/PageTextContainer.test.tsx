import React from 'react';
import PageTextContainer from './PageTextContainer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { api } from '../../../utils/testingAPI';

const mockCreateItem = (api.createItem = jest.fn());


test('input the correct', () => {
  const { getByLabelText, getByTestId } = render(<PageTextContainer />);
  const input = getByLabelText("utt-input");
  expect(input.value).toBe("");
  fireEvent.change(input, { target: { value: "Chinese restaurant in the cheap price range" }});
  expect(input.value).toBe("Chinese restaurant in the cheap price range");

  // fireEvent.keyDown(input, {charCode: 13});


});

test('after clicking on button, API called', async () => {
  mockCreateItem.mockResolvedValueOnce({
    
  })
  const { getByLabelText, getByTestId } = render(<PageTextContainer />);
  const input = getByLabelText("utt-input");
  fireEvent.change(input, { target: { value: "Chinese restaurant in the cheap price range" }});

  fireEvent.keyDown(input, {charCode: 13});

 
});