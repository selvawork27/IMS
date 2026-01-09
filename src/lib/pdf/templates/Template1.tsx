import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import type { Invoice, Client, LineItem, User } from '@prisma/client';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 700 },
  ]
});

export interface InvoiceWithDetails extends Invoice {
  client: Client;
  lineItems: LineItem[];
  user: User;
}

const COLORS = {
  primary: '#0f172a',
  accent: '#2563eb',
  accentLight: '#f8fafc',
  text: '#334155',
  muted: '#64748b',
  border: '#e2e8f0',
  white: '#ffffff'
};

const styles = StyleSheet.create({
  page: { 
    padding: 30, 
    fontFamily: 'Inter', 
    backgroundColor: '#f1f5f9' 
  },
  container: {
    backgroundColor: COLORS.white,
    height: '100%',
    width: '100%',
    padding: 40, // Increased internal padding for better breathing room
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 8, 
    borderLeftColor: COLORS.accent,
    display: 'flex',
    flexDirection: 'column'
  },
  
  // Header
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start',
    marginBottom: 40 
  },
  brandSection: { width: '60%' },
  brandName: { fontSize: 22, fontWeight: 700, color: COLORS.primary, letterSpacing: -0.5 },
  brandTagline: { fontSize: 8, color: COLORS.accent, fontWeight: 700, marginTop: 4, textTransform: 'uppercase', letterSpacing: 1 },
  
  invoiceInfo: { textAlign: 'right' },
  invoiceTitle: { fontSize: 26, fontWeight: 700, color: COLORS.primary, marginBottom: 2 },
  invoiceNo: { fontSize: 10, color: COLORS.muted, fontWeight: 600 },
  
  // Business Details Grid
  detailsGrid: { flexDirection: 'row', marginBottom: 40 },
  detailsCol: { flex: 1 },
  sectionLabel: { 
    fontSize: 7, 
    fontWeight: 700, 
    color: COLORS.muted, 
    textTransform: 'uppercase', 
    letterSpacing: 1,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingBottom: 4,
    width: '80%' // Visual break
  },
  infoText: { fontSize: 9, color: COLORS.text, marginBottom: 3, lineHeight: 1.3 },
  infoBold: { fontSize: 10, fontWeight: 700, color: COLORS.primary, marginBottom: 4 },

  // Table
  table: { marginTop: 10, flex: 1 }, // Flex-1 pushes footer down
  tableHeader: { 
    flexDirection: 'row', 
    borderBottomWidth: 2, 
    borderBottomColor: COLORS.primary, 
    paddingBottom: 10,
    marginBottom: 5,
    paddingHorizontal: 5
  },
  tableRow: { 
    flexDirection: 'row', 
    paddingVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: COLORS.border,
    alignItems: 'center',
    paddingHorizontal: 5
  },
  th: { fontSize: 8, fontWeight: 700, color: COLORS.primary, textTransform: 'uppercase', letterSpacing: 0.5 },
  td: { fontSize: 9, color: COLORS.text },

  // Summary
  summaryWrapper: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 25 },
  summaryBox: { width: 200, backgroundColor: COLORS.accentLight, padding: 15, borderRadius: 6, borderWidth: 1, borderColor: COLORS.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 10, 
    paddingTop: 10, 
    borderTopWidth: 1, 
    borderTopColor: COLORS.accent 
  },
  totalPrice: { fontSize: 15, fontWeight: 700, color: COLORS.accent },

  // Footer - Pinned to bottom
  footer: { marginTop: 'auto', paddingTop: 20 },
  footerLine: { borderTopWidth: 1, borderTopColor: COLORS.border, paddingTop: 12 },
  footerText: { fontSize: 7.5, color: COLORS.muted, textAlign: 'center', lineHeight: 1.5 },

  // Utils
  textRight: { textAlign: 'right' },
  flex1: { flex: 1 },
  flex2: { flex: 2 },
  flex4: { flex: 4.5 } // Slightly wider description
});

