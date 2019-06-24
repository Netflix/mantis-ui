export interface User {
  name: string;
  email: string;
  isAdmin: boolean;
  token?: string;
  googleGroups?: string[];
}
