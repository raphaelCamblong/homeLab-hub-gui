import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/index";
import { permissionsApi } from "@/lib/api/roles";

async function getPermissions() {
  "use server";
  try {
    const response = await permissionsApi.getAll({
      cache: "no-store",
    });
    return response;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error(error);
    throw new Error("Failed to load permissions");
  }
}

export async function PermissionsManagments() {
  const permissions = await getPermissions().then((res) =>
    res.sort((a, b) => a.name.localeCompare(b.name))
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Permissions Management</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Permission Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Created At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.name}>
                <TableCell className="font-medium">{permission.name}</TableCell>
                <TableCell>{permission.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    <Badge key={permission.ID} variant="outline">
                      {permission.resource}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(permission.CreatedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
