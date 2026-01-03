import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useCurrencies() {
  const { data, error, isLoading } = useSWR("/api/currencies", fetcher);

  return {
    currencies: data?.currencies ?? [],
    isLoading,
    error,
  };
}
