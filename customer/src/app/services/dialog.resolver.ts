import { ResolveFn } from '@angular/router';

export const dialogResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
