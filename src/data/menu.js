export const categories = ["All", "Fresh Juice", "Smoothies", "Detox", "Classics"]

const shot = (id, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const products = [
  {
    id: "sunrise",
    name: "Sunrise Orange",
    category: "Fresh Juice",
    price: 149,
    tag: "Bestseller",
    desc: "Valencia oranges pressed to order. Pulpy, bright, and never from concentrate.",
    image: shot("photo-1600271886742-f049cd451bba"),
  },
  {
    id: "emerald",
    name: "Emerald Detox",
    category: "Detox",
    price: 189,
    tag: "Cleanse",
    desc: "Kale, cucumber, green apple, and a snap of ginger. Cold, clean, and vivid.",
    image: shot("photo-1610970881699-44a5587cabec"),
  },
  {
    id: "berry",
    name: "Berry Burst",
    category: "Smoothies",
    price: 199,
    tag: "Popular",
    desc: "Strawberry, blueberry, and banana blended thick with a spoon of yogurt.",
    image: shot("photo-1553530666-ba11a7da3888"),
  },
  {
    id: "mango",
    name: "Mango Glow",
    category: "Fresh Juice",
    price: 169,
    tag: "Seasonal",
    desc: "Alphonso mango, a little lime, and crushed ice. Summer in a tall glass.",
    image: shot("photo-1546173159-315724a31696"),
  },
  {
    id: "melon",
    name: "Watermelon Cooler",
    category: "Classics",
    price: 139,
    tag: "Chilled",
    desc: "Ripe melon, mint, and a pinch of salt. The counter’s hottest-day fix.",
    image: shot("photo-1587049352846-4a222e784d38"),
  },
  {
    id: "pine",
    name: "Pineapple Zing",
    category: "Fresh Juice",
    price: 159,
    tag: "Tangy",
    desc: "Golden pineapple with a thread of chili and lime. Sweet first, then spark.",
    image: shot("photo-1550258987-190a2d41a8ba"),
  },
  {
    id: "beet",
    name: "Ruby Beet",
    category: "Detox",
    price: 179,
    tag: "Glow",
    desc: "Beet, carrot, orange, and ginger. Earthy, jewel-toned, and gently sweet.",
    image: shot("photo-1613478223719-2ab802602423"),
  },
  {
    id: "coco",
    name: "Coconut Cloud",
    category: "Smoothies",
    price: 209,
    tag: "Creamy",
    desc: "Young coconut, banana, and vanilla. Silky enough to drink slowly.",
    image: shot("photo-1556881286-fc6915169721"),
  },
  {
    id: "lemon",
    name: "Lemon Mint Fizz",
    category: "Classics",
    price: 129,
    tag: "Light",
    desc: "Fresh lemon, torn mint, and sparkling water. A bright pause between sips.",
    image: shot("photo-1513558161293-cdaf765ed2fd"),
  },
  {
    id: "carrot",
    name: "Carrot Citrus",
    category: "Detox",
    price: 159,
    tag: "Daily",
    desc: "Carrot, orange, and turmeric. A morning glass with a golden finish.",
    image: shot("photo-1622597467836-f3285f2131b8"),
  },
  {
    id: "tropic",
    name: "Tropical Crush",
    category: "Smoothies",
    price: 219,
    tag: "New",
    desc: "Passion fruit, mango, and pineapple over crushed ice. Loud, sunny, cold.",
    image: shot("photo-1623065422902-30a2d299bbe4"),
  },
  {
    id: "apple",
    name: "Orchard Apple",
    category: "Classics",
    price: 139,
    tag: "Pure",
    desc: "Crisp apples pressed with a leaf of mint. Simple, fragrant, and clear.",
    image: shot("photo-1576673442511-7e39b6545c87"),
  },
]

export const offers = [
  {
    id: "trio",
    name: "Sunrise Trio",
    detail: "Orange, mango, and pineapple — three tall glasses, one bright morning.",
    price: 349,
    was: 477,
    badge: "Save 27%",
    image: shot("photo-1600271886742-f049cd451bba", 1200),
  },
  {
    id: "week",
    name: "Detox Week",
    detail: "Seven emerald cleanses, packed cold each morning and ready at the counter.",
    price: 999,
    was: 1323,
    badge: "Most loved",
    image: shot("photo-1610970881699-44a5587cabec", 1200),
  },
  {
    id: "family",
    name: "Family Cooler",
    detail: "Four watermelon coolers and two berry bursts for the whole table.",
    price: 549,
    was: 754,
    badge: "Shareable",
    image: shot("photo-1553530666-ba11a7da3888", 1200),
  },
]

export const reviews = [
  {
    name: "Ananya Rao",
    role: "Regular since 2022",
    quote:
      "The orange is pressed while I wait. It tastes like the fruit, not a bottle. I stop in before work almost every day.",
    stars: 5,
  },
  {
    name: "Kabir Mehta",
    role: "Weekend regular",
    quote:
      "The detox week actually stuck. Cold, sharp, and never watery. The staff remembers the ginger level I like.",
    stars: 5,
  },
  {
    name: "Meera Iyer",
    role: "Brought the family",
    quote:
      "Kids finished the watermelon cooler before we sat down. The mall counter is bright, quick, and the prices are fair.",
    stars: 5,
  },
]

export const inr = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value)
