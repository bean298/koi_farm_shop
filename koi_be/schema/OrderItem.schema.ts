import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import {
  checkbox,
  integer,
  relationship,
  select,
} from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const OrderItem = list({
  access: {
    operation: {
      query: allowAll,
      create: allowAll,
      update: allowAll,
      delete: permissions.canManageOrder,
    },
  },

  ui: {
    hideCreate(args) {
      return !permissions.canManageOrder(args);
    },
    hideDelete(args) {
      return !permissions.canManageOrder(args);
    },
  },

  fields: {
    order: relationship({
      label: "Đơn hàng",
      ref: "Order",
      many: false,
    }),
    product: relationship({
      label: "Sản phẩm",
      ref: "Product",
      many: false,
    }),
    consignmentSale: relationship({
      label: "Sản phẩm ký gửi",
      ref: "ConsignmentSale",
      many: false,
    }),
    consignmentRaising: relationship({
      label: "Sản phẩm ký gửi nuôi",
      ref: "ConsigmentRaising",
      many: false,
    }),
    price: integer({
      label: "Gía",
      validation: {
        isRequired: true,
      },
    }),
    status: select({
      label: "Trạng thái",
      defaultValue: "Đang xử lý",
      options: [
        { label: "Hoàn thành", value: "Hoàn thành" },
        { label: "Đang xử lý", value: "Đang xử lý" },
        { label: "Đang chăm sóc", value: "Đang chăm sóc" },
        { label: "Kết thúc ký gửi", value: "Kết thúc ký gửi" },
        { label: "Đang giao hàng", value: "Đang giao hàng" },
      ],
    }),
    isStored: checkbox({
      label: "Ký gửi nuôi",
      defaultValue: false,
    }),
  },
});

export default OrderItem;
