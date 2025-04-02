import TemplateLayout from "@/components/templates/Layout";

export default async function RootTemplate({ children }) {

    return (
        <TemplateLayout>
            {children}
        </TemplateLayout>
    );

}