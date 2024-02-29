"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useEffect } from "react";

export default function Connect() {
  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Error: Something went wrong</AlertTitle>
      <AlertDescription>
        Unfortunately, an unexpected error occurred. You need to be logged in to
        access this feature.
      </AlertDescription>
    </Alert>
  );
}
