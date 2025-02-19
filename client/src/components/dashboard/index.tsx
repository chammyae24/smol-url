import ShortLinkTable from "./short-link-table";
import ShrinkForm from "./shrink-form";

export default function Dashboard() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center p-4">
      <ShrinkForm />
      <div className="w-full h-full">
        <ShortLinkTable />
      </div>
    </div>
  );
}
