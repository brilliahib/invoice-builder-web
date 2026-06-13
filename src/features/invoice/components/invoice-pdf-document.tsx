import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { formatCurrency } from '@/lib/formatters/currency';

Font.register({
  family: 'Haskoy',
  src: '/fonts/haskoy.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'Haskoy',
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    objectFit: 'contain',
    marginBottom: 10,
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  companyDetails: {
    color: '#666',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
  invoiceMeta: {
    textAlign: 'right',
    color: '#666',
  },
  billTo: {
    marginBottom: 40,
  },
  billToLabel: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  table: {
    width: '100%',
    marginBottom: 40,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 8,
    paddingTop: 8,
  },
  colDesc: { flex: 4 },
  colQty: { flex: 1, textAlign: 'right' },
  colPrice: { flex: 2, textAlign: 'right' },
  colTotal: { flex: 2, textAlign: 'right' },
  totals: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8,
  },
  totalsLabel: {
    fontWeight: 'bold',
  },
  totalsValue: {
    fontWeight: 'bold',
  },
  signatures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 80,
  },
  signatureBox: {
    width: 200,
    alignItems: 'center',
  },
  signatureLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#333',
    marginBottom: 8,
  },
  signatureName: {
    fontWeight: 'bold',
  },
  signatureTitle: {
    color: '#666',
    fontSize: 10,
  },
});

interface InvoicePDFProps {
  invoice: any;
  company: any;
}

export function InvoicePDFDocument({ invoice, company }: InvoicePDFProps) {
  const cloudinaryJpgUrl = company?.logoUrl?.includes('cloudinary.com')
    ? company.logoUrl.replace('/upload/', '/upload/f_jpg/')
    : company?.logoUrl;

  const signatureJpgUrl = company?.signatureUrl?.includes('cloudinary.com')
    ? company.signatureUrl.replace('/upload/', '/upload/f_jpg/')
    : company?.signatureUrl;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            {company?.logoUrl ? <Image src={cloudinaryJpgUrl} style={styles.logo} /> : null}
            <Text style={styles.companyName}>{company?.name || 'Your Company'}</Text>
            <Text style={styles.companyDetails}>{company?.address}</Text>
          </View>
          <View>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceMeta}>#{invoice.invoiceNumber}</Text>
            <Text style={styles.invoiceMeta}>
              Date: {new Date(invoice.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>

        <View style={styles.billTo}>
          <Text style={styles.billToLabel}>Bill To:</Text>
          <Text>{invoice.clientName}</Text>
          <Text>{invoice.clientAddress}</Text>
        </View>

        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.colDesc}>Description</Text>
            <Text style={styles.colQty}>Qty</Text>
            <Text style={styles.colPrice}>Price</Text>
            <Text style={styles.colTotal}>Total</Text>
          </View>

          {(invoice.lineItems || []).map((item: any) => (
            <View key={item.id} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{formatCurrency(item.unitPrice)}</Text>
              <Text style={styles.colTotal}>{formatCurrency(item.total)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.totals}>
          <View style={styles.totalsRow}>
            <Text style={styles.totalsLabel}>Total</Text>
            <Text style={styles.totalsValue}>{formatCurrency(invoice.totalAmount)}</Text>
          </View>
        </View>

        <View style={styles.signatures}>
          <View style={styles.signatureBox}>
            <Text style={{ ...styles.signatureTitle, marginBottom: 40 }}>Acknowledged by</Text>
            <Text style={styles.signatureName}>{invoice.clientName}</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ ...styles.signatureTitle, marginBottom: signatureJpgUrl ? 15 : 40 }}>
              Issued by
            </Text>
            {signatureJpgUrl && (
              <Image
                src={signatureJpgUrl}
                style={{ width: 140, height: 60, objectFit: 'contain', marginBottom: 5 }}
              />
            )}
            <Text style={styles.signatureName}>
              {company?.signatoryName || company?.name || 'Authorized Signatory'}
            </Text>
            <Text style={styles.signatureTitle}>{company?.signatoryTitle || 'Director'}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
