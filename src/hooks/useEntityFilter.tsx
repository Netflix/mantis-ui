import { ChangeEvent, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useEntityFilter(
  allParamString: string,
  filterParamString: string,
): { filter: string | null; onToggleHandler: (e: ChangeEvent<HTMLInputElement>) => void } {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get('filter');

  console.log(searchParams, filter);

  const onToggleHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      if (checked) {
        searchParams.set('filter', allParamString);
        setSearchParams(searchParams);
      } else {
        searchParams.set('filter', filterParamString);
        setSearchParams(searchParams);
      }
    },
    [searchParams, allParamString, setSearchParams, filterParamString],
  );

  return {
    onToggleHandler,
    filter,
  };
}
