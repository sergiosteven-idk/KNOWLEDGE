// ==============================
// ♿ PANEL DE ACCESIBILIDAD — KNOWLEDGE ULTIMATE
// ==============================
import { useAccessibility } from "../../contexts/AccessibilityContext";
import Button from "../ui/Button";

export default function AccessibilityPanel() {
  const {
    darkMode,
    highContrast,
    ttsEnabled,
    largeText,
    focusMode,
    toggleDarkMode,
    toggleContrast,
    toggleTTS,
    toggleLargeText,
    toggleFocusMode,
  } = useAccessibility();

  return (
    <section
      aria-label="Panel de accesibilidad de Knowledge"
      className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl p-5 w-72 text-sm transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-knowledge-purple"
      role="complementary"
    >
      <h2
        id="accessibility-panel-title"
        className="text-lg font-extrabold text-knowledge-purple mb-3"
      >
        ♿ Centro de Accesibilidad
      </h2>

      <p className="sr-only">
        Usa este panel para personalizar la experiencia visual, auditiva y de
        lectura en Knowledge.
      </p>

      <div
        className="flex flex-col gap-2"
        role="group"
        aria-labelledby="accessibility-panel-title"
      >
        <Button
          variant={darkMode ? "primary" : "secondary"}
          onClick={toggleDarkMode}
          aria-pressed={darkMode}
          className="w-full text-sm"
        >
          {darkMode ? "☀️ Modo claro" : "🌙 Modo oscuro"}
        </Button>

        <Button
          variant={highContrast ? "secondary" : "secondary"}
          onClick={toggleContrast}
          aria-pressed={highContrast}
          className="w-full text-sm"
        >
          {highContrast ? "🎨 Contraste normal" : "🔆 Alto contraste"}
        </Button>

        <Button
          variant={ttsEnabled ? "primary" : "secondary"}
          onClick={toggleTTS}
          aria-pressed={ttsEnabled}
          className="w-full text-sm"
        >
          {ttsEnabled ? "🔇 Desactivar voz" : "🔊 Activar lectura en voz alta"}
        </Button>

        <Button
          variant={largeText ? "primary" : "secondary"}
          onClick={toggleLargeText}
          aria-pressed={largeText}
          className="w-full text-sm"
        >
          {largeText ? "🔠 Texto normal" : "🔎 Texto grande"}
        </Button>

        <Button
          variant={focusMode ? "danger" : "secondary"}
          onClick={toggleFocusMode}
          aria-pressed={focusMode}
          className="w-full text-sm"
        >
          {focusMode ? "🧭 Mostrar todo" : "👁️ Modo enfoque"}
        </Button>
      </div>

      <footer className="text-xs text-center mt-4 text-gray-600 dark:text-gray-400">
        <p>
          Inclusión sin barreras — <strong>Knowledge</strong>
        </p>
      </footer>
    </section>
  );
}
