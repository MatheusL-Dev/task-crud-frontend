"use server";

import { getTasks } from "@/app/tarefas/actions/getTasks";
import Tarefas from "@/app/tarefas/Tarefas";
import PageContainer from "@/components/PageContainer";

export default async function PageUsuarios() {
    const { data } = await getTasks();
    
    return (
        <PageContainer title="Tarefas">
            <Tarefas preLoad={data} />
        </PageContainer>
    );

}