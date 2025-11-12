// ==============================
// 📤 DASHBOARD DE USUARIO — SUBIDA DE CONTENIDO
// ==============================
import React, { useEffect, useState } from "react";
import Container from "../components/ui/Container";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Loader from "../components/ui/Loader";
import Logo from "../components/Logo";
import FormLabel from "../components/form/FormLabel";
import FormInput from "../components/form/FormInput";
import FormTextarea from "../components/form/FormTextarea";
import FormSelect from "../components/form/FormSelect";
import FormSubmitButton from "../components/form/FormSubmitButton";
import {
  subirContenido,
  obtenerContenidoUsuario,
  obtenerProgreso,
} from "../services/api.js";

const Dashboard = () => {
  const [contenidos, setContenidos] = useState<any[]>([]);
  const [progreso, setProgreso] = useState<any[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [archivo, setArchivo] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMsg, setSuccessMsg] = useState("");

  const [nuevo, setNuevo] = useState({
    titulo: "",
    descripcion: "",
    tipo: "video",
    nivel_dificultad: "principiante",
  });

  const user = JSON.parse(localStorage.getItem("usuario") || "{}");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        const prog = await obtenerProgreso(user.id);
        const cont = await obtenerContenidoUsuario(user.id);
        setProgreso(prog);
        setContenidos(cont);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!nuevo.titulo.trim())
      newErrors.titulo = "El título es requerido";
    if (!archivo) newErrors.archivo = "Debes seleccionar un archivo";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubir = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMsg("");

    if (!validateForm()) return;

    const formData = new FormData();
    Object.entries(nuevo).forEach(([k, v]) => formData.append(k, v));
    if (archivo) formData.append("archivo", archivo);
    formData.append("id_autor", user.id);

    try {
      setIsSubmitting(true);
      await subirContenido(formData, setUploadProgress);
      setSuccessMsg("✅ Contenido enviado para revisión.");
      setNuevo({
        titulo: "",
        descripcion: "",
        tipo: "video",
        nivel_dificultad: "principiante",
      });
      setArchivo(null);
      setUploadProgress(0);
      const cont = await obtenerContenidoUsuario(user.id);
      setContenidos(cont);
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (error) {
      setErrors({ submit: "Error al subir contenido. Intenta de nuevo." });
      setUploadProgress(0);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <main className="py-6 md:py-8">
        {/* Hero Section */}
        <section className="text-center mb-8 md:mb-12 px-4 animate-fade-in">
          <Logo size={60} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-knowledge-purple mt-4 md:mt-6 mb-2 md:mb-3">
            Mi Panel
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base px-2">
            Sube videos, documentos y cursos para compartir con la comunidad Knowledge.
          </p>
        </section>

        {/* Upload Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12 px-4">
          <div className="lg:col-span-1">
            <Card>
              <h2 className="text-2xl font-extrabold text-knowledge-purple mb-6">
                📤 Nuevo Contenido
              </h2>

              {successMsg && (
                <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg animate-scale-in">
                  <p className="text-green-700 font-semibold flex items-center gap-2">
                    <span className="animate-checkmark">✅</span> {successMsg}
                  </p>
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-lg animate-scale-in">
                  <p className="text-red-700 font-semibold flex items-center gap-2">
                    <span className="animate-shake">⚠️</span> {errors.submit}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubir} className="space-y-5">
                <div>
                  <FormLabel icon="📝" required>
                    Título
                  </FormLabel>
                  <FormInput
                    placeholder="Título del contenido"
                    value={nuevo.titulo}
                    onChange={(e) =>
                      setNuevo({ ...nuevo, titulo: e.target.value })
                    }
                    error={errors.titulo}
                    helperText={
                      errors.titulo || "Sé claro y descriptivo"
                    }
                    required
                  />
                </div>

                <div>
                  <FormLabel icon="📋">
                    Descripción
                  </FormLabel>
                  <FormTextarea
                    placeholder="Describe tu contenido"
                    rows={3}
                    value={nuevo.descripcion}
                    onChange={(e) =>
                      setNuevo({ ...nuevo, descripcion: e.target.value })
                    }
                    helperText="Ayuda a otros a entender de qué trata"
                  />
                </div>

                <div>
                  <FormLabel icon="🎯" required>
                    Tipo
                  </FormLabel>
                  <FormSelect
                    value={nuevo.tipo}
                    onChange={(e) =>
                      setNuevo({ ...nuevo, tipo: e.target.value })
                    }
                    options={[
                      { value: "video", label: "📹 Video" },
                      { value: "pdf", label: "📄 PDF" },
                      { value: "curso", label: "🎓 Curso" },
                    ]}
                    required
                  />
                </div>

                <div>
                  <FormLabel icon="📎" required>
                    Archivo
                  </FormLabel>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/mp4,application/pdf"
                      onChange={(e) => setArchivo(e.target.files?.[0] || null)}
                      className={`absolute inset-0 w-full h-full opacity-0 cursor-pointer`}
                      required
                    />
                    <div className="w-full px-4 py-3 rounded-xl bg-white border-2 border-dashed border-gray-300 hover:border-knowledge-purple transition-colors">
                      <p className="text-gray-600 text-sm text-center">
                        {archivo ? (
                          <>
                            <span className="font-semibold text-knowledge-purple">
                              ✅ {archivo.name}
                            </span>
                            <br />
                            <span className="text-xs text-gray-500">
                              {(archivo.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="block font-semibold text-gray-700">
                              Haz clic para seleccionar
                            </span>
                            <span className="text-xs text-gray-500">
                              MP4 o PDF (máx 500 MB)
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  {errors.archivo && (
                    <p className="text-red-500 text-xs mt-2">{errors.archivo}</p>
                  )}
                </div>

                {uploadProgress > 0 && (
                  <div className="w-full bg-gray-300 rounded-full overflow-hidden mt-2">
                    <div
                      className="bg-gradient-to-r from-knowledge-green to-knowledge-purple text-xs text-white text-center py-1 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    >
                      {uploadProgress}%
                    </div>
                  </div>
                )}

                <FormSubmitButton
                  type="submit"
                  loading={isSubmitting}
                  icon="📤"
                >
                  Enviar Contenido
                </FormSubmitButton>
              </form>
            </Card>
          </div>

          {/* Progress Summary */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="py-12 flex justify-center">
                <Loader />
              </div>
            ) : (
              <Card>
                <h2 className="text-2xl font-extrabold text-knowledge-purple mb-6">
                  📊 Tu Progreso
                </h2>
                {progreso && progreso.length > 0 ? (
                  <div className="space-y-4">
                    {progreso.map((p: any, idx: number) => (
                      <div key={idx} className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-knowledge-purple transition-colors">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-800 text-sm">
                            {p.titulo || "Contenido"}
                          </span>
                          <span className="text-sm text-knowledge-green font-bold">
                            {p.progreso || 0}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-2">
                          <div
                            className="bg-knowledge-green rounded-full h-2 transition-all"
                            style={{ width: `${p.progreso || 0}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">
                    No hay progreso registrado aún.
                  </p>
                )}
              </Card>
            )}
          </div>
        </div>

        {/* My Content Section */}
        <section className="px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-knowledge-purple mb-6">
            📚 Mi Contenido
          </h2>
          {loading ? (
            <div className="py-12 flex justify-center">
              <Loader />
            </div>
          ) : contenidos && contenidos.length > 0 ? (
            <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 stagger-container">
              {contenidos.map((c: any, idx: number) => (
                <Card
                  key={c.id_contenido}
                  className={`animate-fade-in-delay-${(idx % 3) + 1}`}
                >
                  <h3 className="font-semibold text-knowledge-purple text-lg mb-2">
                    {c.titulo}
                  </h3>
                  <p className="text-gray-700 mb-3 text-sm">
                    {c.descripcion}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600">
                      Tipo: <span className="font-semibold">{c.tipo}</span>
                    </p>
                    {c.estado === "aprobado" && (
                      <span className="text-xs text-knowledge-green font-bold bg-green-50 px-3 py-1 rounded-full">
                        ✅ Aprobado
                      </span>
                    )}
                    {c.estado === "pendiente" && (
                      <span className="text-xs text-yellow-600 font-bold bg-yellow-50 px-3 py-1 rounded-full">
                        ⏳ Pendiente
                      </span>
                    )}
                    {c.estado === "rechazado" && (
                      <span className="text-xs text-red-600 font-bold bg-red-50 px-3 py-1 rounded-full">
                        ❌ Rechazado
                      </span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-center py-12 text-gray-500">
                Aún no has subido contenido. ¡Sé el primero en compartir! 🚀
              </p>
            </Card>
          )}
        </section>
      </main>
    </Container>
  );
};

export default Dashboard;
