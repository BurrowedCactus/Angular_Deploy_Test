import { Observable } from 'rxjs';
import { User } from "./../user/user.module";

export interface Post {
  readonly id?: string;
  title: string;
  content: string;
  readonly user?: User;
  date_last_modified?: number;
}

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>


