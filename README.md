# Nuit-de-l'info-2024


# Challenge 1 : Worst code ever

Dans ce challenge, notre objectif était de créer le "pire code" possible, tout en maintenant le site fonctionnel. Pour cela, nous avons pris plusieurs décisions pour rendre le code incompréhensible et difficile à déminifier. Voici les raisons et les choix que nous avons faits :

## Stack Technique
Pour relever ce défi, nous avons utilisé une stack technique simple mais efficace :

- Frontend : ReactJS - La bibliothèque JavaScript populaire pour la création d'interfaces utilisateur dynamiques.

- Backend : Express et Node.js - Nous avons utilisé Express pour le backend afin de gérer les routes et Node.js pour l'exécution du serveur côté serveur.

- Base de donnée : MariaDB, pour différentes raison, nous sommes a l'aise avec cette technologie et il faut penser scalabilité après tout.

- Deployement : Dockerfile pour build des images docker frontend et backend, le tout orchestré par un docker-compose à la root du repository avec des variable d'environnement dynamique en utilisant la commande suivante pour l'environnement de dev :

````
docker-compose --env-file .env.dev up --build
````
ou encore cette commande pour l'environnement production.

````
docker-compose --env-file .env.prod up --build
````

## Génération aléatoire d'UUID
L'une des premières étapes pour rendre notre code difficile à comprendre était de générer des UUID aléatoires pour toutes les variables et fonctions. Chaque variable, même les noms de fonctions, a été remplacée par une chaîne aléatoire de caractères. Nous nous sommes basé sur le model uuiv4 utiliser par mangoose / mongoDB pour génére des uuid.

## Choix de différentes langues pour les noms de fichiers
Afin de rendre le code encore plus obscur, nous avons choisi des noms de fichiers dans plusieurs langues différentes. Nous avons utilisé des caractères japonais, mongols, indiens, latins, arabes et grecs :

- Japonais : 使用するファイル名 (Nom utilisé en japonais, car le Japon c'est grave cool hein)
- Mongol : Монгол файл нэр (Nom utilisé en mongol, on a fait tourner une roulette et c'est sa qui à gagner)
- Indien : भारतीय फ़ाइल नाम (Nom utilisé en indien, i'm going to learn c++)
- Latin/Grecs : Nom de fichiers en caractères latins et grecs(parce que l'histoire des dieu romain etc bah c'est grave cool, team latin au collège).
- Arabe : بندقية أعلى (nom utilisé en arabe, parce que c'est fun).

Cette diversité de langues et de caractères rend le code illisible pour la plupart des outils de déminification, ce qui est le but après tout et c'est marrant :)

## ASCII Art fait à la main
Nous avons également intégré des ASCII Art faits à la main dans notre code (bon je suis d'accord c'est discutable on est pas doué pour sa ^^). Nous avons décidé de le faire à la main une fois de plus pour empecher les outils de déminification de déminifier le code.

## Conclusion sur ce challenge ?

Au nom de toute l'équipe on tenait à vous remercier, car sa fait du bien de pouvoir développer sans se soucier des normes de développement, de CI/CD et de test unitaire et d'intégration !