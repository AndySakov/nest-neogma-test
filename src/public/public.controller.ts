import { Controller, Get } from "@nestjs/common";
import { PublicService } from "./public.service";

@Controller("public")
export class PublicController {
  constructor(private readonly publicService: PublicService) {}

  @Get()
  async getHello(): Promise<string> {
    return this.publicService.getHello();
  }

  @Get("demo")
  async loadDemo(): Promise<unknown> {
    return this.publicService.loadDemo();
  }

  @Get("/model/demo")
  async modelDemo(): Promise<unknown> {
    return this.publicService.modelDemo();
  }
}
