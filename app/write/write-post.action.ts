"use server";

import { WritePostFormValues } from "./WritePostForm";

export const createPost = async (values: WritePostFormValues) => {
  console.log("im' a server function");
  return "";
};
