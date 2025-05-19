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
import { MoreHorizontal, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiError } from "@/lib/api/index";
import { rolesApi } from "@/lib/api/roles";
import { Role } from "@/types/auth";
import { PermissionsManagments } from "./PermissionsManagments";
import { RolesManagement } from "./RolesManagement";

export async function RBACManagement() {
  return (
    <div className="flex flex-col gap-4">
      <RolesManagement />
      <PermissionsManagments />
    </div>
  );
}
