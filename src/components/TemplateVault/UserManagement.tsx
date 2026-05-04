
"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, UserPlus, Shield, UserCircle, Key } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { UserAccount, UserRole, getStoredUsers, saveUsers } from '@/lib/auth';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function UserManagement() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newPin, setNewPin] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("Officer");
  const { toast } = useToast();

  useEffect(() => {
    setUsers(getStoredUsers());
  }, []);

  const handleAddUser = () => {
    if (!newUsername || newPin.length < 7) {
      toast({
        title: "Validation Error",
        description: "Username required and PIN must be 7 digits.",
        variant: "destructive"
      });
      return;
    }

    if (users.some(u => u.username.toLowerCase() === newUsername.toLowerCase())) {
      toast({
        title: "Duplicate User",
        description: "This username is already registered.",
        variant: "destructive"
      });
      return;
    }

    const newUser: UserAccount = {
      id: crypto.randomUUID(),
      username: newUsername,
      pin: newPin,
      role: newRole
    };

    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setNewUsername("");
    setNewPin("");
    toast({
      title: "Account Created",
      description: `${newUsername} has been added as ${newRole}.`
    });
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (name.toLowerCase() === 'admin') {
      toast({
        title: "Action Restricted",
        description: "The root admin account cannot be removed.",
        variant: "destructive"
      });
      return;
    }

    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
    toast({
      title: "Account Removed",
      description: `User ${name} has been scrubbed from records.`
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-card/40 border-white/5 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-headline">
            <UserPlus className="w-5 h-5 text-primary" />
            Provision New Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Username</Label>
              <Input 
                value={newUsername} 
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="ID Name"
                className="bg-muted/40 border-white/10 h-10"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">7-Digit PIN</Label>
              <Input 
                type="password"
                maxLength={7}
                value={newPin} 
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 7) setNewPin(val);
                }}
                placeholder="·······"
                className="bg-muted/40 border-white/10 h-10 tracking-[0.3em]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs uppercase tracking-widest text-muted-foreground">Role Clearance</Label>
              <Select value={newRole} onValueChange={(val: UserRole) => setNewRole(val)}>
                <SelectTrigger className="bg-muted/40 border-white/10 h-10">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-card border-white/10">
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Officer">Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddUser} className="bg-primary text-primary-foreground h-10 font-bold uppercase tracking-tighter">
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/20">
              <TableRow className="border-white/5">
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">Personnel</TableHead>
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">Role</TableHead>
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground">Security PIN</TableHead>
                <TableHead className="text-xs uppercase tracking-widest text-muted-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-white/5 hover:bg-white/[0.02] transition-colors">
                  <TableCell className="font-medium flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-primary" />
                    </div>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${user.role === 'Admin' ? 'text-accent' : user.role === 'Manager' ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className="text-xs font-semibold uppercase tracking-tighter">{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-muted-foreground/40 tracking-widest">
                    <div className="flex items-center gap-2">
                      <Key className="w-3 h-3" />
                      •••••••
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.username.toLowerCase() !== 'admin' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="hover:bg-destructive/10 hover:text-destructive transition-colors h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
