"use client";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React from "react";

interface ServiceFiltersProps {
    onSearchChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export const ServiceFilters: React.FC<ServiceFiltersProps> = ({
    onSearchChange,
    onStatusChange,
}) => {
    return (
        <div className="flex gap-4 mb-4">
            <Input
                placeholder="Search services..."
                onChange={(e) => onSearchChange(e.target.value)}
                className="max-w-xs"
            />
            <Select onValueChange={onStatusChange} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}; 