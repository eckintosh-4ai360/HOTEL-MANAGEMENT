'use client';

import { useState } from 'react';
import { paymentData, paymentMethods } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Search, Download } from 'lucide-react';
import { exportToCSV } from '@/lib/analytics';

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    bookingId: '',
    amount: '',
    method: '',
  });

  const filteredPayments = paymentData.filter(
    (payment) =>
      payment.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statusColors = {
    completed:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    refunded: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const totalProcessed = paymentData
    .filter((p) => p.status === 'completed')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('$', '').replace(',', '')), 0);

  const totalPending = paymentData
    .filter((p) => p.status === 'pending')
    .reduce((sum, p) => sum + parseInt(p.amount.replace('$', '').replace(',', '')), 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">Track and manage transactions</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => exportToCSV(paymentData, 'payments')}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Record Payment
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
              <DialogDescription>Record a new payment transaction</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input 
                placeholder="Booking ID" 
                value={formData.bookingId}
                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              />
              <Input 
                placeholder="Amount" 
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              />
              <Select value={formData.method} onValueChange={(value) => setFormData({ ...formData, method: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method.value} value={method.value}>
                      {method.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsAddOpen(false);
                    setFormData({ bookingId: '', amount: '', method: '' });
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    setIsAddOpen(false);
                    setFormData({ bookingId: '', amount: '', method: '' });
                  }}
                >
                  Record Payment
                </Button>
              </div>
            </div>
          </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalProcessed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {paymentData.filter((p) => p.status === 'completed').length} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPending.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {paymentData.filter((p) => p.status === 'pending').length} transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search payments..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Transactions</CardTitle>
          <CardDescription>{filteredPayments.length} transactions total</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.bookingId}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        payment.status === 'completed'
                          ? 'secondary'
                          : payment.status === 'pending'
                            ? 'outline'
                            : 'secondary'
                      }
                      className={statusColors[payment.status as keyof typeof statusColors]}
                    >
                      {payment.status.charAt(0).toUpperCase() +
                        payment.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
