'use client';
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

export function ClientViewModal({open,onOpenChange,client}){
    const[clientData,setClientData]=useState({});

    useEffect(()=>{
        setClientData(client);
    },[client])

    return(
    <Dialog open={open} onOpenChange={onOpenChange}>
     <DialogContent className="sm:max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-semibold">
        {clientData.name}
      </DialogTitle>
    </DialogHeader>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-muted-foreground">Email</p>
        <p className="font-medium">{clientData.email || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Phone</p>
        <p className="font-medium">{clientData.phone || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Company</p>
        <p className="font-medium">{clientData.companyName || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Website</p>
        <p className="font-medium">{clientData.website || "-"}</p>
      </div>
      <div className="col-span-2">
        <p className="text-muted-foreground">Address</p>
        <p className="font-medium">
          {clientData.address || "-"}
        </p>
      </div>
      <div>
        <p className="text-muted-foreground">City</p>
        <p className="font-medium">{clientData.city || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">State</p>
        <p className="font-medium">{clientData.state || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Country</p>
        <p className="font-medium">{clientData.country || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Zip Code</p>
        <p className="font-medium">{clientData.zipCode || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Tax Number</p>
        <p className="font-medium">{clientData.taxNumber || "-"}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Status</p>
        <p className="font-medium">{clientData.status}</p>
      </div>

      <div>
        <p className="text-muted-foreground">Invoices</p>
        <p className="font-medium">
          {clientData._count?.invoices ?? 0}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">Created At</p>
        <p className="font-medium">
          {new Date(clientData.createdAt).toLocaleString()}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">Last Updated</p>
        <p className="font-medium">
          {new Date(clientData.updatedAt).toLocaleString()}
        </p>
      </div>
    </div>
  </DialogContent>
</Dialog>

    );
}
