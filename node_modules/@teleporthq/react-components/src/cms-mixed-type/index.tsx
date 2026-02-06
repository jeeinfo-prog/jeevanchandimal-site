import React from 'react'

// These are permisive props,
// we wont enforce type safety on
// props for each case
type ItemDataType = Record<string, unknown> & { typeId: string, __component?: string, attributes?: Record<string, unknown> };
export type MappingConfigurationType = {
  [key: string]: (props: { [key: string]: any }) => JSX.Element;
}

export interface CMSMixedTypeProps {
  itemData: ItemDataType,
  mappingConfiguration: MappingConfigurationType
  renderDefault?: (itemData: ItemDataType) => JSX.Element
  renderError?: (err: any) => JSX.Element
}

export const CMSMixedType = ({ itemData, mappingConfiguration, renderDefault, renderError }: CMSMixedTypeProps) => {
  try {
    if (mappingConfiguration?.[itemData.typeId]) {
      return <>{mappingConfiguration[itemData.typeId]?.(itemData.attributes ?? itemData) ?? null}</>
    }

    if (itemData.__component && mappingConfiguration?.[itemData.__component]) {
      return <>{mappingConfiguration[itemData.__component]?.(itemData.attributes ?? itemData) ?? null}</>
    }
    return <>{renderDefault ? renderDefault(itemData) : "default case"}</>
  } catch (err) {
    return <>{renderError ? renderError(err) : "error case"}</>
  }
};

export default CMSMixedType
