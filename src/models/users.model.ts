import {
  ModelFactory,
  ModelRelatedNodesI,
  Neogma,
  NeogmaInstance,
  NeogmaModel,
} from "neogma";
import { Orders, OrdersInstance } from "./orders.model";

/* --> the interface of the properties of the Instance (properties of the node). They match the schema definition */
type UserPropertiesI = {
  name: string;
  age?: number;
  id: string;
};

/* --> (optional) types for the methods of the Instance. This has to be defined only if methods are used */
export interface MethodsI {
  /* --> 'this' needs to be cast as the Instance of this Model (in this example, it is defined a few lines below) */
  bar: (this: UsersInstance) => string;
}

/* --> (optional) types for the statics of the Model. This has to be defined only if statics are used */
export interface StaticsI {
  foo: () => string;
}

/* --> the type of the Instance of this Model. Its generics are interfaces that are defined in this file */
export type UsersInstance = NeogmaInstance<UserPropertiesI, object, MethodsI>;

export interface UsersRelatedNodesI {
  orders: ModelRelatedNodesI<
    /* --> the related Model */
    ReturnType<
      typeof Orders
    > /* --> when refering to the same Model that is currently being defined, this line must be replaced with `{ createOne: typeof Orders["createOne"] }` */,
    /* --> the type of the Instance of the related Model. It should have a definition to correspond to `UsersInstance`, as defined below */
    OrdersInstance,
    /* --> (optional) the interface of the relationship properties, which will be used while creating the relationship. The keys are the aliases to be used to indicate that the property refers to a relationship property */
    {
      Rating: number;
    },
    /* --> (optional) the interface of the relationship properties, as they are in the database. The keys are the actual property names */
    {
      rating: number;
    }
  >;
}

export const Users = (
  neogma: Neogma,
): NeogmaModel<UserPropertiesI, UsersRelatedNodesI, MethodsI, StaticsI> =>
  ModelFactory<
    UserPropertiesI,
    UsersRelatedNodesI,
    StaticsI, // --> optional, needed only if they are defined
    MethodsI // --> optional, needed only if they are defined
  >(
    {
      /* --> the label that the nodes of this Model have. For multiple labels, an array can be provided like ['User', 'New'] */
      label: "User",
      /* --> The properties of the nodes of this Model and the validation for them. This follows the revalidator schema configuration */
      schema: {
        name: {
          type: "string",
          minLength: 3,
          required: true,
        },
        age: {
          type: "number",
          minimum: 0,
        },
        id: {
          type: "string",
          required: true,
        },
      },
      relationships: {
        /* --> an arbitrary alias to be used for identifying this relationship when using the relationship-related functions */
        orders: {
          /* --> reference to the Orders Model. For reference to this model, the value 'self' can be used */
          model: Orders(neogma),
          /* --> the direction of the relationship. Valid values are 'in' | 'out' | 'none' */
          direction: "out",
          /* --> the name of this relationship */
          name: "CREATES",
          /* --> properties of the relationship between the nodes */
          properties: {
            /* --> the key to be used that the property is a relationship property */
            Rating: {
              /* --> the actual property to be created in the relationship */
              property: "rating",
              /* --> schema validation for it */
              schema: {
                type: "number",
              },
            },
          },
        },
      },
      /* --> (optional) the key to be used as a unique identifier, which enables some Instance methods */
      primaryKeyField: "id",
      /* --> (optional) statics to be added to the Model. In this example, can be called using `Users.foo()` */
      statics: {
        foo: () => {
          return "foo";
        },
      },
      /* --> (optional) methods to be added to the Instance of this Model. In this example, they can be called on a Users Instance using `user.bar()` */
      methods: {
        bar: function () {
          /* --> returns the name of this node with a friendly text */
          return "The name of this user is: " + this.name;
        },
      },
    },
    neogma,
  );
