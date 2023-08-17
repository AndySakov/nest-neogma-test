import { Module } from "@nestjs/common";
import { ModelsService } from "./models.service";

@Module({
  controllers: [],
  providers: [ModelsService],
})
export class ModelsModule {}
