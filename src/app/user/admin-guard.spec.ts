import { AdminGuard } from './admin-guard';

describe('AdminGuard', () => {
  it('should create an instance', () => {
    expect(new AdminGuard()).toBeTruthy();
  });
});
