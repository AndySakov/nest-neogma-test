import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PublicModule } from "./public/public.module";
import { ConfigModule } from "@nestjs/config";
import { NeogmaModule } from "nest-neogma";
import { SequelizeModule } from "@nestjs/sequelize";
// import { ConfigModule, ConfigService } from "@nestjs/config";
import { ModelsModule } from "./models/models.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    NeogmaModule.fromEnv({
      name: "staging",
      retryAttempts: 2,
      retryDelay: 1000,
    }),
    // NeogmaModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) =>
    //     ({
    //       host: configService.get<string>("NEO4J_HOST"),
    //       password: configService.get<string>("NEO4J_PASSWORD"),
    //       port: configService.get<string>("NEO4J_PORT"),
    //       scheme: configService.get<string>("NEO4J_SCHEME"),
    //       username: configService.get<string>("NEO4J_USERNAME"),
    //       database: configService.get<string>("NEO4J_DATABASE"),
    //     } as Neo4jConnection),
    // }),
    NeogmaModule.forRoot({
      host: "localhost",
      password: "middleware",
      port: 7687,
      scheme: "neo4j",
      username: "neo4j",
      database: "neo4j",
      // models: [...insert model facades here],
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "root",
      database: "test",
      models: [],
    }),
    PublicModule,
    ModelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
