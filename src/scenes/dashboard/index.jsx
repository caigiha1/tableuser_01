import React, { useState } from "react";
import { Box, Typography, useTheme, Avatar } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import { useGetUserQuery } from "../../state/api";

const Dashboard = () => {
  const theme = useTheme();

  const [page, setPage] = useState(0);
  const [results, setResults] = useState(100);

  const { data, isLoading } = useGetUserQuery({
    page,
    results,
  });
  //   console.log("🚀 ~ file: index.jsx:19 ~ Dashboard ~ data", data);

  const columns = [
    {
      field: "picture",
      headerName: "Thumbnail Icon",
      renderCell: (params) => <Avatar src={params.value.thumbnail} />,
    },
    {
      field: "name",
      headerName: "Full Name",
      flex: 1,
      valueGetter: (data) =>
        data.value.title + "." + data.value.first + " " + data.value.last,
    },
    {
      field: "login",
      headerName: "User Name",
      flex: 1,
      valueGetter: (data) => data.value.username,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Typography variant="h2">Dashboard</Typography>
      <Box
        height="62.5vh"
        sx={{
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.background.default,
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.background.default,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.neutral.dark,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row.nat + row.phone}
          rows={(data && data.results) || []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50, 100]}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
