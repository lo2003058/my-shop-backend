// src/auth/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CustomersService } from '../customers/customers.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private customersService: CustomersService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // Ensures the token hasn't expired
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Validates the JWT payload.
   * @param payload - The decoded JWT payload.
   * @returns The customer object without the password.
   */
  async validate(payload: any) {
    const customer = await this.customersService.findOne(payload.sub, {
      include: { customerPoints: true, tier: true },
    });

    if (!customer) {
      throw new UnauthorizedException();
    }

    const { password, ...result } = customer;
    return result;
  }
}
