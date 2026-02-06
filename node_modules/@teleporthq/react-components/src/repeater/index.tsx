import React from "react";

interface RepeaterBasic<T> {
  items: T[];
  renderItem: (item: T, index: number) => JSX.Element;
  renderEmpty?: () => JSX.Element;
}

interface RepeaterMetaProps<T, K> {
  items: { data: T[]; teleportMeta: K };
  renderItem: (item: T & Partial<K>, index: number) => JSX.Element;
  renderEmpty?: () => JSX.Element;
}

const Repeater = <T extends unknown, K extends Record<string, unknown>>(
  props: RepeaterMetaProps<T, K> | RepeaterBasic<T>
) => {
  const { items, renderItem, renderEmpty } = props;

  if (typeof items === "undefined" || items === null) {
    return renderEmpty ? renderEmpty() : null;
  }

  if ("data" in items && "meta" in items) {
    const { data, meta } = items;

    if (Array.isArray(data) === false) {
      return null;
    }

    if (data.length === 0) {
      return renderEmpty ? renderEmpty() : null;
    }

    return (
      <>
        {data.map((item, index) =>
          typeof item === "object"
            ? renderItem({ ...item, teleportMeta: meta }, index)
            : renderItem(item as T & Partial<K>, index)
        )}
      </>
    );
  }

  if (!Array.isArray(items)) {
    return null;
  }

  if (items.length === 0) {
    return renderEmpty ? renderEmpty() : null;
  }

  return (
    <>{items.map((item, index) => renderItem(item as T & Partial<K>, index))}</>
  );
};

export default Repeater;
