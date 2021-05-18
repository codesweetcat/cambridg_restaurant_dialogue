import renderer from 'react-test-renderer';
import TaskDescritionAndBriefing from './TaskDescriptionAndBriefing'

test('PageTaskDescriptionAndBriefing renders correctly', () => {
  const tree = renderer
    .create(<TaskDescritionAndBriefing />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
