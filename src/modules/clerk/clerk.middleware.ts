import { Injectable, NestMiddleware } from '@nestjs/common';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

@Injectable()
export class ClerkMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    ClerkExpressRequireAuth()(req, res, next);
  }
}
