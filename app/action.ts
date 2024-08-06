"use server";

export const formSubmit = async (prevData: any, data: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (data.get("password") === "12345") {
    return {
      success: ["Welcome Back!"],
    };
  } else {
    return {
      errors: ["Wrong Password"],
    };
  }
};
