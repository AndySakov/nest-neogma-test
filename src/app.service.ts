import { Injectable } from "@nestjs/common";
import { Neogma } from "neogma";
import { InjectConnection } from "nest-neogma";

@Injectable()
export class AppService {
  constructor(
    @InjectConnection()
    private neogma: Neogma,
  ) {}
  async getHello(): Promise<string> {
    try {
      await this.neogma.verifyConnectivity();
      return "Connection Successful!";
    } catch (e) {
      console.log(e);
      return "Connection Failed!";
    }
  }
}
