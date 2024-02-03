import SelectTable from "../components/client/SelectTable";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <SelectTable />
            {children}
        </>
    );
}
