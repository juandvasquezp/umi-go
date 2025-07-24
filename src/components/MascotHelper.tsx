import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "./Mascot";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { X, HelpCircle } from "lucide-react";

const helpTips = [
  "💡 ¿Sabías que puedes calificar lugares y dejar comentarios?",
  "🎯 Usa la búsqueda para encontrar lugares específicos rápidamente",
  "👥 Conecta con estudiantes que compartan tus intereses",
  "⭐ Revisa las calificaciones antes de visitar un lugar nuevo",
  "🗺️ El mapa te ayudará a no perderte en el campus"
];

export function MascotHelper() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);

  const showRandomTip = () => {
    setCurrentTip(Math.floor(Math.random() * helpTips.length));
    setIsVisible(true);
  };

  const hideTip = () => {
    setIsVisible(false);
  };

  return (
    <>
      {/* Floating help button */}
      <motion.div
        className="fixed bottom-24 right-4 z-40"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2 }}
      >
        <Button
          onClick={showRandomTip}
          size="sm"
          className="rounded-full h-12 w-12 p-0 shadow-lg bg-primary hover:bg-primary/90"
        >
          <Mascot expression="saludando" size="sm" />
        </Button>
      </motion.div>

      {/* Tip popup */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 right-4 z-50 max-w-xs"
          >
            <Card className="shadow-lg border-primary/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Mascot expression="thinking" size="sm" />
                  <div className="flex-1">
                    <p className="text-sm">{helpTips[currentTip]}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={hideTip}
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}