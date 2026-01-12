import React, { use, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm, useFieldArray } from 'react-hook-form';


export function EditInvoiceModal({ open, onOpenChange, invoice, onSaved }) {
  const { register, control, handleSubmit, reset, watch, setValue } = useForm({
    defaultValues: invoice || { title: '', dueDate: '', lineItems: [], total: 0, taxRate: 0, taxAmount: 0 },
  });

  useEffect(() => { reset(invoice); }, [invoice, reset]);

  // amount calculation
  const lineitmes = watch('lineItems');
  const taxRate = Number(watch("taxRate") || 0);
  const subTotal = (lineitmes || []).reduce((sum, item) => {
    const qty = Number(item?.quantity || 0);
    const price = Number(item?.unitPrice || 0);
    return sum + qty * price;
  }, 0);
  const taxAmount = subTotal * Number(watch("taxRate") || 0) / 100;
  const totalAmount = subTotal + taxAmount;
  useEffect(() => {
    setValue('total', totalAmount);
  }, [totalAmount, setValue]);
  useEffect(() => {
    setValue('subtotal', subTotal);
  }, [subTotal, setValue]);

  //Date Format
  useEffect(() => {
    if (!invoice) return;
    reset({
      ...invoice,
      dueDate: invoice.dueDate ? invoice.dueDate.split('T')[0] : '',
    });
  }, [invoice, reset]);

  const { fields, append, remove } = useFieldArray({ control, name: 'lineItems' });

  const onSubmit = async (values) => {
    const res = await fetch(`/api/invoices/${invoice.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (res.ok) { onSaved(); onOpenChange(false); }
    else { }
  };

  // const[currency,setCurrency]=useState({})
  // useEffect(()=>{
  //   const fetchCurrency= async ()=>{
  //     const response=await fetch(`/api/invoices/${invoice.id}`);
  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({}));
  //       throw new Error(errorData.error || 'Failed to create invoice');
  //     }
  //     console.log(response.json());
  //     return response.json();
  //   }
  //   fetchCurrency();
  // })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm">Title</label>
            <Input {...register('title')} />
          </div>
          <div>
            <label className="block text-sm">Currency</label>
            <Input type="string" {...register('currency')} />
          </div>
          <div>
            <label className="block text-sm">Due Date</label>
            <Input type="date" {...register('dueDate')} />
          </div>

          <div>
            <label className="block text-sm">Line Items</label>
            <div className="space-y-2">
              {fields.map((f, idx) => (
                <div key={f.id} className="flex gap-2 items-center">
                  <Input {...register(`lineItems.${idx}.description`)} placeholder="Description" />
                  <Input {...register(`lineItems.${idx}.quantity`)} type="number" className="w-20" />
                  <Input {...register(`lineItems.${idx}.unitPrice`)} type="number" className="w-28" />
                  <Button type="button" variant="ghost" onClick={() => remove(idx)}>Remove</Button>
                </div>
              ))}
              <Button type="button" onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}>+ Add Item</Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">
              Subtotal: {subTotal}
            </label>
            <Input hidden={true} {...register('subtotal')} />
          </div>
          <div>
            <label className='block text-sm font-medium'>
              Total: {watch('currency')} {totalAmount}
            </label>
            <Input hidden={true} {...register('total')} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}