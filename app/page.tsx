import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Welcome to the CV Management Application</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-4">
            Explore the prototype and see how the autocomplete functionality works.
          </p>
          <Link href="/cv" passHref>
            <Button variant="default" className="w-full">
              Go to the CV Form
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
