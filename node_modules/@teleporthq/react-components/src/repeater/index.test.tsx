import { render, screen, cleanup } from '@testing-library/react';
import { describe, it, afterEach, expect } from 'vitest'
import Repeater from './';
import '@testing-library/jest-dom'

afterEach(() => cleanup())

describe('Repeater', () => {
  it('renders complex items with objects', () => {
    const items = [{ name: 'item1'}, {name: 'item2'}, { name: 'item3' }];

    render(
      <Repeater
        items={items}
        renderItem={(item, index) => <div key={index}>{item.name}</div>}
        renderEmpty={() => <div>No items to display</div>}
      />
    );

    items.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('renders items', () => {
    const items = ['item1', 'item2', 'item3'];

    render(
      <Repeater
        items={items}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        renderEmpty={() => <div>No items to display</div>}
      />
    );

    items.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders empty state', () => {
    const items = [];

    render(
      <Repeater
        items={items}
        renderItem={(item, index) => <div key={index}>{item}</div>}
        renderEmpty={() => <div>No items to display</div>}
      />
    );

    expect(screen.getByText('No items to display')).toBeInTheDocument();
  });

  it('renders even when empty state is not defined', () => {
    const items = []
    render(<Repeater items={items} renderItem={(item) => <div>{item}</div>}  />)
    expect(document.body.innerHTML).toBe("<div></div>")
  })

  it('renders items and gives access to the pagination meta', () => {
    const params = {
      data: [{ name: 'user1'}, { name: 'user2'}, { name: 'user3'}],
      meta: { pagination: { total: 10, start: 5 }}
    }

    render(<Repeater items={params} renderItem={(item) => <div>{item.name}
      <span>total pages: {item.teleportMeta.pagination.total}</span>
      </div>}  />)
    console.log(document.body.innerHTML)
  })
});
