import { Head, usePage } from "@inertiajs/react";

export default function MaterialsQuantity() {
  const { quantities } = usePage().props;

  return (
    <>
      <Head title="Cantidad de Materiales" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Cantidad de Materiales</h1>
        <table className="w-full border rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Material</th>
              <th className="border px-4 py-2 text-left">Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {(quantities ?? []).map((m, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{m.NAME_MATERIALS}</td>
                <td className="border px-4 py-2">{m.QUANTITY}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
