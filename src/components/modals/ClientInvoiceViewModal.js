'use client';
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function ClientInvoiceViewModal({ open, onOpenChange, client }) {
    const [invoiceData, setInvoiceData] = useState([]);

    useEffect(() => {
        if (client?.invoices) {
            setInvoiceData(client.invoices);
        } else {
            setInvoiceData([]);
        }
    }, [client]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-2xl max-h-[85vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">
                        Invoices - {client?.name || 'Client'}
                    </DialogTitle>
                </DialogHeader>

                <div className="overflow-y-auto pr-2">
                    {invoiceData && invoiceData.length > 0 ? (
                        invoiceData.map((invoice, index) => (
                            <div key={invoice.id || index} className="mb-6 last:mb-0">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-mono font-bold text-lg text-primary">
                                        {invoice.invoiceNumber}
                                    </h3>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                        invoice.paymentStatus === "PENDING" 
                                        ? "bg-amber-100 text-amber-700" 
                                        : "bg-emerald-100 text-emerald-700"
                                    }`}>
                                        {invoice.paymentStatus} / {invoice.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Amount</p>
                                        <p className="font-semibold text-lg">
                                            {invoice.currency} {invoice.total}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Issue Date</p>
                                        <p className="font-medium">
                                            {invoice.issueDate ? new Date(invoice.issueDate).toLocaleDateString() : "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Due Date</p>
                                        <p className="font-medium text-destructive">
                                            {invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : "-"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Tax / Discount</p>
                                        <p className="font-medium">
                                            {invoice.taxRate}% tax | {invoice.currency}{invoice.discountAmount} off
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Subtotal</p>
                                        <p className="font-medium">{invoice.currency} {invoice.subtotal}</p>
                                    </div>

                                    <div>
                                        <p className="text-muted-foreground">Last Updated</p>
                                        <p className="font-medium text-[10px]">
                                            {invoice.updatedAt ? new Date(invoice.updatedAt).toLocaleString() : "-"}
                                        </p>
                                    </div>
                                </div>
                                {index !== invoiceData.length - 1 && (
                                    <div className="w-full border-b my-6 border-dashed" />
                                )}
                            </div>
                        ))
                    ) : (
                        <div className="py-10 text-center text-muted-foreground">
                            No invoices found for this client.
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}