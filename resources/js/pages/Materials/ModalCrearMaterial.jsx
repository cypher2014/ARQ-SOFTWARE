import { useState } from "react";
import axios from "axios";

export default function ModalCrearMaterial({ onClose, refreshMaterials }) {
  const [formData, setFormData] = useState({
    NAME_MATERIALS: "",
    PRICE_MATERIAL: "",
    QUANTITY: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

      const response = await axios.post("/admin/materials", formData, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
          "Accept": "application/json",
        },
        withCredentials: true, // ✅ esto envía la cookie de sesión
      });

      if (response.data.success) {
        refreshMaterials(); // recarga lista
        onClose();          // cierra modal
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else if (error.response && error.response.status === 401) {
        alert("No estás autenticado. Por favor, inicia sesión nuevamente.");
      } else {
        console.error("Error al crear material:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Crear Material</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="NAME_MATERIALS"
            placeholder="Nombre del material"
            value={formData.NAME_MATERIALS}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors.NAME_MATERIALS && (
            <p className="text-red-500 text-sm mb-2">{errors.NAME_MATERIALS[0]}</p>
          )}

          <input
            type="number"
            name="PRICE_MATERIAL"
            placeholder="Precio"
            value={formData.PRICE_MATERIAL}
            onChange={handleChange}
            className="border p-2 w-full mb-2 rounded"
          />
          {errors.PRICE_MATERIAL && (
            <p className="text-red-500 text-sm mb-2">{errors.PRICE_MATERIAL[0]}</p>
          )}

          <input
            type="number"
            name="QUANTITY"
            placeholder="Cantidad"
            value={formData.QUANTITY}
            onChange={handleChange}
            className="border p-2 w-full mb-4 rounded"
          />
          {errors.QUANTITY && (
            <p className="text-red-500 text-sm mb-2">{errors.QUANTITY[0]}</p>
          )}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                loading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? "Creando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}







