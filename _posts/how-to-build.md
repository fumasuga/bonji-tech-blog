---
title: "How to build"
excerpt: "The article's main goal is to explain how to automatically deploy a blog built with Next.js (SSG) to Firebase Hosting. It's primarily for developers who want to set up an efficient CI/CD pipeline using GitHub Actions, with WSL2 and Docker for their development environment."
coverImage: "/assets/blog/posts/brightness-alt-high.svg"
date: "2025-08-08T09:59:00.322Z"
---
## Summary
The article's main goal is to explain how to automatically deploy a blog built with Next.js (SSG) to Firebase Hosting. It's primarily for developers who want to set up an efficient CI/CD pipeline using GitHub Actions, with WSL2 and Docker for their development environment.
#### Key Technologies Used
|  |  |
| --- | --- |
| Code Management | GitHub |
| CI/CD | GitHub Actions |
| Hosting | Firebase Hosting |
| Blog Framework | Next.js (SSG) |
| Development Environment | WSL2, Docker |

## Setting up WSL2 and Your Development Environment
if you're a Windows user, you'll first need to install WSL2 (Windows Subsystem for Linux) as your development environment.

1. Install WSL2

Open PowerShell or Command Prompt as an administrator and run the following command. This will install WSL2 along with an Ubuntu distribution.
```Bash
wsl --install
```
Once the installation is complete, restart your PC. You'll then be prompted to set up a username and password for Ubuntu.

2. Install Node.js and npm

Inside the WSL2 Ubuntu environment, install Node.js and npm, which are required to run Next.js.
```Bash
sudo apt update
sudo apt install nodejs npm
```
After installation, check the versions to confirm that everything was installed correctly.
```Bash
node -v
npm -v
```

