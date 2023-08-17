import { Module } from "@nestjs/common";
import { PublicService } from "./public.service";
import { PublicController } from "./public.controller";
import { ModelsService } from "src/models/models.service";

@Module({
  imports: [],
  controllers: [PublicController],
  providers: [PublicService, ModelsService],
})
export class PublicModule {}
