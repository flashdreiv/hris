import { endOfDay, startOfDay } from "date-fns";

const findExactDate = async (date, Schema) => {
  if (date) {
    const start = startOfDay(new Date(date));
    const end = endOfDay(new Date(date));
    const exactDate = await Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });
    return exactDate;
  } else {
    const start = startOfDay(new Date());
    const end = endOfDay(new Date());
    const exactDate = Schema.findOne({
      createdAt: {
        $gte: start,
        $lt: end,
      },
    });

    return exactDate;
  }
};

export { findExactDate };
