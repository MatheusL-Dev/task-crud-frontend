import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbarContainer, GridToolbarColumnsButton, GridToolbarExport, GridToolbarQuickFilter } from "@mui/x-data-grid";
import Tooltip from "@mui/material/Tooltip";

//Config JSON para tradução de textos para PT-BR do datagrid
import { PT_BR_DEFAULT_LOCALE_TEXT } from "@/config/DatagridLocaleText";

import Restricted from "@/context/Restricted";
import CustomExportExcel from "@/components/CustomExportExcel";

//Ícones
import ViewColumnIcon from "@mui/icons-material/ViewColumn";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Styled Component
import TextCustom from "@/shared-components/Typograph/";

export default function DataTable(props) {
	const [columnVisibilityModel, setColumnVisibilityModel] = useState({});
	const { customDataExport, columns, rows, setSearchPage } = props;
	const prefix = props.perm?.split("app_").slice(-1)[0];

	const [pageSize, setPageSize] = useState(50);

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	function setSearchParams(newPage) {
		const params = new URLSearchParams(searchParams);
		params.set('page', newPage);
		params.set('pageSize', pageSize);
		replace(`${pathname}?${params.toString()}`);  //TODO: Temporary

	}

	const getRowId = (row, index) => {
		const indexInPage = props.page >= 0 ? props.page * props.pageSize + index + 1 : 0 * props.pageSize + index + 1;
		return indexInPage;
	};

	const rowsWithId = rows?.map((row, index) => ({
		...row,
		id: row.id ?? getRowId(row, index),
	}));

	function CustomToolbar() {
		return (
			<Grid container sx={{ mt: props.disabledSearchBar? 0 : 3, mb: 1}}>
				<GridToolbarContainer sx={{ width: "100%"}}>
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={4}
							xl={3}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "flex-start",
							}}>
							{!props.disabledSearchBar && (
								<GridToolbarQuickFilter placeholder="Pesquisar..." sx={{ width: "100%" }} size="small" />
							)}
						</Grid>

					<Grid
						item
						xs={12}
						sm={6}
						md={6}
						lg={8}
						xl={9}
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",

							["@media (max-width:599px)"]: {
								justifyContent: "center",
							},
						}}>
						<Restricted to={props.perm}>
							<GridToolbarExport
								csvOptions={{
									allColumns: true,
								}}
								startIcon={
									<Tooltip title="Download" placement="top">
										<CloudDownloadIcon sx={{ color: "#525252", fontSize: "38px" }} fontSize="large" />
									</Tooltip>
								}
								sx={{
									fontSize: "38px",
									"&:hover": {
										cursor: "pointer",
										opacity: "0.5",
									},
								}}
								printOptions={{ disableToolbarButton: true }}
							/>

							<CustomExportExcel customDataExport={customDataExport} columns={columns} rows={rows} name={prefix} />
						</Restricted>

						<GridToolbarColumnsButton
							startIcon={
								<Tooltip title="Esconder colunas" placement="top">
									<ViewColumnIcon sx={{ color: "#525252" }} fontSize="large" />
								</Tooltip>
							}
							sx={{
								"&:hover": {
									cursor: "pointer",
									opacity: "0.5",
								},
							}}
						/>
					</Grid>
				</GridToolbarContainer>
			</Grid>
		);
	}

	return (
		<Box>
			<TextCustom message={props.title} variant="h6" sx={{ fontWeight: "bold", mt: 1 }} />

			<DataGrid
				localeText={PT_BR_DEFAULT_LOCALE_TEXT} //Arquivo fonte do MUI datagrid com todas as labels traduzidas, porém com "" no lugar das strings do toolbar.
				rows={rowsWithId || []} //Linhas da tabela
				// rows={props.rows} //Linhas da tabela
				columns={props.columns} //Colunas da tabela
				rowHeight={props.rowHeight ? props.rowHeight : 52}
				autoHeight={props.autoHeight === undefined ? true : props.autoHeight} //Componente calcular a altura automaticamente com o seu conteúdo
				components={{
					//Add o toolbar personalizado com o filtro de busca e o botão de esconder colunas
					Toolbar: !props.disableCustomToolbar && CustomToolbar,
				}}
				sx={{
					border: "none",
					mb: 2,
					...props.sx,
				}} //Retirar a borda e dar margin-bottom
				disableColumnMenu={true} //Desabilitar botão de colunas
				disableSelectionOnClick={true} //Desabilitar seleção de linha ao clicar na linha
				disableColumnResize={true} //Desabilitar a função de arrastar para aumentar o tamanho da coluna
				componentsProps={{
					pagination: {
						labelRowsPerPage: "Linhas por página",
					},
				}}
				columnVisibilityModel={props.columnVisibilityModel ? props.columnVisibilityModel : columnVisibilityModel}
				onColumnVisibilityModelChange={
					props.onColumnVisibilityModelChange ? props.onColumnVisibilityModelChange : (newModel) => setColumnVisibilityModel(newModel)
				}
				hideFooter={props.disableFooter}
				initialState={{
					filter: {
						filterModel: {
							items: [],
							quickFilterValues: [],
						},
					},
				}}
				experimentalFeatures={props.experimentalFeatures}
				pagination
				checkboxSelection={props.checkboxSelection}
				onSelectionModelChange={props.onSelectionModelChange}
				page={props.page}
				paginationMode={props.paginationMode ? "server" : "client"}
				rowCount={props.rowCount}
				rowsPerPageOptions={props.rowsPerPageOptions ?? [50, 100]}
				pageSize={props.pageSize ?? pageSize}
				onPageSizeChange={(newPageSize) => props.onPageSizeChange ? (
					props.onPageSizeChange(newPageSize),
					props.onPageChange(0)
				) : setPageSize(newPageSize)}
				onPageChange={(newPage) => props.onPageChange ? props.onPageChange(newPage + 1) : setSearchParams(newPage + 1)}
				loading={props.loading ?? false}
			/>
		</Box>
	);
}
