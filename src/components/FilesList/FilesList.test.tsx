import { beforeAll, describe, test } from 'vitest';

import FilesList from './FilesList';
import { mockMatchMedia, renderWithQueryClient } from '@/utils/vitest';

describe('FilesList', () => {
  beforeAll(mockMatchMedia);

  test('should render', () => {
    renderWithQueryClient(<FilesList />);
  });
});
