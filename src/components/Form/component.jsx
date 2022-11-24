import React from "react";
import { FormProvider } from "react-hook-form";

function Component({ children, form }) {
  return <FormProvider {...form}>{children}</FormProvider>
}

export default Component;