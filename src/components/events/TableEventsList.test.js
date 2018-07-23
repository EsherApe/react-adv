import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import events from '../../mocks/conferences';
import { EventsList } from './EventsList';
import Loader from '../common/Loader';
import { EventRecord } from '../../ducks/events';

Enzyme.configure({adapter: new Adapter()});

const testEvents = events.map(event => new EventRecord({...events, uid: Math.random().toString()}));

it('should render loader', (done) => {
  const container = shallow(<EventsList fetchAll={done} loading/>);

  expect(container.contains(<Loader/>));
});

it('should render event list', (done) => {
  const container = shallow(<EventsList fetchAll={done} events={testEvents}/>);
  const rows = container.find('.test__event-list--row');

  expect(rows.length).toEqual(testEvents.length);
});

it('should request fetch data', (done) => {
  const container = mount(<EventsList fetchAll={done} events={[]}/>);
});

it('should select event', () => {
  let selected = null;
  const selectEvent = (uid) => selected = uid;

  const container = mount(<EventList
    events = {testEvents}
    fetchAll = {() => {}}
    selectEvent = {selectEvent}
  />)

  container.find('.test--event-list__row').first().simulate('click');

  expect(selected).toEqual(testEvents[0].uid)
});