## Install Docker
Download and run the installer from the [Docker Desktop official website](https://www.docker.com/products/docker-desktop/). During installation, the WSL2 backend will be automatically enabled. This allows you to operate Docker from your WSL2 environment.

## Project Setup
1. Github

First, let's create the repository to store your blog's code. On the [Github website](https://github.com/new), create a new repository.

You can choose any name you like. Here, we'll use blog-example. Please remember to replace blog-example with your chosen name throughout the rest of the guide. The repository can be either public or private.

2. Firebase

Go to the [Firebase Console](https://console.firebase.google.com/u/0/) and click "Add project".
 - Enter a project name. Here, we'll use blog-example to match our GitHub repository. Please replace this with your own name.
 - A Project ID will be automatically generated, which must be globally unique. You can use it as-is or change it if you prefer.
 - You'll be asked if you want to enable Google Analytics. For this guide, you can proceed with it disabled.
 - Click "Create project." Your project will be ready in a few moments.

## Next.js Blog Starter Local Environment Setup
Here are the steps to set up the Next.js blog-starter template in your local environment using Docker.

1. Download Node.js Docker Image

First, pull the Node.js Docker image.
```bash
$ docker pull node
```
2. Download Template and Create Project

Navigate to your preferred directory. Then, create a new directory for your blog development directly within it. If the GitHub repository name isn't blog-example, be sure to replace blog-example in the command with your actual repository name.
```bash
$ docker run --rm -it -v $PWD:/home/app -w /home/app node yarn create next-app --example blog-starter blog-example
$ cd blog-example
```
3. Run the Template

Once you're in your project directory, start the development server with the following command:
```bash
$ docker run --rm -it -v $PWD:/home/app -w /home/app -p 3000:3000 node yarn dev
```
4. Verify in Browser

After the server starts, open your browser and go to the following URL:http://localhost:3000
If you see the content as the official demo page, your local environment setup was successful.

## Add Docker file and docker-compose.yml
While the initial setup gets your blog running, repeatedly typing lengthy docker run commands can be cumbersome. Let's make this process much easier using Docker Compose.

1. Create Necessary Files

First, create the required files in your blog-example directory (or your chosen project directory):

```bash
$ touch Dockerfile
$ touch docker-compose.yml
```
※ Change Directory Permissions: If you prefer not to use sudo for every file creation, you can change the ownership or permissions of the parent directory. Be cautious when using chmod on directories, especially if it's a shared environment.

To give your user ownership of the directory (replace <your_username> and <your_group>):
```bash
$ sudo chown <your_username>:<your_group> .
```
To grant write permissions to the directory for the current user:
```bash
$ chmod u+w .
```
After changing permissions, you should be able to run touch without sudo.

2. Add File Contents

Next, open these files and add the following content to each. 

Dockerfile
```Dockerfile:Dockerfile
FROM node:latest
```

docker-compose.yml
```yml:docker-compose.yml
version: '3'

services:
  app:
    build: .
    working_dir: /home/app
    ports:
      - "3000:3000"
    volumes:
      - .:/home/app
    tty: true
    stdin_open: true
    command: yarn dev
```
3. Build Your Docker Image

After creating these files, you'll need to build your Docker image. This step is necessary whenever your Dockerfile or its dependencies (like package.json or yarn.lock) are updated. The --no-cache flag ensures a fresh build.
```bash
$ docker-compose build --no-cache
```
4. Launch Your Development Environment

Now, to spin up your development environment, you just need to run this simple command:
```bash
$ docker-compose up
```
5. Verify in Your Browser

Finally, open your browser and check the following URL:http://localhost:3000
Your local development environment is now fully set up and streamlined using Docker Compose.

## next.config.js Setup
next.config.js is a configuration file used to customize the build-time and runtime behavior of your Next.js application. It's necessary when utilizing specific features such as image optimization, environment variable configuration, or adjusting API route behavior.

1. Create the next.config.js File

Create a new file named next.config.js in your project's root directory (the same level as package.json).
```bash
$ touch next.config.js
```

2. Add Content to next.config.js

Open the newly created next.config.js file and add the following basic configuration. You can uncomment or add other settings as needed.

```javascript:next.config.js
/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,

  // Optional: Change the output directory `out` -> `dist`
  // distDir: 'dist',
}
 
module.exports = nextConfig
```
3. Apply and Verify Settings

After saving next.config.js, restart your Next.js application to apply the changes. If you're using Docker Compose, restart your containers with the following commands:
```bash
$ docker-compose down
$ docker-compose up --build # Rebuild might be necessary depending on your configuration
```
Troubleshooting docker-compose up Errors:
If you encounter issues when running docker-compose up or if previous build caches cause unexpected behavior, you can try rebuilding from a completely clean state. The following command will remove all containers, associated volumes, and images.
```bash
$ docker-compose down --rmi all --volumes --remove-orphans
$ docker-compose up --build
```
This command completely resets your environment and is often very effective for resolving common issues.
Finally, open your browser and check the following URL:http://localhost:3000
By adding this file, you gain more granular control over your Next.js application's behavior.

## Deployment to Firebase Hosting
Here are the steps to deploy your Next.js application to Firebase Hosting. 

1. Pre-deployment Setup: File Modifications

Let's modify Dockerfile, and docker-compose.yml as follows:
* Modifying Docker
Install The Firebase CLI
```Dockerfile:Dockerfile
FROM node

RUN yarn global add firebase-tools # Add this line
```

* Modifying docker-compose.yml
The Firebase CLI might use port 9005 for local development, so let's expose this port.
```yml:docker-compose.yml
version: '3'

services:
  app:
    build: .
    working_dir: /home/app
    ports:
      - "3000:3000"
      - "9005:9005" # Add this line
    volumes:
      - .:/home/app
    tty: true
    stdin_open: true
    command: yarn dev
```

2. Build Containers and Run in Background

After modifying the files, rebuild the image to apply the changes and start the containers in the background (-d).
```bash
$ docker-compose build --no-cache
$ docker-compose up -d
```
3. Enter the Container

Firebase configuration and deployment typically require a series of steps. You'll perform these operations inside the Docker container using the Firebase CLI.
```bash
$ docker-compose exec nextjs-app bash # 'nextjs-app' is the service name configured in docker-compose.yml
```
You are now inside the container, ready to perform operations using the Firebase CLI.

## Firebase init
1. Build Your Next.js Application
Inside the container, build your Next.js application. Since you configured the build command in package.json to include next export, this will generate static assets in the out directory.
```bash
$ yarn build
```
This will generate the static files required for deployment in the out/ directory.

2. Firebase Login
To access your Firebase project, authenticate with the Firebase CLI.
```bash
$ firebase login
```
When you run this, you'll first be asked if Firebase can collect CLI and Emulator Suite usage and error reporting information.

> Allow Firebase to collect CLI and Emulator Suite usage and error reporting information?

You can answer Yes or No.

After responding, a URL will be displayed. Copy this URL and open it in your browser. You'll be prompted to log in with your Google account and grant permissions to the Firebase CLI. Proceed with logging in and granting permission.

Once the browser authentication is successful, you'll see a message similar to this in your terminal:

> ✔ Success! Logged in as XXXXXXX@gmail.com

If you see this message, your login is complete.

3. Firebase Initialization

Next, initialize your Firebase project.
```bash
$ firebase init
```
Running this will start the Firebase initialization process. You will be presented with several options; select them as follows:

> Which Firebase features do you want to set up for this directory? Press Space to select features, then Enter to confirm your choices.

Hosting: Configure files for Firebase Hosting and (optionally) set up GitHub Action deploys (Select with Spacebar, then press Enter to confirm)

> Please select an option

Use an existing project

> Select a default Firebase project for this directory

Select the name of the Firebase project you created first (e.g., blog-example-XXXXX)

> What do you want to use as your public directory?

out

> Configure as a single-page app (rewrite all urls to /index.html)?

No

> Set up automatic builds and deploys with GitHub?

Yes

> File out/404.html already exists. Overwrite?

No

> File out/index.html already exists. Overwrite?

No

If GitHub authentication is required, a message will appear with a URL: Visit this URL on this device to log in. Copy this URL, open it in your browser, and authorize GitHub.

> For which GitHub repository would you like to set up a GitHub workflow?

${YourGithubAccountName}/${RepositoryName} (e.g., miketako3/blog-example)

> Set up the workflow to run a build script before every deploy?

Yes

> What script should be run before every deploy?

yarn install --immutable --immutable-cache --check-cache && yarn build

> Set up automatic deployment to your site's live channel when a PR is merged?

Yes

> What is the name of the GitHub branch associated with your site's live channel?

master (If your main branch is named main, use main instead)

Once all steps are complete, you will see:

> ✔ Firebase initialization complete!

This message indicates completion!

7. Firebase Deployment (firebase deploy)

After the initial project setup is complete, deploy your application to Firebase Hosting.
```bash
$ firebase deploy
```
If you see output similar to this, the deployment was successful!

> ✔ Deploy complete!
>
> Project Console: https://console.firebase.google.com/project/blog-example-XXXXX/overview
> Hosting URL: https://blog-example-XXXXX.web.app

Copy the Hosting URL and open it in your browser. You should see your template blog displayed.
If the deployment is not successful, you might want to check the files in the out directory.

## Automated Deployment with GitHub Actions
When you configure Firebase Hosting using the firebase init command, a .github/workflows directory is automatically created in your project's root directory. This directory contains GitHub Actions workflow files (typically firebase-hosting-pull-request.yml and firebase-hosting-merge.yml).

* firebase-hosting-pull-request.yml: This workflow is for previewing deployments when a pull request is opened.

* firebase-hosting-merge.yml: This workflow is for deploying to production when changes are merged into a specific branch (usually main or master).

Thanks to this auto-generated setup, when changes are pushed to your main or master branch, GitHub Actions will automatically trigger and execute the deployment process to Firebase Hosting.

#### Steps to Deploy

Automated deployment using GitHub Actions can be completed with the following simple steps:
1. Commit Your Changes: Commit any changes you've made to your project locally.

```bash
$ git init
$ git add -A
$ git commit -m "init"
```
* git init: It initializes a new Git repository.
* git add -A: Stages all changes (additions, modifications, deletions).
* git commit -m "init": Commits the staged changes with the message "init".

2. Add Remote Repository (First Time Only): If your local repository is not yet linked to a remote GitHub repository, add the link using the following command. Replace XXXXXXXXX with your actual GitHub repository URL.

```bash
$ git remote add origin git@XXXXXXXXX
```
* git remote add origin: Adds a remote repository named origin.
* git@XXXXXXXXX: Your GitHub repository's SSH URL.

3. Push to GitHub: Push your committed changes to the remote master (or main) branch on GitHub.

```bash
$ git push -u origin master
```
* git push -u origin master: Pushes changes from your local master branch to the master branch on the origin remote. The -u option sets up the upstream branch so that subsequent git push commands will automatically push to origin master.

Once these steps are completed, GitHub Actions will automatically detect the changes and initiate the deployment to Firebase Hosting according to the configured workflow. You can monitor the deployment progress on the "Actions" tab of your GitHub repository.

This will free you from manual deployment tasks and allow you to develop more efficiently.

-----
That's the Next.js blog deployment process. I hope this was helpful.