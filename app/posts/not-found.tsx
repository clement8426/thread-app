import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <Alert className="my-8">
      <AlertTriangle />
      <AlertTitle>Post not found</AlertTitle>
      <AlertDescription>No post exist </AlertDescription>
    </Alert>
  );
}
