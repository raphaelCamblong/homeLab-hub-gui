import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe, MoreHorizontal, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/index";
import { rolesApi } from "@/lib/api/roles";
import { Role } from "@/types/auth";
import { PermissionsManagments } from "./PermissionsManagments";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

async function getRoles() {
  "use server";
  try {
    const response = await rolesApi.getAll({
      cache: "no-store",
    });
    return response;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    console.error(error);
    throw new Error("Failed to load roles");
  }
}

export async function RolesManagement() {
  const roles = await getRoles();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Roles Management</CardTitle>
          <Button>
            <Shield className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10px]"></TableHead>
                <TableHead>Role Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role: Role) => (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TableRow key={role.name}>
                      <TableCell>
                        <Globe className="h-3 w-3" />
                      </TableCell>
                      <TableCell>
                        <span className="ml-2">{role.name}</span>
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              Assign role to user
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              Remove role from user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex items-center gap-1 p-2">
                      <p>Role ID: {role.ID}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TableBody>
          </Table>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
