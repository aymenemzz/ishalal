# IsHalal

### objectifs

- le but de ce proojet éait de proposer une solution web afin de verifier qu'un produit et halal ou non

### fonctionnalité principales

- la seul fonctionnalité de notre projet est la verification du statut halal d'un produit via une api et une logique backend

### organisation

- Toby Pollock a en majorité fait le backend, tout ce qui est en relation avec la connection de l'API OpenFoodFacts.
- Aymène Mazouz a fait la majorité du front end, les maquette, la gestion du git et le routing.

### difficulté rencontrer

- la gestion de l'api open food fact a été complexe a aprehender ce qui ne nous a malheuresement pas laisser ke temps d'utiliser
  l'api yahoo finance et du scrapping sur le site de mussafa pour savoir si une entreprise est considerer comme halal au vu de ses
  activité commerciales

### installation et mlancement

- Il faut avoir les dependances d'installé avec ```npm install```. puis executé ```npm run dev```

### information utiles pour les tests

- Tester barrecodes:
    - 3378740765884 - Jambon Halal - Halal car il contient le tag "en:halal"
    - 3095754933015 - Jambon non Halal - Contient du porc
    - 3449865340383 - Saucisson sec Cochonou - Contient du porc

### lien divers

- github : https://github.com/aymenemzz/ishalal
- figma : https://www.figma.com/design/nQDNLUoZMQKlA0VugdZyYO/Untitled?node-id=216-13&t=f9Vw03s0uRk6GdiU-0