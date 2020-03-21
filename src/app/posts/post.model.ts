export interface Post {
  readonly id?: string;
  title: string;
  content: string;
  readonly authur?: string;
  date_last_modified?: number;
}
