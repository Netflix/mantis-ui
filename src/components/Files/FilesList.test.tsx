import { beforeAll, describe, test } from 'vitest';

import { mockMatchMedia, renderWithQueryClient } from '@/utils/vitest';

import FilesList from './FilesList';

describe('FilesList', () => {
  beforeAll(mockMatchMedia);

  test('should render', () => {
    renderWithQueryClient(<FilesList />);
  });
});
