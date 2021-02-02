import React from "react";
import { Document, Page, Text, Stylesheet } from "@react-pdf/renderer";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          - {new Date().toLocaleString()} -
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>Toko Mebel Murah</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Text style={styles.text}>
          <Text>
            Date {"                "}:{"  "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
          </Text>
          {"\n"}
          <Text>
            Order ID {"          "}:{"  "}
            {order.paymentIntent.id}
          </Text>
          {"\n"}
          <Text>
            Order Status {"   "}:{"  "}
            {order.orderStatus}
          </Text>
          {"\n"}
          <Text>
            Total Paid {"        "}:{"  "}
            {`IDR ${order.paymentIntent.amount}`}
          </Text>
        </Text>

        <Table>
          <TableHeader>
            <TableCell style={{ padding: "15px", textAlign: "center" }}>
              Product
            </TableCell>
            <TableCell style={{ textAlign: "center" }}>Price</TableCell>
            <TableCell style={{ textAlign: "center" }}>Quantity</TableCell>
          </TableHeader>
        </Table>
        <Table data={order.products}>
          <TableBody>
            <DataTableCell
              getContent={(content) => content.product.title}
              style={{ padding: "15px", textAlign: "center" }}
            />
            <DataTableCell
              style={{ textAlign: "center" }}
              getContent={(content) => `IDR ${content.product.price}`}
            />
            <DataTableCell
              style={{ textAlign: "center" }}
              getContent={(content) => content.count}
            />
          </TableBody>
        </Table>

        <Text style={styles.footer}> ~ Thank you for shopping with us ~ </Text>
      </Page>
    </Document>
  );
};

const styles = {
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
};

export default Invoice;
