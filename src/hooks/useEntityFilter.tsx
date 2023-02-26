import { ChangeEvent, useCallback } from 'react';
import { useNavigate, useSearch } from 'react-location';

import { LocationGenerics } from '@/components/Router/Router';

export function useEntityFilter(
  allParamString: string,
  filterParamString: string,
): { filter?: string; onToggleHandler: (e: ChangeEvent<HTMLInputElement>) => void } {
  const navigate = useNavigate<LocationGenerics>();
  const { filter } = useSearch<LocationGenerics>();

  const onToggleHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const checked = e.target.checked;
      if (checked) {
        navigate({
          search: (old) => ({
            ...old,
            filter: allParamString,
          }),
        });
      } else {
        navigate({
          search: (old) => ({
            ...old,
            filter: filterParamString,
          }),
        });
      }
    },
    [navigate, allParamString, filterParamString],
  );

  return {
    onToggleHandler,
    filter,
  };
}
