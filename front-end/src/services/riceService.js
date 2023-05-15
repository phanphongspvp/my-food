import * as httpRequest from "~/utils/httpRequest";

export const riceMain = async () => {
  try {
    const res = await httpRequest.get("rices/main");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const dealMain = async () => {
  try {
    const res = await httpRequest.get("deals/main");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
