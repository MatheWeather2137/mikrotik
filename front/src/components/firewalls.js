import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ToggleButton from "@mui/material/ToggleButton";

export default function Firewalls() {
  const [firewalls, setFirewalls] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/tool/firewall`);
        const json = await res.json();
        setFirewalls(json);
        console.log(json);
      } catch (error) {}
    };
    getData();
  }, []);

  const columns = [
    { id: "id", label: "ID", minWidth: 100 },
    {
      id: "button",
      label: "",
      minWidth: 100,
      align: "right",
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "chain",
      label: "Chain",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "comment",
      label: "Comment",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  const rows = firewalls.map((record) => ({
    id: record[".id"],
    button: (
      <ToggleButton
        value="check"
        selected={selectedId === record[".id"]}
        onChange={() => handleToggle(record)}
      >
        {record.disabled === "false" ? <CheckIcon /> : <CloseIcon />}
      </ToggleButton>
    ),
    action: record["action"],
    chain: record["chain"],
    comment: record["comment"],
  }));

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleToggle = async (record) => {
    const id = record[".id"];
    const currentDisabled = record.disabled;

    setSelectedId((prev) => (prev === id ? null : id));

    try {
      const res = await fetch(
        `http://localhost:3000/tool/firewall/toggle/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ currentDisabled }),
        }
      );

      // await res.json();
      setFirewalls((prev) =>
        prev.map((item) =>
          item[".id"] === id
            ? {
                ...item,
                disabled: currentDisabled === "true" ? "false" : "true",
              }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number"
                          ? column.format(value)
                          : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
