
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
      toast({ title: "Validation Error", description: "Username required and PIN must be 7 digits.", variant: "destructive" });
      return;
    }
    if (users.some(u => u.username.toLowerCase() === newUsername.toLowerCase())) {
      toast({ title: "Duplicate User", description: "This username is already registered.", variant: "destructive" });
      return;
    }
    const newUser: UserAccount = { id: crypto.randomUUID(), username: newUsername, pin: newPin, role: newRole };
    const updated = [...users, newUser];
    setUsers(updated);
    saveUsers(updated);
    setNewUsername("");
    setNewPin("");
    toast({ title: "Account Created", description: `${newUsername} has been added as ${newRole}.` });
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (name.toLowerCase() === 'admin') {
      toast({ title: "Action Restricted", description: "The root admin account cannot be removed.", variant: "destructive" });
      return;
    }
    const updated = users.filter(u => u.id !== id);
    setUsers(updated);
    saveUsers(updated);
    toast({ title: "Account Removed", description: `User ${name} has been removed from records.` });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Card className="bg-[#161b22] border border-slate-700/30 overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm font-semibold text-white">
            <UserPlus className="w-4 h-4 text-cyan-400" />
            Provision New Account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Username</Label>
              <Input
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="ID Name"
                className="bg-[#0d1117] border border-slate-700/50 text-white font-mono h-9"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">7-Digit PIN</Label>
              <Input
                type="password"
                maxLength={7}
                value={newPin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  if (val.length <= 7) setNewPin(val);
                }}
                placeholder="·······"
                className="bg-[#0d1117] border border-slate-700/50 text-white font-mono h-9 tracking-[0.3em]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Role Clearance</Label>
              <Select value={newRole} onValueChange={(val: UserRole) => setNewRole(val)}>
                <SelectTrigger className="bg-[#0d1117] border border-slate-700/50 text-white font-mono h-9">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-[#161b22] border border-slate-700/50">
                  <SelectItem value="Admin" className="font-mono text-xs">Admin</SelectItem>
                  <SelectItem value="Manager" className="font-mono text-xs">Manager</SelectItem>
                  <SelectItem value="Officer" className="font-mono text-xs">Officer</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleAddUser} className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-black font-bold text-xs h-9 hover:from-cyan-400 hover:to-emerald-400 shadow-lg shadow-cyan-500/20">
              Create Account
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-[#161b22] border border-slate-700/30 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/30 hover:bg-transparent">
                <TableHead className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Personnel</TableHead>
                <TableHead className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Role</TableHead>
                <TableHead className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Security PIN</TableHead>
                <TableHead className="text-[9px] font-mono uppercase tracking-widest text-slate-500 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="border-slate-700/20 hover:bg-white/[0.02] transition-colors">
                  <TableCell className="font-medium text-white font-mono text-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <UserCircle className="w-4 h-4 text-cyan-400" />
                    </div>
                    {user.username}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className={`w-3 h-3 ${user.role === 'Admin' ? 'text-amber-400' : user.role === 'Manager' ? 'text-cyan-400' : 'text-slate-500'}`} />
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-slate-500 tracking-widest text-sm">
                    <div className="flex items-center gap-2">
                      <Key className="w-3 h-3" />
                      •••••••
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {user.username.toLowerCase() !== 'admin' && (
                      <Button
                        variant="ghost" size="icon"
                        onClick={() => handleDeleteUser(user.id, user.username)}
                        className="hover:bg-red-400/10 hover:text-red-400 transition-colors h-7 w-7"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
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
