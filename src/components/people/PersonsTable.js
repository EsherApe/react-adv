import React, { Component } from 'react';
import {Table, Column} from 'react-virtualized';
import 'react-dnd';

class PersonsTable extends Component {
  render() {
    return (
      <div>
        {!!this.props.persons.length &&
        <Table
          rowCount={this.props.persons.length}
          rowGetter={this.rowGetter}
          rowHeight={40}
          headerHeight={50}
          width={700}
          height={300}
          overscanRowCount={5}
        >
          <Column
            label='first name'
            dataKey='firstName'
            width={300}
          />
          <Column
            label='last name'
            dataKey='lastName'
            width={250}
          />
          <Column
            label='email'
            dataKey='email'
            width={150}
          />
        </Table>}
      </div>
    );
  }

  rowGetter = ({index}) => {
    return this.props.persons[index];
  };
}

export default PersonsTable;
