import { Table, Divider, Tag } from 'antd';
import React, {Component} from 'react';

const columns = [
    {
        title: 'Product Id',
        dataIndex: 'id',
        key: 'id',
        render: text => <a>{text}</a>,
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Transaction Date',
        dataIndex: 'date',
        key: 'date',
    },
    {
        title: 'Transaction Type',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
        {tags.map(tag => {
            let color;
            if (tag === 'checkin')
                color = 'green';
            else if(tag === 'shipped')
                color = 'volcano';
            return (
                <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                </Tag>
            );
        })}
      </span>
        ),
    },
];

class TransactionTable extends Component {
    render() {
        return (
            <div>
                {/*<h3>Transaction Table</h3>*/}
                <Table columns={columns} dataSource={this.props.data} size={"small"} />
            </div>
        );
    }
}

export default TransactionTable;

