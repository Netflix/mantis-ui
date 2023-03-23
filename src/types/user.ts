export interface User {
  email: string;
  googleGroups?: string[];
  isAdmin: boolean;
  name: string;
  token?: string;
}
