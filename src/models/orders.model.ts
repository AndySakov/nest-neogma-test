import { ModelFactory, Neogma, NeogmaInstance, NeogmaModel } from "neogma";

/* --> the interface of the properties of the Instance (properties of the node). They match the schema definition */
type OrderPropertiesI = {
  orderNumber?: number;
  id: string;
};

/* --> (optional) types for the methods of the Instance. This has to be defined only if methods are used */
export interface MethodsI {
  /* --> 'this' needs to be cast as the Instance of this Model (in this example, it is defined a few lines below) */
  bar: (this: OrdersInstance) => string;
}

/* --> (optional) types for the statics of the Model. This has to be defined only if statics are used */
export interface StaticsI {
  foo: () => string;
}

/* --> the type of the Instance of this Model. Its generics are interfaces that are defined in this file */
export type OrdersInstance = NeogmaInstance<OrderPropertiesI, object, MethodsI>;

export const Orders = (
  neogma: Neogma,
): NeogmaModel<OrderPropertiesI, object, MethodsI, StaticsI> =>
  ModelFactory<
    OrderPropertiesI,
    object,
    StaticsI, // --> optional, needed only if they are defined
    MethodsI // --> optional, needed only if they are defined
  >(
    {
      /* --> the label that the nodes of this Model have. For multiple labels, an array can be provided like ['Order', 'New'] */
      label: "Order",
      /* --> The properties of the nodes of this Model and the validation for them. This follows the revalidator schema configuration */
      schema: {
        orderNumber: {
          type: "number",
          minimum: 0,
        },
        id: {
          type: "string",
          required: true,
        },
      },
      /* --> (optional) the key to be used as a unique identifier, which enables some Instance methods */
      primaryKeyField: "id",
      /* --> (optional) statics to be added to the Model. In this example, can be called using `Orders.foo()` */
      statics: {
        foo: () => {
          return "foo";
        },
      },
      /* --> (optional) methods to be added to the Instance of this Model. In this example, they can be called on a Orders Instance using `Order.bar()` */
      methods: {
        bar: function () {
          /* --> returns the name of this node with a friendly text */
          return "The number of this Order is: " + this.orderNumber;
        },
      },
    },
    neogma,
  ); // <-- the neogma instance is used
