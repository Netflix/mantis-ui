import { MakeGenerics } from 'react-location';

export type IRouter = () => JSX.Element;

export type LocationGenerics = MakeGenerics<{
  Search: {
    redirect?: string;
    filter?: string;
  };
}>;
