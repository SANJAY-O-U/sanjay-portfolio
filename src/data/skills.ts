export type SkillGroup = { title: string; icon: string; items: string[] }

export const skills: SkillGroup[] = [
  { title: 'Languages', icon: 'code', items: ['Java', 'JavaScript', 'Python', 'C', 'SQL', 'Dart'] },
  { title: 'Frontend', icon: 'layout', items: ['React.js', 'Vite', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux'] },
  { title: 'Backend', icon: 'server', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Databases', icon: 'db', items: ['MongoDB', 'MongoDB Atlas', 'MySQL', 'Oracle'] },
  { title: 'Mobile', icon: 'phone', items: ['Flutter', 'Riverpod', 'GoRouter'] },
  { title: 'Systems / GIS', icon: 'map', items: ['Leaflet', 'OpenStreetMap', 'GeoJSON', 'Graph Routing'] },
  { title: 'Services', icon: 'plug', items: ['Firebase', 'JWT', 'bcrypt', 'Gemini API', 'Razorpay', 'Stripe'] },
  { title: 'Fundamentals', icon: 'book', items: ['DSA', 'OOP', 'DBMS'] },
  { title: 'Tools', icon: 'tool', items: ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA'] },
]
