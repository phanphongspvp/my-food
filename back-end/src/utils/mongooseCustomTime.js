const moment = require("moment");

module.exports = {
  mongoosesCustomTimeAt: function (mongooses) {
    return mongooses.map((mongooses) => {
      const customCreatedAt = moment(mongooses.createdAt).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      const customUpdateAt = moment(mongooses.updatedAt).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      const customDeletedAt = moment(mongooses.deletedAt).format(
        "DD/MM/YYYY HH:mm:ss"
      );

      return {
        ...mongooses.toJSON(),
        createdAt: customCreatedAt,
        updatedAt: customUpdateAt,
        deletedAt: customDeletedAt,
      };
    });
  },
};
