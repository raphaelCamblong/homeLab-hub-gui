import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Key, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/index";
import { tokensApi } from "@/lib/api/tokens";
import ErrorBoundaryWithSuspense from "@/components/navigation/ErrorBoundaryWithSuspense";

async function getApiKeys() {
  "use server";
  try {
    const response = await tokensApi.getApiKeys({
      cache: "no-store",
    });
    return response;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new Error("Failed to load API keys");
  }
}

export async function TokenManagement() {
  const tokens = await getApiKeys();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>API Tokens</CardTitle>
          <Button>
            <Key className="mr-2 h-4 w-4" />
            Generate Token
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokens.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No tokens Generated
                </TableCell>
              </TableRow>
            )}
            {tokens.map((token: any) => (
              <TableRow key={token.id}>
                <TableCell className="font-medium">{token.name}</TableCell>
                <TableCell>
                  {new Date(token.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {token.last_used_at
                    ? new Date(token.last_used_at).toLocaleDateString()
                    : "Never"}
                </TableCell>
                <TableCell>
                  {token.expires_at ? (
                    <Badge
                      variant={
                        new Date(token.expires_at) < new Date()
                          ? "destructive"
                          : "default"
                      }
                    >
                      {new Date(token.expires_at).toLocaleDateString()}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Never</Badge>
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-destructive">
                        Revoke Token
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
