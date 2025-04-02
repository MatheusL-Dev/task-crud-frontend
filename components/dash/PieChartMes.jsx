"use client";

import { COLORS, meses } from "@/helpers/utils";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

export default function PieChartStatus({data, showLegend=true, width=600, height=430}) {
    
    const dataParse = data?.mes.map((item ) => {
        return {
            mes: meses[item.mes],
            qtd: item.qtd
        }
    })

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={dataParse}
                cx={300}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="qtd"
                nameKey="mes"
            >
                {dataParse.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
           {showLegend && <Legend layout="horizontal" verticalAlign="bottom" 
      wrapperStyle={{ fontSize: "12px" }}  /> } 
        </PieChart>
    );
}