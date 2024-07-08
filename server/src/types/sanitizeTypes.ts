export interface SanitizeableRegisterFields {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
}

export interface SanitizeOptions {
  allowedTags: [];
  allowedAttributes: Record<string, string[]>;
}
