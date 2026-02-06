import React, { useState, useEffect, useRef } from "react";

type Status = "idle" | "loading" | "success" | "error";

interface DataProviderProps<T, P> {
  fetchData?: (params: P) => Promise<T>;
  params?: P;
  initialData?: T;
  persistDataDuringLoading?: boolean;
  renderLoading?: () => JSX.Element;
  renderSuccess: (data: T, isLoading: boolean) => JSX.Element;
  renderError?: (error: Error) => JSX.Element;
}

const DataProvider = <T, P>(props: DataProviderProps<T, P>) => {
  const {
    fetchData,
    params,
    initialData,
    persistDataDuringLoading = false,
    renderLoading = () => null,
    renderSuccess,
    renderError = () => null,
  } = props;

  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<any>(initialData);
  const [error, setError] = useState<Error | null>(null);
  const passFetchBecauseWeHaveInitialData = useRef(
    props.initialData !== undefined
  );

  const persistDataDuringLoadingRef = useRef(persistDataDuringLoading);
  persistDataDuringLoadingRef.current = persistDataDuringLoading;

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (passFetchBecauseWeHaveInitialData.current) {
      passFetchBecauseWeHaveInitialData.current = false;
      return;
    }

    const fetchDataAsync = async () => {
      setStatus("loading");
      if (!persistDataDuringLoadingRef.current) {
        setData(undefined);
      }
      try {
        const result = await fetchData(params);
        setData(result);
        setStatus("success");
      } catch (err) {
        setError(err as Error);
        setStatus("error");
      }
    };

    fetchDataAsync();
  }, [params, fetchData]);

  switch (status) {
    case "idle":
    case "loading":
      return props.persistDataDuringLoading && data
        ? renderSuccess(data, true)
        : renderLoading();
    case "success":
      return renderSuccess(data, false);
    case "error":
      return renderError(error!);
    default:
      return null;
  }
};

export default DataProvider;
