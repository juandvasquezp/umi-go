import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Mascot } from "./Mascot";
import { MapPin, Users, User, Navigation, X, ArrowRight, ArrowLeft } from "lucide-react";

interface WelcomeTutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  mascotExpression: 'happy' | 'excited' | 'thinking' | 'waving';
  icon: React.ReactNode;
  color: string;
  highlight?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: '¡Bienvenido a Campus Connect!',
    description: 'Hola, soy Umi, tu guía universitario. Te ayudaré a descubrir todo lo que Umi★Go puede hacer por ti como estudiante.',
    mascotExpression: 'waving',
    icon: <Mascot expression="saludando" size="sm" />,
    color: 'bg-gradient-to-r from-orange-500 to-yellow-500'
  },
  {
    id: 'places',
    title: 'Descubre Lugares Increíbles',
    description: 'En la sección "Lugares" encontrarás cafeterías, bibliotecas, gimnasios y todos los spots perfectos para estudiantes recomendados por otros estudiantes. ¡Puedes ver reseñas y agregar las tuyas!',
    mascotExpression: 'saludando',
    icon: <MapPin className="h-6 w-6 text-orange-500" />,
    color: 'bg-gradient-to-r from-blue-500 to-purple-500',
    highlight: 'places'
  },
  {
    id: 'map',
    title: 'Navega por tu Ciudad',
    description: 'El mapa te ayudará a ubicarte y encontrar el camino a todos los lugares geniales. ¡Nunca más te perderás en el campus!',
    mascotExpression: 'corriendo',
    icon: <Navigation className="h-6 w-6 text-blue-500" />,
    color: 'bg-gradient-to-r from-green-500 to-blue-500',
    highlight: 'map'
  },
  {
    id: 'people',
    title: 'Conecta con Otros Estudiantes',
    description: 'Conoce compañeros con intereses similares, únete a grupos de estudio y haz nuevos amigos. ¡La vida universitaria es mejor cuando la compartes!',
    mascotExpression: 'saludando2',
    icon: <Users className="h-6 w-6 text-purple-500" />,
    color: 'bg-gradient-to-r from-pink-500 to-red-500',
    highlight: 'people'
  },
  {
    id: 'profile',
    title: 'Tu Perfil Personalizado',
    description: 'Crea tu perfil, comparte tus intereses y haz que otros estudiantes puedan encontrarte. ¡Construye tu red universitaria!',
    mascotExpression: 'saludando',
    icon: <User className="h-6 w-6 text-green-500" />,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    highlight: 'profile'
  },
  {
    id: 'finish',
    title: '¡Listo para Explorar!',
    description: 'Ya tienes todo lo que necesitas para aprovechar al máximo tu experiencia universitaria. ¡Que disfrutes descubriendo tu ciudad!',
    mascotExpression: 'waving',
    icon: <Mascot expression="corriendo" size="sm" />,
    color: 'bg-gradient-to-r from-orange-500 to-yellow-500'
  }
];

export function WelcomeTutorial({ onComplete, onSkip }: WelcomeTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onSkip();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-md"
      >
        <Card className="relative overflow-hidden">
          {/* Header con gradiente */}
          <div className={`${step.color} p-6 text-white relative`}>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSkip}
              className="absolute top-2 right-2 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-4">
              <Mascot expression={step.mascotExpression} size="md" />
              <div className="flex-1">
                <Badge variant="secondary" className="mb-2">
                  Paso {currentStep + 1} de {tutorialSteps.length}
                </Badge>
                <h2 className="text-white">{step.title}</h2>
              </div>
            </div>
          </div>

          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-2 bg-accent rounded-lg">
                    {step.icon}
                  </div>
                  <p className="text-muted-foreground flex-1">{step.description}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between text-xs text-muted-foreground mb-2">
                <span>Progreso</span>
                <span>{Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-accent rounded-full h-2">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="flex-1"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Anterior
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className="flex-1"
              >
                {currentStep === tutorialSteps.length - 1 ? (
                  '¡Empezar!'
                ) : (
                  <>
                    Siguiente
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>

            <div className="text-center mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground"
              >
                Saltar tutorial
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}