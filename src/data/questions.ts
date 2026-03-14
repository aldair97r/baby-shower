import type { Question } from '../App'

export const questions: Question[] = [
  {
    id: 1,
    text: "¿Qué es lo primero que haces cuando te levantas?",
    answers: [
      { text: "Ir al baño", percentage: 35 },
      { text: "Buscar el celular", percentage: 28 },
      { text: "Estirarme", percentage: 15 },
      { text: "Tomar agua", percentage: 10 },
      { text: "Abrazar a mi pareja", percentage: 7 },
      { text: "Prender la tele", percentage: 5 }
    ]
  },
  {
    id: 2,
    text: "¿Qué comida no puede faltar en una fiesta mexicana?",
    answers: [
      { text: "Tacos", percentage: 32 },
      { text: "Tamales", percentage: 25 },
      { text: "Quesadillas", percentage: 18 },
      { text: "Guacamole", percentage: 12 },
      { text: "Pozole", percentage: 8 },
      { text: "Enchiladas", percentage: 5 }
    ]
  },
  {
    id: 3,
    text: "¿Qué es lo primero que revisas en una casa ajena?",
    answers: [
      { text: "El baño", percentage: 30 },
      { text: "La sala", percentage: 22 },
      { text: "Las fotos", percentage: 18 },
      { text: "La cocina", percentage: 15 },
      { text: "El jardín", percentage: 10 },
      { text: "Las recámaras", percentage: 5 }
    ]
  },
  {
    id: 4,
    text: "¿Qué haces cuando te quedas dormido?",
    answers: [
      { text: "Correr", percentage: 38 },
      { text: "Decir que hubo tráfico", percentage: 25 },
      { text: "Llamar para avisar", percentage: 17 },
      { text: "No ir", percentage: 12 },
      { text: "Ir volando", percentage: 5 },
      { text: "Hacerme el enfermo", percentage: 3 }
    ]
  },
  {
    id: 5,
    text: "¿Dónde escondes tu dinero?",
    answers: [
      { text: "En el banco", percentage: 35 },
      { text: "En el colchón", percentage: 20 },
      { text: "En la cartera", percentage: 18 },
      { text: "En un cajón", percentage: 15 },
      { text: "Debajo del piso", percentage: 7 },
      { text: "En la cocina", percentage: 5 }
    ]
  },
  {
    id: 6,
    text: "¿Qué es lo más vergonzoso que te ha pasado?",
    answers: [
      { text: "Tropezar en público", percentage: 30 },
      { text: "Saludar y que no me saluden", percentage: 25 },
      { text: "Que me vean mal vestido", percentage: 18 },
      { text: "Que se me olvide un nombre", percentage: 12 },
      { text: "Tropezarme en un evento", percentage: 10 },
      { text: "Que me regañen en público", percentage: 5 }
    ]
  },
  {
    id: 7,
    text: "¿Qué bebida pides en una fiesta?",
    answers: [
      { text: "Cerveza", percentage: 40 },
      { text: "Tequila", percentage: 25 },
      { text: "Refresco", percentage: 15 },
      { text: "Mezcal", percentage: 10 },
      { text: "Vino", percentage: 7 },
      { text: "Aguacate", percentage: 3 }
    ]
  },
  {
    id: 8,
    text: "¿Qué es lo que más haces en el celular?",
    answers: [
      { text: "Redes sociales", percentage: 35 },
      { text: "WhatsApp", percentage: 30 },
      { text: "Ver videos", percentage: 15 },
      { text: "Jugar", percentage: 10 },
      { text: "Tomar fotos", percentage: 7 },
      { text: "Trabajar", percentage: 3 }
    ]
  },
  {
    id: 9,
    text: "¿Qué superpoder te gustaría tener?",
    answers: [
      { text: "Volar", percentage: 30 },
      { text: "Ser invisible", percentage: 25 },
      { text: "Teletransportación", percentage: 20 },
      { text: "Leer mentes", percentage: 12 },
      { text: "Super fuerza", percentage: 8 },
      { text: "Viajar en el tiempo", percentage: 5 }
    ]
  },
  {
    id: 10,
    text: "¿Qué es lo que no puede faltar en tu casa?",
    answers: [
      { text: "Comida", percentage: 35 },
      { text: "WiFi", percentage: 28 },
      { text: "Aire acondicionado", percentage: 15 },
      { text: "Televisión", percentage: 10 },
      { text: "Agua caliente", percentage: 7 },
      { text: "Música", percentage: 5 }
    ]
  },
  {
    id: 11,
    text: "¿Qué hace un mexicano cuando llega a una fiesta?",
    answers: [
      { text: "Saluda a todos", percentage: 32 },
      { text: "Busca la comida", percentage: 28 },
      { text: "Pide una bebida", percentage: 20 },
      { text: "Se sienta", percentage: 10 },
      { text: "Pone música", percentage: 7 },
      { text: "Saca el celular", percentage: 3 }
    ]
  },
  {
    id: 12,
    text: "¿Qué es lo primero que compras en el súper?",
    answers: [
      { text: "Frutas y verduras", percentage: 30 },
      { text: "Refrescos", percentage: 25 },
      { text: "Botanas", percentage: 20 },
      { text: "Lácteos", percentage: 12 },
      { text: "Carne", percentage: 8 },
      { text: "Dulces", percentage: 5 }
    ]
  },
  {
    id: 13,
    text: "¿Qué animal te representa mejor?",
    answers: [
      { text: "Perro", percentage: 35 },
      { text: "Gato", percentage: 25 },
      { text: "León", percentage: 15 },
      { text: "Águila", percentage: 12 },
      { text: "Oso", percentage: 8 },
      { text: "Delfín", percentage: 5 }
    ]
  },
  {
    id: 14,
    text: "¿Qué es lo que más te gusta de las vacaciones?",
    answers: [
      { text: "No trabajar", percentage: 35 },
      { text: "Viajar", percentage: 28 },
      { text: "Dormir tarde", percentage: 17 },
      { text: "Ver familia", percentage: 10 },
      { text: "Ir a la playa", percentage: 7 },
      { text: "No hacer nada", percentage: 3 }
    ]
  },
  {
    id: 15,
    text: "¿Qué snack no puede faltar viendo una película?",
    answers: [
      { text: "Palomitas", percentage: 45 },
      { text: "Nachos", percentage: 25 },
      { text: "Doritos", percentage: 15 },
      { text: "Galletas", percentage: 8 },
      { text: "Fruta", percentage: 5 },
      { text: "Helado", percentage: 2 }
    ]
  }
]
