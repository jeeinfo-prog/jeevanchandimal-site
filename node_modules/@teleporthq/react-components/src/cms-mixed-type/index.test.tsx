import CMSMixedType from '.';

import { describe, expect, test, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'

afterEach(() => cleanup())

describe('CMSMixedType Component', () => {
  const renderErrorComponent = () => <div>Error Component</div>;
  const renderDefaultComponent = () => <div>Default Component</div>;

  it('should render the default case when itemData.typeId is not found in mappingConfiguration', () => {
    render(
      <CMSMixedType
        // let the error be, we are testing invalid input
        itemData={{ typeId: 'type123', attributes: {} }}
        mappingConfiguration={{
          type567: () => <div>Component Type 567</div>,
        }}
        renderDefault={renderDefaultComponent}
      />
    );

    expect(screen.getByText('Default Component')).toBeInTheDocument();
  });

  it('should render the component based on typeId when it is provided', () => {
    render(
      <CMSMixedType
        // let the error be, we are testing invalid input
        itemData={{ typeId: 'type567', attributes: {} }}
        mappingConfiguration={{
          type567: () => <div>Component Type 567</div>,
        }}
        renderDefault={renderDefaultComponent}
      />
    );

    expect(screen.getByText('Component Type 567')).toBeInTheDocument();
  });

  it('should render the error component when a component throws an error and renderError is provided', () => {
    // Define a mapping configuration where a component throws an error
    const errorThrowingMappingConfiguration = {
        'componentType1': () => {
          throw new Error('Component Error');
        },
        'componentType2': () => <div>Component Type 2</div>,
    };
  
    render(
      <CMSMixedType
        itemData={{ typeId: 'componentType1', attributes: {} }}
        mappingConfiguration={errorThrowingMappingConfiguration}
        renderDefault={renderDefaultComponent}
        renderError={renderErrorComponent}
      />
    );
  
    expect(screen.getByText('Error Component')).toBeInTheDocument();
  });

  it('should render the "error case" text when a component throws an error and no renderError is provided', () => {
    const errorThrowingMappingConfiguration = {
        'componentType1': () => {
          throw new Error('Component Error');
        },
        'componentType2': () => <div>Component Type 2</div>,
    };

    render(
      <CMSMixedType
        itemData={{ typeId: 'componentType1', attributes: {} }}
        mappingConfiguration={errorThrowingMappingConfiguration}
        renderDefault={renderDefaultComponent}
      />
    );
  
    expect(screen.getByText('error case')).toBeInTheDocument();
  });

  it('should render the "default case" text when typeId is not found and no renderDefault is provided', () => {
    render(
      <CMSMixedType
        itemData={{ typeId: 'type123', attributes: {} }}
        mappingConfiguration={{
          type567: () => <div>Component Type 567</div>,
        }}
      />
    );

    expect(screen.getByText('default case')).toBeInTheDocument();
  });

  it('item data is available in the rendered content', () => {
    render(
      <CMSMixedType
        itemData={{ typeId: 'type123', someTitle: "This is the rumbalucha" }}
        mappingConfiguration={{
          type123: (itemData) => {
            return <div>{itemData.someTitle}</div>
          },
        }}
      />
    );

    expect(screen.getByText('This is the rumbalucha')).toBeInTheDocument();
  });

});
