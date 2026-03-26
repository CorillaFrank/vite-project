import {
    useReactTable, getCoreRowModel,   //importar un hook
    flexRender, getPaginationRowModel,getFilteredRowModel
}from "@tanstack/react-table"
import data from "../../MOCK_DATA.json" //importar los datos de un json
import dayjs from "dayjs" //importar day js para formatear la fecha
import { useState } from "react"
/*
"id": 1,
        "name": "Ingram",
        "last name": "Prall",
        "email": "iprall0@macromedia.com",
        "country": "Finland",
        "dateOfBirth": "6/29/2025"
*/ 
function SimpleTable() {
    const columns = [
        {
            header: "ID",
        accessorKey: "id",//accesor para acceder a los datos del json
        footer:"Mi ID"
        },
        {
            header: "Name",
        accessorKey: "name",
        footer:"Mi Nombre"
        },
        {
            header: "Lastname",
        accessorKey: "last name",
        footer:"Mi Apellido"
        },
        {
            header: "Email",
        accessorKey: "email",
        footer:"Mi Email"
        }
        ,
        {
            header: "Country",
        accessorKey: "country",
                footer:"Mi País"

        }
        ,
        {
            header: "Fecha de Nacimiento ",
        accessorKey: "dateOfBirth",
        footer:"Mi Fecha de Nacimiento",
        cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY") //para mostrar el valor de la celda con day js en elformato que deseamos
         
        }
    ] //definir las columnas de la tabla
    const[filtering, setFiltering] = useState("");  //estado para el filtro de busqueda
    const table = useReactTable({data, columns, getCoreRowModel:getCoreRowModel(), getPaginationRowModel:getPaginationRowModel(), 
        getFilteredRowModel:getFilteredRowModel(),
        state:{
            
            globalFilter: filtering,
        },
        onGlobalFilterChange:setFiltering,
    }); //utilizar el hook para ejecutar al inicio , al ejecutar espera 2 parametros
    
    return (
        <div>
            <p1>Buscador</p1>
            
            <input 
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
             />
            <table>
                <thead>
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id}>
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                        </th>
                                    ))}
                            </tr>
                            ))          
                    }
                </thead>
                <tbody>
                    {
                            table.getRowModel().rows.map(row => (
                               <tr key={row.id}>
                                    {
                                        row.getVisibleCells().map(cell => (
                                            <td>
                                                {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                            </td>
                                        ))}
                                </tr>
                            ))
                    }
                </tbody>
                <tfoot>
                    {
                        table.getFooterGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {
                                    footerGroup.headers.map(footer => (
                                        <th key={footer.id}>
                                            {
                                             flexRender(footer.column.columnDef.footer, footer.getContext())
                                             }
                                        </th>
                                    ))}
                            </tr>
                        ))
                    }
                </tfoot>
            </table>
<button onClick={() => table.setPageIndex(0)}>
    Primer Pagina
</button>
<button onClick={() => table.nextPage()}>
    Primer Siguiente
</button>
<button onClick={() => table.previousPage()}>
    Primer Anterior
</button>
<button onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
    Ultima Pagina
</button>

        </div>
    )
}

export default SimpleTable