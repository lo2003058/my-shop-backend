import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { join } from 'path';
import { TiersModule } from './tiers/tiers.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Auto-generates schema
      playground: true, // Enables GraphQL Playground
      context: ({ req }) => ({ req }), // Passes the HTTP request to the context
    }),
    PrismaModule,
    UsersModule,
    ProductsModule,
    CustomersModule,
    AuthModule,
    TiersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
