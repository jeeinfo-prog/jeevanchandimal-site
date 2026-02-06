import DataProvider from './';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest'
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
})

describe('DataProvider', () => {
  it('shows loading state', async () => {
    render(
      <DataProvider
        fetchData={() => new Promise(() => {})}
        params={{}}
        persistDataDuringLoading={false}
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={(data: any) => <div>Success: {data}</div>}
        renderError={error => <div>Error: {error.message}</div>}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows success state', async () => {
    const fetchData = async () => 'mock data';

    render(
      <DataProvider
        fetchData={fetchData}
        params={{}}
        persistDataDuringLoading={false}
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={data => <div>Success: {data}</div>}
        renderError={error => <div>Error: {error.message}</div>}
      />
    );

    await waitFor( () => {
      expect(screen.getByText('Success: mock data')).toBeInTheDocument();
    })

  });

  it('shows error state', async () => {
    const fetchData = async () => { throw new Error('fetch failed') };

    render(
      <DataProvider
        fetchData={fetchData}
        params={{}}
        persistDataDuringLoading={false}
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={data => <div>Success: {data}</div>}
        renderError={error => <div>Error: {error.message}</div>}
      />
    );

    await waitFor( () => {
      expect(screen.getByText('Error: fetch failed')).toBeInTheDocument();
    })

  });

  it('shows success state with persisted data during loading', async () => {
    const fetchData = async (params: any) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return params.initial ? 'initial data' : 'new data';
    };

    const { rerender } = render(
      <DataProvider
        fetchData={fetchData}
        params={{ initial: true }}
        persistDataDuringLoading={true}
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={(data, isLoading) => (
          <div>
            Success: {data}
            {isLoading && ' (updating)'}
          </div>
        )}
        renderError={error => <div>Error: {error.message}</div>}
      />
    );

    await waitFor( () => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    })

    await waitFor( () => {
      expect(screen.getByText('Success: initial data')).toBeInTheDocument();
    })

    rerender(
      <DataProvider
        fetchData={fetchData}
        params={{ initial: false }}
        persistDataDuringLoading={true}
        renderLoading={() => <div>Loading...</div>}
        renderSuccess={(data, isLoading) => (
          <div>
            Success: {data}
            {isLoading && ' (updating)'}
          </div>
        )}
        renderError={error => <div>Error: {error.message}</div>}
      />
    );

    await waitFor( () => {
      expect(screen.getByText('Success: initial data (updating)')).toBeInTheDocument();
    })

    await waitFor( () => {
      expect(screen.getByText('Success: new data')).toBeInTheDocument();
    })

  });

  it('should render, even when renderLoading and renderError states are missing', async () => {

    render(
      <DataProvider
        initialData={"mock data"}
        persistDataDuringLoading={true}
        renderSuccess={(data) => <div>{data}</div>}
      />
    )

    await waitFor( () => {
      expect(screen.getByText('mock data')).toBeInTheDocument();
    })
  })
});
