import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@material-ui/core";
import ActionsComponent from "./ActionsComponent";
import PropTypes from "prop-types";
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table";
import clsx from "clsx";
import FormCreate from "reusable/Form/FormCreate";

const EditableCell = ({ value, column: { id, Header, FormCreateType } }) =>
  FormCreateType ? (
    <FormCell value={value} column={{ id, Header, FormCreateType }} />
  ) : (
    <p className="w-256 py-20">{value}</p>
  );

const FormCell = ({ value, column: { id, Header, FormCreateType } }) => {
  const [edit, setEdit] = useState(false);
  const FormikRef = useRef();
  const form_data = useMemo(
    () => [
      {
        init: value,
        name: id,
        label: Header,
        type: FormCreateType,
        className: "",
        autoFocus: true,
      },
    ],
    [value, id, FormCreateType, Header]
  );
  const onSubmit = useCallback(() => setEdit(false), []);
  const OpenEditable = useCallback(() => setEdit(true), []);
  const CloseEditable = useCallback(() => setEdit(false), []);

  return edit ? (
    <div className="flex justify-start items-center w-256">
      <FormCreate onSubmit={onSubmit} inputData={form_data} ref={FormikRef} />
      <IconButton
        size="medium"
        onClick={() => FormikRef?.current?.handleSubmit()}
      >
        <Icon fontSize="small">check</Icon>
      </IconButton>
      <IconButton size="medium" onClick={CloseEditable}>
        <Icon fontSize="small">close</Icon>
      </IconButton>
    </div>
  ) : (
    <p className="w-256 py-20" onDoubleClick={OpenEditable}>
      {value}
    </p>
  );
};

const defaultColumn = {
  Cell: EditableCell,
};

const EnhancedTable = ({
  columns,
  data,
  onRowClick,
  actions,
  disableAction,
  editable,
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: editable ? defaultColumn : undefined,
      autoResetPage: true,
      initialState: { pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );

  const handleChangePage = useCallback(
    (event, newPage) => {
      gotoPage(newPage);
    },
    [gotoPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const size = parseInt(event.target.value);
      actions.setPageConfig({ perPage: size, page: 1 });
      setPageSize(size);
    },
    [setPageSize]
  );

  useEffect(() => {
    if (disableAction) {
      setPageSize(data.length === 0 ? 10 : data.length);
    }
  }, [data, setPageSize, disableAction]);

  return (
    <Box className="flex flex-col min-h-full sm:border-1 sm:rounded-16 pb-40">
      <Paper
        className="rounded-0 lg:rounded-16 lg:shadow p-10 pt-10"
        elevation={3}
      >
        <TableContainer className="flex flex-1">
          <Table {...getTableProps()} className="simple">
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell
                      className="whitespace-nowrap p-4 md:p-12"
                      {...(!column.sortable
                        ? column.getHeaderProps()
                        : column.getHeaderProps(column.getSortByToggleProps()))}
                    >
                      {column.render("Header")}
                      {column.sortable ? (
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? "desc" : "asc"}
                        />
                      ) : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {page.map((row, i) => {
                prepareRow(row);
                // const isRed = row.original.Red;
                // const isRed = i < 4;

                return (
                  <TableRow
                    hover={true}
                    {...row.getRowProps()}
                    onClick={(ev) => onRowClick(ev, row)}
                    // className={`truncate cursor-pointer ${
                    //   isRed ? "shadow-err" : ""
                    // }`}
                    className="truncate cursor-pointer"
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          className={clsx("p-4 md:p-12", cell.column.className)}
                        >
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          style={{ justifyContent: "center" }}
          classes={{
            root: "flex mt-10",
          }}
          rowsPerPageOptions={
            disableAction
              ? []
              : [
                  5,
                  10,
                  25,
                  {
                    label: "All",
                    value:
                      (actions.meta ? actions.meta.total : data.length) + 1,
                  },
                ]
          }
          colSpan={5}
          count={actions.meta?.total ?? data.length}
          labelDisplayedRows={({ from, to, count }) => {
            if (disableAction) return;

            const item = (actions.page - 1) * pageSize;
            return `${item + from}-${item + to} از ${count}`;
          }}
          labelRowsPerPage={"ردیف در هر صفحه:"}
          rowsPerPage={pageSize}
          page={pageIndex}
          SelectProps={{
            inputProps: { "aria-label": "rows per page" },
            native: false,
          }}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={(e) =>
            !disableAction && (
              <ActionsComponent {...e} actions={actions} data={data} />
            )
          }
        />
      </Paper>
    </Box>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
};

export default EnhancedTable;
