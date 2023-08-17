import { Injectable } from "@nestjs/common";
import { Neogma } from "neogma";
import { InjectConnection } from "nest-neogma";
import { ModelsService } from "src/models/models.service";

@Injectable()
export class PublicService {
  constructor(
    @InjectConnection("staging")
    private staging: Neogma,
    @InjectConnection()
    private prod: Neogma,
    private readonly models: ModelsService,
  ) {}

  async getHello(): Promise<string> {
    try {
      await this.staging.verifyConnectivity();
      await this.prod.verifyConnectivity();
      return "Connection Successful!";
    } catch (e) {
      console.log(e);
      return "Connection Failed!";
    }
  }

  async loadDemo(): Promise<unknown> {
    return await this.prod.queryRunner
      .run("MATCH (o:Organization) RETURN o LIMIT 5")
      .then(res => res.records.map(x => x.get("o").properties));
  }

  async modelDemo(): Promise<unknown> {
    const userWithOrder = await this.models.Users.createOne({
      id: "1",
      name: "Alex",
      orders: {
        properties: [
          {
            id: "3",
            orderNumber: 10,
            Rating: 4,
          },
        ],
      },
    });
    return userWithOrder;
  }
}
