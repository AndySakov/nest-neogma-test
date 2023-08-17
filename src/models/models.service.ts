import { Injectable } from "@nestjs/common";
import { Neogma } from "neogma";
import { InjectConnection } from "nest-neogma";
import { Users } from "./users.model";
import { Orders } from "./orders.model";

@Injectable()
export class ModelsService {
  constructor(
    @InjectConnection()
    private neogma: Neogma,
  ) {}

  public Users = Users(this.neogma);
  public Orders = Orders(this.neogma);
}
