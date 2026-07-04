import moment from "moment";
import { AppError } from "./app.error.js";

type dateType = Date | string | null;

export const checkHourDateDiff = (date: dateType): number => {
  if (!date) {
    throw new AppError("password reset token not found", 400);
  }
  const now = moment();
  const tokenSendAt = moment(date);

  const difference = moment.duration(now.diff(tokenSendAt));

  return difference.asHours();
};
