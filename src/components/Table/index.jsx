import React from 'react'

import Styles from './styled'

const Table = ({ children, ...props }) => (
   <Styles.Table {...props}>{children}</Styles.Table>
)

const TableHead = ({ children, ...props }) => (
   <Styles.Head {...props}>{children}</Styles.Head>
)

const TableBody = ({ children, ...props }) => (
   <Styles.Body {...props}>{children}</Styles.Body>
)

const TableRow = ({ children, ...props }) => (
   <Styles.Row {...props}>{children}</Styles.Row>
)

const TableCell = ({ children, ...props }) => (
   <Styles.Cell {...props}>{children}</Styles.Cell>
)

export { Table, TableHead, TableBody, TableRow, TableCell }