import { LocationGenerics } from '@/components/Router/Router';
import { useCallback } from 'react';
import { useNavigate, useSearch } from 'react-location';

export function useEntityFilter(
  allParamString: string,
  filterParamString: string,
): { filter?: string; onToggleHandler: (checked: boolean) => void } {
  const navigate = useNavigate<LocationGenerics>();
  const { filter } = useSearch<LocationGenerics>();

  const onToggleHandler = useCallback(
    (checked: boolean) => {
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
