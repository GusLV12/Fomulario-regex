import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 🛡️ Esquema de validación con Regex
const schema = z.object({
  nombre: z
    .string()
    .min(3, { message: "El nombre debe tener mínimo 3 caracteres" })
    // ^   → inicio de la cadena
    // [a-zA-Z\s] → permite letras mayúsculas, minúsculas y espacios
    // +   → uno o más caracteres de ese tipo
    // $   → fin de la cadena
    .regex(/^[a-zA-Z\s]+$/, { message: "Solo se permiten letras y espacios" }),

  email: z
    .string()
    .email({ message: "Formato de correo inválido" })
    // ^               → inicio de la cadena
    // [\w.-]+         → uno o más caracteres alfanuméricos (\w), punto o guion
    // @               → símbolo arroba obligatorio
    // [a-zA-Z\d.-]+   → letras, números, punto o guion (dominio)
    // \.              → punto literal
    // [a-zA-Z]{2,}    → al menos 2 letras (ej: .com, .mx, .org)
    // $               → fin de la cadena
    .regex(/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/, {
      message: "Correo no válido",
    }),

  password: z
    .string()
    .min(6, { message: "Mínimo 6 caracteres" })
    // ^                    → inicio de la cadena
    // (?=.*[A-Z])          → al menos una mayúscula
    // (?=.*[a-z])          → al menos una minúscula
    // (?=.*\d)             → al menos un dígito
    // (?=.*[@$!%*?&])      → al menos un carácter especial de este grupo
    //                       (@ $ ! % * ? &)
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        "Debe incluir mayúscula, minúscula, número y caracter especial (@$!%*?&)",
    }),
});

export const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    alert("✅ Datos válidos:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Formulario con Regex
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Nombre
            </label>
            <input
              type="text"
              {...register("nombre")}
              placeholder="Ej: Juan Pérez"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.nombre
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">
                {errors.nombre.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="ejemplo@correo.com"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="********"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};
