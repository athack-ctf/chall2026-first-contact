# First Contact - Xyrathian Surveillance Network

> Web reconnaissance challenge teaching client-side inspection and storage vulnerability

## Challenge Type

- [ ] **OFF**line
- [X] **ON**line

## Design Type

- [X] **Black**-Box (but very primitive - webpage source code exploration)
- [ ] **White**-Box

## Designer(s)

- Oleksiy Savytskyy

## Description

**Beginner web challenge (difficulty 0-1/10)** teaching browser inspector tools through an alien surveillance dashboard. Participants learn to inspect HTML/CSS/JS using browser DevTools to find two flags: **Flag 1** is hidden on `/diagnostics.html` (discovered via CSS comment hint, reversed string encoding) teaching that developers leave artifacts in production; **Flag 2** is split across JavaScript config, cookies, and localStorage teaching that client-side storage is never secure. Static HTML/CSS/JS application with no backend, solvable in 3-5 primitive steps per flag using only a browser.

**IMPORTANT:** This description will **NOT** be shared with participants.

## Category(ies)

- `web`

---

# Project Structure

## 1. HACKME.md

- **[HACKME.md](HACKME.md)**: A teaser or description of the challenge to be shared with participants (in CTFd).

## 2. Source Code

- **[source/README.md](source/README.md)**: Comprehensive instructions on how to have a running instance of your
  challenge from the source.
  If your project includes multiple subprojects, please consult us (Alin and William).
- **[source/*](source/)**: Your source code.

## 3. Offline Artifacts [OPTIONAL]

> **NOTE:** This directory is optional for online challenges. However, if offline artifacts need to be provided as well, 
> they should be placed here.

- **[offline-artifacts/*](offline-artifacts/)**: All files intended to be downloaded by participants
  (e.g., a flagless version of the running binary executable of a pwn challenge).
  For large files (exceeding 100 MB), please consult us (Alin and William).

## 4. Solution

- **[solution/README.md](solution/README.md)**: A detailed writeup of the working solution.
- **[solution/FLAGS.md](solution/FLAGS.md)**: A single markdown file listing all (up-to-date) flags.
- **[solution/*](solution/)**: Any additional files or code necessary for constructing a reproducible solution for the
  challenge (e.g., `PoC.py`, `requirement.txt`, etc.).

## 5. Dockerization

> **NOTE:** For deployment on @Hack's infrastructure, online challenges must be containerized.
> However, this requirement does not apply during the early stages of challenge development, so do not hesitate to start
> building your online challenge if you are unfamiliar with containerization.
> We (Anis and Hugo) will take care of it.

- **[source/Dockerfile](source/Dockerfile)**: Needed for building a containerized image of the online challenge.
- **[source/docker-compose.yml](source/docker-compose.yml)**: Needed for a configuration-free run of the online
  challenge