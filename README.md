# Tamagotchi M324

## Projektbeschreibung

Dieses Projekt ist eine virtuelle Tamagotchi-Webanwendung. Benutzer können ein digitales Haustier pflegen, dessen Statuswerte beobachten und Aktionen wie Füttern, Spielen oder Reinigen ausführen.

Ziel des Projekts ist es, eine moderne Webanwendung mit mehreren unabhängigen Komponenten umzusetzen und diese mit Docker, Kubernetes und einer CI/CD-Pipeline zu dokumentieren und betreibbar zu machen.

---

## Technologien

- React + Vite
- Node.js + Express
- MongoDB
- Docker Compose
- Kubernetes
- GitHub Actions (CI/CD)

---

## Architektur

Die Anwendung besteht aus drei Hauptkomponenten:

- Frontend: React-Webanwendung für die Benutzeroberfläche
- Backend: Node.js + Express REST API für die Geschäftslogik
- Datenbank: MongoDB zur persistenten Speicherung der Daten

Die Kommunikation erfolgt über HTTP REST API Requests.

```text
Browser → Frontend → Backend REST API → MongoDB
```

---

## Projektstruktur

```text
tamagotchi-m324/
├── frontend/              # React + Vite Frontend
├── backend/               # Node.js + Express REST API
├── database/              # Datenbank-Dokumentation / Initialdaten
├── docs/                  # Projektdokumentation und Architekturdiagramme
├── .github/workflows/     # GitHub Actions CI/CD Pipeline
├── docker-compose.yml     # Lokale Docker Compose Umgebung
├── .env.example           # Beispiel für Umgebungsvariablen
├── .gitignore
└── README.md
```

---

## Lokale Entwicklung mit Docker Compose

...text 

---


## Docker Compose Architektur

...text 
---

## Kubernetes Architektur

...text 
---

## CI/CD Pipeline

..text

### Geplanter Ablauf

...text 

---

## Git Workflow

Wir arbeiten mit mehreren Branches:

```text
main      = stabile finale Version
staging   = getestete Zwischenversion
dev1      = Entwicklungsbranch Person 1
dev2      = Entwicklungsbranch Person 2
dev3      = Entwicklungsbranch Person 3
```

Änderungen werden zuerst in einem Entwicklungsbranch gemacht und danach per Pull Request nach `staging` übernommen. Wenn alles getestet wurde, wird `staging` nach `main` gemerged.

---

## Commit-Konvention

Wir verwenden klare und strukturierte Commit Messages.

---


## Geplante nächste Schritte

- Frontend-Grundstruktur implementieren
- Backend mit Express erstellen
- MongoDB anbinden
- REST API Endpunkte erstellen
- Docker Compose vollständig lauffähig machen
- GitHub Actions Pipeline erstellen
- Kubernetes Manifest-Dateien vorbereiten

---

## Team

Projekt im Modul M324 entwickelt.