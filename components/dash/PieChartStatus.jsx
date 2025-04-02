"use client";

import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import { COLORS } from "@/helpers/utils";

export default function PieChartStatus({data, showLegend=true, width=600, height=430}) {

    return (
        <PieChart width={width} height={height}>
            <Pie
                data={data?.status}
                cx={300}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="qtd"
                nameKey="status"
            >
                {data?.status?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
           {showLegend && <Legend /> } 
        </PieChart>
    );
}