import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CustomerPointType } from './customerPoint.type';
import { CustomerAddressType } from './customerAddress.type';
import { TiersType } from '../../tiers/dto/tiers.type';
import { CustomerWishListType } from '../../customer-wish-list/dto/cutomer-wish-list.type';

@ObjectType()
export class CustomerType {
  @Field(() => Int)
  id: number;

  @Field()
  password: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  country_code?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field()
  isEmailVerified: boolean;

  @Field()
  isPhoneVerified: boolean;

  @Field()
  isSubscribed: boolean;

  @Field(() => CustomerPointType, { nullable: true })
  customerPoints?: CustomerPointType[];

  @Field(() => TiersType, { nullable: true })
  tier?: TiersType;

  // Uncomment and define this field if needed in the future
  // @Field({ nullable: true })
  // Order?: string;

  @Field(() => [CustomerAddressType], { nullable: true })
  customerAddress?: CustomerAddressType[];

  @Field(() => [CustomerWishListType], { nullable: true })
  customerWishList?: CustomerWishListType[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