export function generateTemplate1PDF(inv: InvoiceWithDetails) {
  const fmt = (n: any) => {
    const currency = (inv as any).currency || 'USD';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(Number(n || 0));
  };

  const dateStr = (d?: Date) => d ? new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <Document title={`Invoice-${inv.invoiceNumber}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.container}>
          
          {/* Top Branding */}
          <View style={styles.header}>
            <View style={styles.brandSection}>
              <Text style={styles.brandName}>{inv.user?.companyName || 'DEVENV Tech'}</Text>
              <Text style={styles.brandTagline}>Healthcare</Text>
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceNo}>NO: #{(inv as any).invoiceNumber}</Text>
            </View>
          </View>

          {/* Business Details Grid */}
          <View style={styles.detailsGrid}>
            <View style={styles.detailsCol}>
              <Text style={styles.sectionLabel}>From</Text>
              <Text style={styles.infoBold}>{inv.user?.companyName}</Text>
              <Text style={styles.infoText}>{inv.user?.companyAddress}</Text>
              <Text style={styles.infoText}>{inv.user?.companyEmail}</Text>
            </View>

            <View style={styles.detailsCol}>
              <Text style={styles.sectionLabel}>Bill To</Text>
              <Text style={styles.infoBold}>{inv.client?.name}</Text>
              <Text style={styles.infoText}>{inv.client?.address}</Text>
              <Text style={styles.infoText}>{inv.client?.email}</Text>
            </View>

            <View style={[styles.detailsCol, styles.textRight]}>
              <Text style={[styles.sectionLabel, { alignSelf: 'flex-end' }]}>Timeline</Text>
              <Text style={styles.infoText}>Issued: <Text style={{fontWeight: 600, color: COLORS.primary}}>{dateStr(inv.issueDate)}</Text></Text>
              <Text style={styles.infoText}>Due: <Text style={{fontWeight: 600, color: COLORS.primary}}>{dateStr(inv.dueDate)}</Text></Text>
              <View style={{ marginTop: 6, padding: '3 8', backgroundColor: COLORS.accent, alignSelf: 'flex-end', borderRadius: 4 }}>
                <Text style={{ color: COLORS.white, fontWeight: 700, fontSize: 7 }}>
                  {String(inv.status).toUpperCase()}
                </Text>
              </View>
            </View>
          </View>

          {/* Table */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.flex4, styles.th]}>Products</Text>
              <Text style={[styles.flex1, styles.th, styles.textRight]}>Unit/Qty</Text>
              <Text style={[styles.flex2, styles.th, styles.textRight]}>Rate</Text>
              <Text style={[styles.flex2, styles.th, styles.textRight]}>Total</Text>
            </View>

            {inv.lineItems.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.flex4, styles.td, {fontWeight: 1000, color: COLORS.primary}]}>{item.description}</Text>
                <Text style={[styles.flex1, styles.td,{fontWeight: 1000}, styles.textRight]}>{Number(item.quantity)}</Text>
                <Text style={[styles.flex2,{fontWeight: 1000, }, styles.td, styles.textRight]}>{fmt(item.unitPrice)}</Text>
                <Text style={[styles.flex2, styles.td, styles.textRight, { fontWeight: 700, color: COLORS.primary }]}>
                  {fmt(item.amount)}
                </Text>
              </View>
            ))}
          </View>

          {/* Summary Box */}
          <View style={styles.summaryWrapper}>
            <View style={styles.summaryBox}>
              <View style={styles.summaryRow}>
                <Text style={[styles.td, {color: COLORS.muted}]}>Subtotal</Text>
                <Text style={[styles.td, {fontWeight: 600}]}>{fmt((inv as any).subtotal)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.td, {color: COLORS.muted}]}>Estimated Tax</Text>
                <Text style={[styles.td, {fontWeight: 600}]}>{fmt((inv as any).taxAmount)}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={{ fontWeight: 700, color: COLORS.primary, fontSize: 10 }}>Amount Due</Text>
                <Text style={styles.totalPrice}>{fmt(inv.total)}</Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <View style={styles.footerLine}>
              <Text style={[styles.footerText, { fontWeight: 600, color: COLORS.primary }]}>
                Payment is due within {Math.ceil((new Date(inv.dueDate as any).getTime() - new Date(inv.issueDate as any).getTime()) / (1000 * 3600 * 24))} days.
              </Text>
              <Text style={styles.footerText}>
                Please make checks payable to {inv.user?.companyName}. For bank transfers, include invoice #{(inv as any).invoiceNumber} as reference.
              </Text>
            </View>
          </View>

        </View>
      </Page>
    </Document>
  );
}