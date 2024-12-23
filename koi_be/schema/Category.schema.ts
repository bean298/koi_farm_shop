import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text } from "@keystone-6/core/fields";
import { permissions } from "../auth/access";

const Category = list({
  access: {
    operation: {
      query: allowAll,
      create: allowAll,
      update: allowAll,
      delete: allowAll,
    },
  },

  ui: {
    hideCreate(args) {
      return !permissions.canManageProduct(args);
    },
    hideDelete(args) {
      return !permissions.canManageProduct(args);
    },
  },

  fields: {
    name: text({
      label: "Loại cá",
      validation: {
        isRequired: true,
      },
    }),
    description: text({
      label: "Mô tả về loại cá",
    }),
  },
});

export default Category;
