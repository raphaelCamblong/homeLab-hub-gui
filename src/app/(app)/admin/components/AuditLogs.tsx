import { AuditLog } from "@/types/api/audit";
import { auditApi } from "@/lib/api/audit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Suspense } from "react";
import PaginationControls from "@/components/navigation/pagination";
import { formatDate } from "@/lib/utils";

export async function AuditLogs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "10";

  const logs = await auditApi.getLogs(Number(page), Number(per_page), {
    cache: "no-store",
  });

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead>Details</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.logs.map((log: AuditLog) => (
                <TableRow key={log.ID}>
                  <TableCell>{formatDate(log.CreatedAt)}</TableCell>
                  <TableCell>{log.user_id}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        log.action.startsWith("create")
                          ? "success"
                          : log.action.startsWith("delete")
                            ? "destructive"
                            : "default"
                      }
                    >
                      {log.action}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {log.resource} {log.resource_id}
                  </TableCell>
                  <TableCell>{log.ip_address}</TableCell>
                  <TableCell>
                    {log.details ? JSON.stringify(log.details) : "-"}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="flex flex-col items-start">
                          <span className="font-semibold">User Agent:</span>
                          <span className="text-sm text-muted-foreground break-all max-w-[300px]">
                            {log.user_agent}
                          </span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <PaginationControls
            total={logs.total}
            per_page={Number(per_page)}
            hasNextPage={end < logs.total}
            hasPrevPage={start > 0}
          />
        </CardContent>
      </Card>
    </Suspense>
  );
}
